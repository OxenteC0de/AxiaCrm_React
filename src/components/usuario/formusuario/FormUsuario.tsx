import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import type Usuario from "../../../models/Usuario";
import { atualizar, atualizarPatch, buscar, cadastrar } from "../../../services/services";

function FormUsuario() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    email: "",
    nome: "",
    senha: "",
    foto: "",
    cargo: "usuario",
  });

  const [confirmarSenha, setConfirmarSenha] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);

  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    try {
      setIsLoadingData(true);
      await buscar(
        `/usuarios/${id}`,
        (dados) => {
          console.log("Usuário buscado:", dados);
          setUsuario({
            id: dados.id,
            email: dados.email || "",
            nome: dados.nome || "",
            foto: dados.foto || "",
            cargo: dados.cargo || "usuario",
          });
        },
        {}
      );
    } catch (error: any) {
      console.error("Erro ao buscar usuário:", error);
      alert("Erro ao buscar usuário: " + error.message);
    } finally {
      setIsLoadingData(false);
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    } else {
      setIsLoadingData(false);
    }
  }, [id]);

  function atualizarEstado(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setUsuario((prev) => ({
      ...prev,
      [name]: value || "",
    }));
  }

  function retornar() {
    navigate("/usuarios");
  }

  async function gerarNovoUsuario(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    // Validação email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(usuario.email)) {
      alert("Email inválido!");
      setIsLoading(false);
      return;
    }

    // Validação nome
    if (!usuario.nome || usuario.nome.length < 3) {
      alert("Nome deve ter no mínimo 3 caracteres!");
      setIsLoading(false);
      return;
    }

    // Validação senha (apenas ao criar)
    if (id === undefined) {
      const senhaRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      if (!senhaRegex.test(usuario.senha)) {
        alert(
          "Senha deve conter letras e números, com no mínimo 8 caracteres!"
        );
        setIsLoading(false);
        return;
      }

      if (usuario.senha !== confirmarSenha) {
        alert("As senhas não coincidem!");
        setIsLoading(false);
        return;
      }
    }

    console.log("Enviando usuário:", usuario);

    try {
      if (id !== undefined) {
        // ATUALIZAR - sem senha
        const dadosAtualizacao: any = {
          email: usuario.email,
          nome: usuario.nome,
          cargo: usuario.cargo || "usuario",
        };
        if (usuario.foto) {
          dadosAtualizacao.foto = usuario.foto;
        }

        console.log("Atualizando:", dadosAtualizacao);
        await atualizarPatch(
          `/usuarios/${id}`,
          dadosAtualizacao,
          setUsuario,
          {}
        );
        alert("Usuário atualizado com sucesso!");
      } else {
        // CRIAR - com senha
        const dados = {
          email: usuario.email,
          nome: usuario.nome,
          senha: usuario.senha,
          cargo: usuario.cargo || "usuario",
        };
        if (usuario.foto) {
          dados.foto = usuario.foto;
        }

        console.log("Criando:", dados);
        await cadastrar(`/usuarios`, dados, setUsuario);
        alert("Usuário cadastrado com sucesso!");
      }
      retornar();
    } catch (error: any) {
      console.error("Erro:", error);
      console.error("Resposta:", error.response?.data);
      alert(
        "Erro ao salvar usuário: " +
          (error.response?.data?.message || error.message)
      );
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoadingData) {
    return (
      <div className="bg-gradient-to-r from-[#0B2C59] via-[#0077B6] to-[#00B4D8] flex justify-center w-full min-h-screen items-center">
        <ClipLoader color="white" size={50} />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-[#0B2C59] via-[#0077B6] to-[#00B4D8] flex justify-center w-full min-h-screen items-center p-4">
      <div className="backdrop-blur-sm bg-white/90 rounded-2xl shadow-xl p-10 w-full max-w-md">
        <h1 className="text-4xl text-center my-8 text-gray-800">
          {id === undefined ? "Cadastrar Usuário" : "Editar Usuário"}
        </h1>

        <form className="flex flex-col gap-4" onSubmit={gerarNovoUsuario}>
          {/* Email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-semibold text-gray-700">
              Email *
            </label>
            <input
              type="email"
              placeholder="seu@email.com"
              name="email"
              id="email"
              className="border-2 border-slate-700 rounded p-2"
              value={usuario.email || ""}
              onChange={atualizarEstado}
              required
            />
          </div>

          {/* Nome */}
          <div className="flex flex-col gap-2">
            <label htmlFor="nome" className="font-semibold text-gray-700">
              Nome *
            </label>
            <input
              type="text"
              placeholder="Digite o nome completo"
              name="nome"
              id="nome"
              className="border-2 border-slate-700 rounded p-2"
              value={usuario.nome || ""}
              onChange={atualizarEstado}
              required
            />
          </div>

          {/* Cargo */}
          <div className="flex flex-col gap-2">
            <label htmlFor="cargo" className="font-semibold text-gray-700">
              Cargo
            </label>
            <select
              name="cargo"
              id="cargo"
              className="border-2 border-slate-700 rounded p-2"
              value={usuario.cargo || "usuario"}
              onChange={atualizarEstado}
            >
              <option value="usuario">Usuário</option>
              <option value="moderador">Moderador</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Foto (URL) */}
          <div className="flex flex-col gap-2">
            <label htmlFor="foto" className="font-semibold text-gray-700">
              Foto (URL)
            </label>
            <input
              type="text"
              placeholder="URL da foto"
              name="foto"
              id="foto"
              className="border-2 border-slate-700 rounded p-2"
              value={usuario.foto || ""}
              onChange={atualizarEstado}
            />
          </div>

          {/* Senha - Apenas ao Criar */}
          {id === undefined && (
            <>
              <div className="flex flex-col gap-2">
                <label htmlFor="senha" className="font-semibold text-gray-700">
                  Senha *
                </label>
                <input
                  type="password"
                  placeholder="Mínimo 8 caracteres (letras e números)"
                  name="senha"
                  id="senha"
                  className="border-2 border-slate-700 rounded p-2"
                  value={usuario.senha || ""}
                  onChange={atualizarEstado}
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="confirmarSenha"
                  className="font-semibold text-gray-700"
                >
                  Confirmar Senha *
                </label>
                <input
                  type="password"
                  placeholder="Confirme a senha"
                  name="confirmarSenha"
                  id="confirmarSenha"
                  className="border-2 border-slate-700 rounded p-2"
                  value={confirmarSenha || ""}
                  onChange={(e) => setConfirmarSenha(e.target.value || "")}
                  required
                />
              </div>
            </>
          )}

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

export default FormUsuario;
