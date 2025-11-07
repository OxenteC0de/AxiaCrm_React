import {  useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { atualizar, buscar, cadastrar} from "../../../services/Service";
import { ClipLoader } from "react-spinners";
import type Produto from "../../../models/Produto";

function FormProduto(){

    const navigate = useNavigate();

    const [produto, setProduto] = useState<Produto>({} as Produto)

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const {id} = useParams<{id: string}>();

    async function buscarPorId(id: string) {
       
            await buscar(`/produto/${id}`, setProduto)
      
    }

    useEffect(() => {
        if(id !==undefined){
            buscarPorId(id)
        }
    }, [id])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>){
        setProduto({
           ...produto,
           [e.target.name]: e.target.value 
        })
    }

    function retornar(){
        navigate("/produtos")
    }

    async function gerarNovaOportunidade(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

            try{
                if (id !== undefined) {
                    await atualizar(`/produtos/${id}`, produto, setProduto)
                    alert('A categoria foi atualizada com sucesso!')
                    } else {
                await cadastrar  (`/produtos`, produto, setProduto)
                alert('Oportidade cadastrada com sucesso!')
                }
                retornar()
            } catch (error: any){
                alert('Erro ao cadastrar a oportunidade.')                 
            
        } finally{
        setIsLoading(false)
        }
    }        
    
        
    
    return(
        
        <div className="bg-gradient-to-r from-[#0B2C59] via-[#0077B6] to-[#00B4D8] flex justify-center w-full min-h-screen">
        <div className="backdrop-blur-sm bg-white/80 rounded-2xl shadow-xl p-10  max-w-md">
            <h1 className="text-4xl text-center my-8">
                {id === undefined? 'Cadastrar Oportunidade' : 'Editar Oportunidade'}
            </h1>

            <form className="w-1/2 flex flex-col gap-4"
                    onSubmit={gerarNovaOportunidade}>
            
             <div className="flex flex-col gap-2">
    <label htmlFor="nome">Nome da oportunidade</label>
    <input
      type="text"
      placeholder="Digite o nome da oportunidade"
      name="nome"
      className="border-2 border-slate-700 rounded p-2"
      value={produto.titulo}
      onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
    />
  </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="descricao">Descrição</label>

                <input type="text"
                        placeholder="Descreva aqui a oportunidade"
                        name="descricao"
                        className="border-2 border-slate-700 rounded p-2"
                        value={produto.descricao}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                         />
            </div>

            
            <button
                className="bg-linear-to-r from-cyan-400 to-blue-500 text-white px-8 py-3 
                rounded-lg font-semibold shadow-lg 
                hover:scale-105 hover:shadow-cyan-500/30 transition-transform duration-300"
                            
                type="submit">
                    {isLoading ?
                            <ClipLoader
                                color="white"
                                size={24}
                            />:
                            <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>
                            }
                </button>
            </form>
            </div>
        </div>
    )
}

export default FormProduto;