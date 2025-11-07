import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import type Clientes from "../../../models/Clientes";
import { atualizar, buscar, cadastrar } from "../../../services/services";

function FormCliente() {
  const navigate = useNavigate();

  const [cliente, setCliente] = useState<Clientes>({
    id: 0,
    nome: "",
    descricao: "",
    email: "",
    telefone: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    try {
      await buscar(`/clientes/${id}`, setCliente, {});
    } catch (error: any) {
      console.error("Erro ao buscar cliente:", error);
      alert("Erro ao buscar cliente: " + error.message);
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setCliente({
      ...cliente,
      [e.target.name]: e.target.value,
    });
  }

  function retornar() {
    navigate("/clientes");
  }

  async function gerarNovoCliente(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (id !== undefined) {
        await atualizar(`/clientes/${id}`, cliente, setCliente, {});
        alert("Cliente atualizado com sucesso!");
      } else {
        await cadastrar(`/clientes`, cliente, setCliente);
        alert("Cliente cadastrado com sucesso!");
      }
      retornar();
    } catch (error: any) {
      console.error("Erro:", error);
      alert("Erro ao salvar cliente: " + error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-gradient-to-r from-[#0B2C59] via-[#0077B6] to-[#00B4D8] flex justify-center w-full min-h-screen items-center p-4">
      <div className="backdrop-blur-sm bg-white/90 rounded-2xl shadow-xl p-10 w-full max-w-md">
        <h1 className="text-4xl text-center my-8 text-gray-800">
          {id === undefined ? "Cadastrar Cliente" : "Editar Cliente"}
        </h1>

        <form className="flex flex-col gap-4" onSubmit={gerarNovoCliente}>
          <div className="flex flex-col gap-2">
            <label htmlFor="nome" className="font-semibold text-gray-700">
              Nome do Cliente
            </label>
            <input
              type="text"
              placeholder="Digite o nome"
              name="nome"
              id="nome"
              className="border-2 border-slate-700 rounded p-2"
              value={cliente.nome}
              onChange={atualizarEstado}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="descricao" className="font-semibold text-gray-700">
              Descrição
            </label>
            <input
              type="text"
              placeholder="Descrição do cliente"
              name="descricao"
              id="descricao"
              className="border-2 border-slate-700 rounded p-2"
              value={cliente.descricao}
              onChange={atualizarEstado}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Email do cliente"
              name="email"
              id="email"
              className="border-2 border-slate-700 rounded p-2"
              value={cliente.email}
              onChange={atualizarEstado}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="telefone" className="font-semibold text-gray-700">
              Telefone
            </label>
            <input
              type="tel"
              placeholder="Telefone do cliente"
              name="telefone"
              id="telefone"
              className="border-2 border-slate-700 rounded p-2"
              value={cliente.telefone}
              onChange={atualizarEstado}
            />
          </div>

          <button
            className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-8 py-3 
              rounded-lg font-semibold shadow-lg 
              hover:scale-105 hover:shadow-cyan-500/30 transition-transform duration-300"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <ClipLoader color="white" size={24} />
            ) : (
              <span>{id === undefined ? "Cadastrar" : "Atualizar"}</span>
            )}
          </button>

          <button
            type="button"
            onClick={retornar}
            className="bg-gray-500 text-white px-8 py-3 rounded-lg font-semibold 
              hover:bg-gray-600 transition-colors duration-300"
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormCliente;
