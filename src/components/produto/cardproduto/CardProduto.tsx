import type Produto from '../../../models/Produto';
import { Link } from 'react-router-dom';

interface CardProdutoProps{
    produto: Produto;
}
function CardProduto({produto}: CardProdutoProps){
    return(
        <div className="background:linear-gradient(135deg, #0B2C59 0%, #0077B6 50%, #00B4D8 100% flex justify-center w-full my-4">
        <div className='border-gray-400 flex flex-col rounded-2xl overflow-hidden justify-between'>
            <header className='py-2 px-6 bg-[#0077B6] text-white font-bold text-2xl'>{produto.titulo}</header>
            <p className='p-8 text-3xl bg-[#fffafa]+33 h-full'>{produto.descricao}</p>

            <div className='flex'>

                <Link to={`/editarproduto/${produto.id}`}
                    className='w-full text-slate-100 bg-[#0077B6] hover:bg-[#0B2C59]
                        flex items-center justify-center py-2'>

                            <button>Editar</button>
                        </Link>

                <Link to={`/deletarproduto/${produto.id}`} 

                    className='text-slate-100 bg-[#0B2C59] hover:bg-[#0077B6] w-full
                    flex items-center justify-center'>
                        <button>Deletar</button>
                    </Link>
                    </div>
            </div>
        </div>
    )
}

export default CardProduto;