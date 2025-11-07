import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import type Produto from "../../../models/Produto";
import type Clientes from "../../../models/Clientes";
import { atualizar, buscar, cadastrar } from "../../../services/services";

function FormProduto() {
  const navigate = useNavigate();

const [produto, setProduto] = useState<Produto>({
  id: 0,
  titulo: "",
  descricao: "",
  data: "",
  status: false,
  clienteId: 0, 
});

  const [clientes, setClientes] = useState<Clientes[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { id } = useParams<{ id: string }>();

  // Buscar clientes
  useEffect(() => {
    buscarClientes();
  }, []);

  async function buscarClientes() {
    try {
      await buscar("/clientes", setClientes, {});
    } catch (error: any) {
      console.error("Erro ao buscar clientes:", error);
    }
  }

  // Buscar oportunidade por ID
  async function buscarPorId(id: string) {
    try {
      await buscar(`/oportunidades/${id}`, setProduto, {});
    } catch (error: any) {
      console.error("Erro ao buscar oportunidade:", error);
      alert("Erro ao buscar oportunidade: " + error.message);
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  function atualizarEstado(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setProduto({
      ...produto,
      [e.target.name]: e.target.value,
    });
  }

  function atualizarStatus(e: ChangeEvent<HTMLInputElement>) {
    setProduto({
      ...produto,
      status: e.target.checked,
    });
  }

  function retornar() {
    navigate("/produtos");
  }

  async function gerarNovaOportunidade(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    // Validar cliente selecionado
    if (!produto.clienteId) {
      alert("Selecione um cliente!");
      setIsLoading(false);
      return;
    }

    try {
      if (id !== undefined) {
        await atualizar(`/oportunidades/${id}`, produto, setProduto, {});
        alert("Oportunidade atualizada com sucesso!");
      } else {
        await cadastrar(`/oportunidades`, produto, setProduto);
        alert("Oportunidade cadastrada com sucesso!");
      }
      retornar();
    } catch (error: any) {
      console.error("Erro:", error);
      alert("Erro ao salvar oportunidade: " + error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-gradient-to-r from-[#0B2C59] via-[#0077B6] to-[#00B4D8] flex justify-center w-full min-h-screen items-center p-4">
      <div className="backdrop-blur-sm bg-white/90 rounded-2xl shadow-xl p-10 w-full max-w-md">
        <h1 className="text-4xl text-center my-8 text-gray-800">
          {id === undefined ? "Cadastrar Oportunidade" : "Editar Oportunidade"}
        </h1>

        <form className="flex flex-col gap-4" onSubmit={gerarNovaOportunidade}>
          {/* Cliente */}
          <div className="flex flex-col gap-2">
            <label htmlFor="clienteId" className="font-semibold text-gray-700">
              Cliente *
            </label>
            <select
              name="clienteId"
              id="clienteId"
              className="border-2 border-slate-700 rounded p-2"
              value={produto.clienteId}
              onChange={atualizarEstado}
              required
            >
              <option value="">Selecione um cliente</option>
              {clientes.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nome}
                </option>
              ))}
            </select>
          </div>

          {/* Título */}
          <div className="flex flex-col gap-2">
            <label htmlFor="titulo" className="font-semibold text-gray-700">
              Nome da oportunidade
            </label>
            <input
              type="text"
              placeholder="Digite o nome da oportunidade"
              name="titulo"
              id="titulo"
              className="border-2 border-slate-700 rounded p-2"
              value={produto.titulo}
              onChange={atualizarEstado}
              required
            />
          </div>

          {/* Descrição */}
          <div className="flex flex-col gap-2">
            <label htmlFor="descricao" className="font-semibold text-gray-700">
              Descrição
            </label>
            <input
              type="text"
              placeholder="Descreva aqui a oportunidade"
              name="descricao"
              id="descricao"
              className="border-2 border-slate-700 rounded p-2"
              value={produto.descricao}
              onChange={atualizarEstado}
              required
            />
          </div>

          {/* Data */}
          <div className="flex flex-col gap-2">
            <label htmlFor="data" className="font-semibold text-gray-700">
              Data
            </label>
            <input
              type="date"
              name="data"
              id="data"
              className="border-2 border-slate-700 rounded p-2"
              value={produto.data}
              onChange={atualizarEstado}
              required
            />
          </div>

          {/* Status */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="status"
              className="flex items-center cursor-pointer"
            >
              <input
                type="checkbox"
                name="status"
                id="status"
                checked={produto.status}
                onChange={atualizarStatus}
                className="mr-2 w-4 h-4"
              />
              <span className="font-semibold text-gray-700">
                Ativar oportunidade
              </span>
            </label>
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

export default FormProduto;
