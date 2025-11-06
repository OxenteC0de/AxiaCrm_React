/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import type Clientes from "../../../models/Clientes";

function FormClientes() {
  const navigate = useNavigate();

  const [clientes, setClientes] = useState<Clientes>({} as Clientes);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    try {
      await buscar(`/clientes/${id}`, setClientes);
    } catch (error: any) {
      if (error.toString().includes("401")) {
        navigate('/')
      }
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setClientes({
      ...clientes,
      [e.target.name]: e.target.value,
    });
  }

  function retornar() {
    navigate("/clientes");
  }

  async function gerarNovoCliente(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (id !== undefined) {
      try {
        await atualizar(`/clientes`, clientes, setClientes);
        alert('O cliente foi atualizado com sucesso!')
      } catch (error: any) {
        if (error.toString().includes("401")) {
          // handleLogout();
          navigate('/')
        } else {
          alert('Erro ao atualizar os dados do cliente!')
        }
      }
    } else {
      try {
        await cadastrar(`/clientes`, clientes, setClientes);
        alert("O cliente foi cadastrado com sucesso!");
      } catch (error: any) {
        if (error.toString().includes("401")) {
          // handleLogout();
          navigate('/')
        } else {
          alert('Erro ao cadastrar cliente!')
        }
      }
    }

    setIsLoading(false);
    retornar();
  }

  return (
    <div className="container flex flex-col items-center justify-center mx-auto">
      <h1 className="text-4xl text-center my-8">
        {id === undefined ? "Cadastrar Cliente" : "Editar Cliente"}
      </h1>

      <form className="w-1/2 flex flex-col gap-4" onSubmit={gerarNovoCliente}>
        <div className="flex flex-col gap-2">
          <label htmlFor="descricao">Nome do Cliente</label>
          <input
            type="text"
            placeholder="Digite o nome do cliente"
            name="nome"
            className="border-2 border-pink-700 rounded p-2"
            value={clientes.nome}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />

          <label htmlFor="descricao">Descrição do Cliente</label>
          <input
            type="text"
            placeholder="Digite a descrição do cliente"
            name="descricao"
            className="border-2 border-pink-700 rounded p-2"
            value={clientes.descricao}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>

        <button
          className="rounded text-slate-100 bg-pink-200 hover:bg-pink-600 w-1/2 py-2 mx-auto flex justify-center"
          type="submit"
        >
          {isLoading ? (
            <ClipLoader color="#ffffff" size={24} />
          ) : (
            <span>{id === undefined ? "Cadastrar" : "Atualizar"}</span>
          )}
        </button>
      </form>
    </div>
  );
}

export default FormClientes;