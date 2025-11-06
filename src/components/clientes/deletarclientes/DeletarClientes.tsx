/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { buscar, deletar } from "../../../services/Service";
import type Clientes from "../../../models/Clientes";

function DeletarClientes() {
  const navigate = useNavigate();

  const [clientes, setClientes] = useState<Clientes>({} as Clientes);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    try {
      await buscar(`/clientes/${id}`, setClientes);
    } catch (error: any) {
      if (error.toString().includes("401")) {
        navigate("/");
      }
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  async function deletarClientes() {
    setIsLoading(true);

    try {
      await deletar(`/clientes/${id}`);
      alert("O cliente foi deletado com sucesso!");
    } catch (error: any) {
      if (error.toString().includes("401")) {
        navigate('/')
      } else {
        alert("Erro ao deletar cliente.");
      }
    }

    setIsLoading(false);
    retornar();
  }

  function retornar() {
    navigate("/clientes");
  }

  return (
    <div className="container w-1/3 mx-auto">
      <h1 className="text-4xl text-center my-4">Deletar Cliente</h1>

      <p className="text-center font-semibold mb-4">
        Você tem certeza que deseja apagar esse cliente?
      </p>

      <div className="border flex flex-col rounded-2xl overflow-hidden justify-between">
        <header className="py-2 px-6 bg-blue-500 text-white font-bold text-2xl">
          {clientes.nome}
        </header>

        <p className="p-8 text-3xl bg-slate-200 h-full">{clientes.descricao}</p>

        <div className="flex">
          <button
            className="text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2"
            onClick={retornar}
          >
            Não
          </button>

          <button
            className="w-full text-slate-100 bg-indigo-400 hover:bg-indigo-600 flex items-center justify-center"
            onClick={deletarClientes}
          >
            {isLoading ? (
              <ClipLoader color="#ffffff" size={24} />
            ) : (
              <span>Sim</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletarClientes;