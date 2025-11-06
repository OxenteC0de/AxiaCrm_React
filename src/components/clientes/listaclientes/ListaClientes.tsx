/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import type Clientes from "../../../models/Clientes";
import { buscar } from "../../../services/Service";
import CardClientes from "../cardclientes/CardClientes";
import { useNavigate } from "react-router-dom";

function ListaClientes() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [clientes, setClientes] = useState<Clientes[]>([]);

  useEffect(() => {
    buscarClientes();
  }, [clientes.length]);

  async function buscarClientes() {
    try {
      setIsLoading(true);
      await buscar("/clientes", setClientes);
    } catch (error: any) {
      if (error.toString().includes("401")) {
        navigate("/");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading && (
        <div className="flex justify-center w-full my-8">
          <SyncLoader color="#312e81" size={32} />
        </div>
      )}

      <div className="flex justify-center w-full my-4">
        <div className="container flex flex-col">
          {!isLoading && clientes.length === 0 && (
            <span className="text-3xl text-center my-8">
              Nenhum cliente foi encontrado!
            </span>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clientes.map((clientes) => (
              <CardClientes key={clientes.id} clientes={clientes} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ListaClientes;