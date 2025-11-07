import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import type Usuario from "../../../models/Usuario";
import { atualizar, buscar, cadastrar } from "../../../services/services";

function FormUsuario() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
  });

  const [confirmarSenha, setConfirmarSenha] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    try {
      await buscar(`/usuarios/${id}`, setUsuario, {});
    } catch (error: any) {
      console.error("Erro ao buscar usuário:", error);
      alert("Erro ao buscar usuário: " + error.message);
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  }

  function retornar() {
    navigate("/usuarios");
  }

  async function gerarNovoUsuario(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Validação de senha (letras e números)
    const senhaRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!senhaRegex.test(usuario.senha)) {
      alert(
        "A senha deve conter letras e números, com no mínimo 6 caracteres!"
      );
      return;
    }

    if (id === undefined && usuario.senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    setIsLoading(true);

    try {
      if (id !== undefined) {
        await atualizar(`/usuarios/${id}`, usuario, setUsuario, {});
        alert("Usuário atualizado com sucesso!");
      } else {
        await cadastrar(`/usuarios`, usuario, setUsuario);
        alert("Usuário cadastrado com sucesso!");
      }
      retornar();
    } catch (error: any) {
      console.error("Erro:", error);
      alert("Erro ao salvar usuário: " + error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-gradient-to-r from-[#0B2C59] via-[#0077B6] to-[#00B4D8] flex justify-center w-full min-h-screen items-center p-4">
      <div className="backdrop-blur-sm bg-white/90 rounded-2xl shadow-xl p-10 w-full max-w-md">
        <h1 className="text-4xl text-center my-8 text-gray-800">
          {id === undefined ? "Cadastrar Usuário" : "Editar Usuário"}
        </h1>

        <form className="flex flex-col gap-4" onSubmit={gerarNovoUsuario}>
          <div className="flex flex-col gap-2">
            <label htmlFor="nome" className="font-semibold text-gray-700">
              Nome
            </label>
            <input
              type="text"
              placeholder="Digite o nome"
              name="nome"
              id="nome"
              className="border-2 border-slate-700 rounded p-2"
              value={usuario.nome}
              onChange={atualizarEstado}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="usuario" className="font-semibold text-gray-700">
              Usuário
            </label>
            <input
              type="text"
              placeholder="Digite o usuário"
              name="usuario"
              id="usuario"
              className="border-2 border-slate-700 rounded p-2"
              value={usuario.usuario}
              onChange={atualizarEstado}
              required
            />
          </div>

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
              value={usuario.foto}
              onChange={atualizarEstado}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="senha" className="font-semibold text-gray-700">
              Senha
            </label>
            <input
              type="password"
              placeholder="Digite a senha (letras e números)"
              name="senha"
              id="senha"
              className="border-2 border-slate-700 rounded p-2"
              value={usuario.senha}
              onChange={atualizarEstado}
              required
            />
          </div>

          {id === undefined && (
            <div className="flex flex-col gap-2">
              <label
                htmlFor="confirmarSenha"
                className="font-semibold text-gray-700"
              >
                Confirmar Senha
              </label>
              <input
                type="password"
                placeholder="Confirme a senha"
                name="confirmarSenha"
                id="confirmarSenha"
                className="border-2 border-slate-700 rounded p-2"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                required
              />
            </div>
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
