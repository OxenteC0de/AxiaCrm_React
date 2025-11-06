import { Link } from "react-router-dom";
import type Clientes from "../../../models/Clientes";

interface CardClientesProps{
    cliente: Clientes
}

function CardClientes({ clientes }: CardClientesProps) {
  return (
    <div className='flex flex-col rounded-xl overflow-hidden justify-between'>
      <header className='py-2 px-6 bg-blue-300 text-white font-bold text-2x1 flex justify-center'>Clientes</header>
      <p className="p-8 text-3x1 bg-[#e6e6ff] text-white font-bold flex justify-center h-full">{clientes.descricao}</p>

      <div className="flex">
        <Link
          to={`/editarclientes/${clientes.id}`}
          className="text-white bg-blue-500
                hover:bg-blue-300 w-1/2 py-2
                flex justify-center">
          <button>Editar</button>
        </Link>

        <Link
          to={`/deletarclientes/${clientes.id}`} 
          className='rounded-x1 text-white bg-red-500 hover:bg-red-400 w-1/2 py-2 flex justify-center'
        >
          <button>Deletar</button>
        </Link>
      </div>
    </div>
  );
}

export default CardClientes;
