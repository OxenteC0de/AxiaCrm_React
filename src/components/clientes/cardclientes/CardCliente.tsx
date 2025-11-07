import { Link } from "react-router-dom";
import type Clientes from "../../../models/Clientes";

interface CardClienteProps {
  cliente: Clientes;
}

function CardCliente({ cliente }: CardClienteProps) {
  return (
    <div className="flex flex-col rounded-2xl overflow-hidden justify-between shadow-lg border border-gray-200">
      <header className="py-2 px-6 bg-[#0077B6] text-white font-bold text-2xl">
        {cliente.nome}
      </header>

      <div className="p-8 bg-white min-h-[120px] flex flex-col gap-2">
        <p className="text-xl text-gray-700">{cliente.descricao}</p>
        {cliente.email && (
          <p className="text-sm text-gray-500">📧 {cliente.email}</p>
        )}
        {cliente.telefone && (
          <p className="text-sm text-gray-500">📞 {cliente.telefone}</p>
        )}
      </div>

      <div className="flex">
        <Link
          to={`/editarcliente/${cliente.id}`}
          className="w-full text-slate-100 bg-[#0077B6] hover:bg-[#0B2C59]
            flex items-center justify-center py-3 transition-colors"
        >
          <button>Editar</button>
        </Link>

        <Link
          to={`/deletarcliente/${cliente.id}`}
          className="text-slate-100 bg-[#0B2C59] hover:bg-red-600 w-full
            flex items-center justify-center transition-colors"
        >
          <button>Deletar</button>
        </Link>
      </div>
    </div>
  );
}

export default CardCliente;
