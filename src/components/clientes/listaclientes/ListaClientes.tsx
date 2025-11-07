import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import type Clientes from "../../../models/Clientes";
import { buscar } from "../../../services/services";
import CardCliente from "../cardclientes/CardCliente";

function ListaClientes() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [clientes, setClientes] = useState<Clientes[]>([]);

  useEffect(() => {
    buscarClientes();
  }, []);

  async function buscarClientes() {
    try {
      setIsLoading(true);
      await buscar("/clientes", setClientes, {});
    } catch (error: any) {
      console.error("Erro ao buscar clientes:", error);
      alert("Erro ao buscar clientes: " + error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-gradient-to-r from-[#0B2C59] via-[#0077B6] to-[#00B4D8] min-h-screen py-8">
      <div className="container mx-auto px-4">
        {isLoading && (
          <div className="flex justify-center my-8">
            <SyncLoader color="white" size={32} />
          </div>
        )}

        {!isLoading && (
          <>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl font-bold text-white">Clientes</h1>
              <Link to="/cadastrarcliente">
                <button className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:scale-105 hover:shadow-cyan-500/30 transition-transform duration-300">
                  + Novo cliente
                </button>
              </Link>
            </div>

            {clientes.length === 0 ? (
              <div className="text-center">
                <span className="text-3xl text-white">
                  Nenhum cliente foi encontrado!
                </span>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {clientes.map((cliente) => (
                  <CardCliente key={cliente.id} cliente={cliente} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ListaClientes;
