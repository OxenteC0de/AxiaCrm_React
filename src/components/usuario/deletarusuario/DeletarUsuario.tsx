import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type Usuario from "../../../models/Usuario";
import { buscar, deletar } from "../../../services/services";
import { ClipLoader } from "react-spinners";

function DeletarUsuario() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);
  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    email: "",
    nome: "",
    cargo: "usuario",
  });

  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    try {
      setIsLoadingData(true);
      await buscar(
        `/usuarios/${id}`,
        (dados: { id: any; email: any; nome: any; cargo: any; }) => {
          console.log("Usuário buscado:", dados);
          setUsuario({
            id: dados.id,
            email: dados.email || "",
            nome: dados.nome || "",
            cargo: dados.cargo || "usuario",
          });
        },
        {}
      );
    } catch (error: any) {
      console.error("Erro ao buscar usuário:", error);
      alert("Erro ao buscar usuário: " + error.message);
      retornar();
    } finally {
      setIsLoadingData(false);
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  async function deletarUsuario() {
    if (!window.confirm("Tem certeza que deseja deletar este usuário?")) {
      return;
    }

    setIsLoading(true);

    try {
      await deletar(`/usuarios/${id}`, {});
      alert("Usuário deletado com sucesso!");
      retornar();
    } catch (error: any) {
      console.error("Erro ao deletar:", error);
      alert("Erro ao deletar usuário: " + error.message);
    } finally {
      setIsLoading(false);
    }
  }

  function retornar() {
    navigate("/usuarios");
  }

  if (isLoadingData) {
    return (
      <div className="bg-gradient-to-r from-[#0B2C59] via-[#0077B6] to-[#00B4D8] flex justify-center items-center w-full min-h-screen">
        <ClipLoader color="white" size={50} />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-[#0B2C59] via-[#0077B6] to-[#00B4D8] flex justify-center items-center w-full min-h-screen p-4">
      <div className="container w-full max-w-md">
        <h1 className="text-4xl text-white text-center my-4">
          Deletar Usuário
        </h1>

        <p className="text-center text-white font-semibold mb-4">
          Você tem certeza que deseja apagar este usuário?
        </p>

        {usuario.id === 0 ? (
          <div className="text-center text-white">
            <p>Usuário não encontrado</p>
            <button
              onClick={retornar}
              className="mt-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            >
              Voltar
            </button>
          </div>
        ) : (
          <div className="border border-gray-200 flex flex-col rounded-2xl overflow-hidden justify-between shadow-xl">
            <header className="py-2 px-6 bg-[#0077B6] text-white font-bold text-2xl">
              {usuario.nome}
            </header>

            <div className="p-6 bg-white min-h-[100px] flex flex-col gap-2">
              <p className="text-lg font-bold text-gray-700">
                📧 {usuario.email}
              </p>
              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded w-fit">
                {usuario.cargo || "usuario"}
              </span>
            </div>

            <div className="flex">
              <button
                className="w-full text-slate-100 bg-gray-500 hover:bg-gray-600
                  flex items-center justify-center py-3 transition-colors"
                onClick={retornar}
                disabled={isLoading}
              >
                Não
              </button>

              <button
                className="text-slate-100 bg-red-500 hover:bg-red-700 w-full
                  flex items-center justify-center transition-colors disabled:opacity-50"
                onClick={deletarUsuario}
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
        )}
      </div>
    </div>
  );
}

export default DeletarUsuario;
