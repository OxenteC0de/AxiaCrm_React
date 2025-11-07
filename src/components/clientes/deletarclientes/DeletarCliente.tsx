import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type Clientes from "../../../models/Clientes";
import { buscar, deletar } from "../../../services/services";
import { ClipLoader } from "react-spinners";

function DeletarCliente() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cliente, setCliente] = useState<Clientes>({
    id: 0,
    nome: "",
    descricao: "",
    email: "",
    telefone: "",
  });

  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    try {
      await buscar(`/clientes/${id}`, setCliente, {});
    } catch (error: any) {
      console.error("Erro ao buscar cliente:", error);
      alert("Erro ao buscar cliente: " + error.message);
      retornar();
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  async function deletarCliente() {
    setIsLoading(true);

    try {
      await deletar(`/clientes/${id}`, {});
      alert("Cliente deletado com sucesso");
      retornar();
    } catch (error: any) {
      console.error("Erro ao deletar:", error);
      alert("Erro ao deletar cliente: " + error.message);
    } finally {
      setIsLoading(false);
    }
  }

  function retornar() {
    navigate("/clientes");
  }

  return (
    <div className="bg-gradient-to-r from-[#0B2C59] via-[#0077B6] to-[#00B4D8] flex justify-center items-center w-full min-h-screen p-4">
      <div className="container w-full max-w-md">
        <h1 className="text-4xl text-white text-center my-4">
          Deletar Cliente
        </h1>

        <p className="text-center text-white font-semibold mb-4">
          Você tem certeza de que deseja apagar este cliente?
        </p>

        <div className="border border-gray-200 flex flex-col rounded-2xl overflow-hidden justify-between shadow-xl">
          <header className="py-2 px-6 bg-[#0077B6] text-white font-bold text-2xl">
            {cliente.nome}
          </header>

          <div className="p-6 bg-white min-h-[100px]">
            <p className="text-xl text-gray-700">{cliente.descricao}</p>
            {cliente.email && (
              <p className="text-sm text-gray-500">Email: {cliente.email}</p>
            )}
          </div>

          <div className="flex">
            <button
              className="w-full text-slate-100 bg-gray-500 hover:bg-gray-600
                flex items-center justify-center py-3 transition-colors"
              onClick={retornar}
            >
              Não
            </button>

            <button
              className="text-slate-100 bg-red-500 hover:bg-red-700 w-full
                flex items-center justify-center transition-colors"
              onClick={deletarCliente}
              disabled={isLoading}
            >
              {isLoading ? (
                <ClipLoader color="white" size={24} />
              ) : (
                <span>Sim</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeletarCliente;
