import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import type Produto from "../../../models/Produto"
import { buscar, deletar } from "../../../services/Service"
import { ClipLoader } from "react-spinners"

function DeletarProduto() {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [produto, setProduto] = useState<Produto>({} as Produto)

    const { id } = useParams<{ id: string }>()

    async function buscarPorId(id: string) {
        await buscar(`/produtos/${id}`, setProduto)
    }

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    async function deletarProduto() {
        setIsLoading(true)

        try {
            await deletar(`/produtos/${id}`)
            alert('Oportunidade apagada com sucesso')
            retornar()
        } catch (error: any) {
            alert('Erro ao deletar a oportunidade.')
        } finally {
            setIsLoading(false)
        }
    }

    function retornar() {
        navigate("/produtos")
    }
    
    return (
        <div className="bg-gradient-to-r from-[#0B2C59] via-[#0077B6] to-[#00B4D8] flex justify-center w-full my-4">
        <div className='container w-1/3 mx-auto'>
            <h1 className='text-4xl text-white text-center my-4'>Deletar Oportunidade</h1>

            <p className='text-center text-white font-semibold mb-4'>
                Você tem certeza de que deseja apagar a oportunidade a seguir?
            </p>

            <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
                <header 
                    className='py-2 px-6 bg-[#0077B6] text-white font-bold text-2xl'>
                    {produto.titulo}
                </header>
                <div className="p-4 bg-white/80">
                    <p className='text-xl h-full'>{produto.descricao}</p>
                </div>
                <div className="flex">
                    <button 
                        className='w-full text-slate-100 bg-[#0077B6] hover:bg-[#0B2C59]
                        flex items-center justify-center py-2'
                        onClick={retornar}>
                        Não
                    </button>
                    <button 
                        className='text-slate-100 bg-[#0B2C59] hover:bg-[#0077B6] w-full
                    flex items-center justify-center'
                        onClick={deletarProduto}>

                        { isLoading ? 
                            <ClipLoader 
                                color="white" 
                                size={24}
                            /> : 
                            <span>Sim</span>
                        }
                        
                    </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeletarProduto;