import { useNavigate } from "react-router-dom";
import CardProduto from "../cardproduto/CardProduto";
import {useEffect, useState } from "react";
import { buscar } from "../../../services/Service";
import { SyncLoader } from "react-spinners";
import { Link } from "react-router-dom";
import type Produto from "../../../models/Produto";

function ListaProdutos(){
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [ produtos, setProdutos] = useState<Produto[]>([])


    useEffect(()=>{
        buscarProdutos()
    }, [produtos.length])

    async function buscarProdutos(){
        try{
            setIsLoading(true)

            await buscar('/produtos', setProdutos)
        } catch (error: any){
            alert('Erro ao buscar produtos: ' + error.message)
        } finally{
            setIsLoading(false)
        }
    }

    return(
        <>
        {isLoading && (
        <SyncLoader
            color="white"
    	    size={32}
	    />
        )}
        <div className="bg-gradient-to-r from-[#0B2C59] via-[#0077B6] to-[#00B4D8] flex justify-center w-full min-h-screen">
            <div className="container flex flex-col">
                <div className="flex justify-between items-center mb-4">
                 <button className="bg-linear-to-r from-cyan-400 to-blue-500 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:scale-105 hover:shadow-cyan-500/30 transition-transform duration-300">
                <Link to="/produtos/cadastrar">+ Nova oportunidade</Link>
                </button>
                </div>
                {(!isLoading && produtos.length === 0) && (
	                <span className="text-3xl text-center my-8">
		                Nenhuma oportunidade foi encontrada!
	                </span>
                )}
                <div className="grid grid-cold-1 md:grid-cols-2
                                lg:grid-cols-3 gap-8">
                                    {
                                    produtos.map((produto) => (
    	                                <CardProduto key={produto.id} produto={produto}/>
                                    ))
                                    }
                                </div>
            </div>
        </div>
        </>
    )
}
export default ListaProdutos;