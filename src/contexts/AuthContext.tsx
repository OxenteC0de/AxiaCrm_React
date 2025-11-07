import { createContext, type ReactNode, useState } from "react";
import type Usuario from "../models/Usuario";
import { login } from "../services/services";

interface AuthContextProps {
  usuario: Usuario;
  handleLogin: (usuario: Usuario) => Promise<void>;
  handleLogout: () => void;
  isLoading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const defaultValue: AuthContextProps = {
  usuario: {
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
  },
  handleLogin: async () => {},
  handleLogout: () => {},
  isLoading: false,
};

export const AuthContext = createContext<AuthContextProps>(defaultValue);

export function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(usuarioLogin: Usuario) {
    setIsLoading(true);
    try {
      await login("/usuarios/logar", usuarioLogin, setUsuario);
      localStorage.setItem("@axiacrm:usuario", JSON.stringify(usuario));
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  function handleLogout() {
    setUsuario(defaultValue.usuario);
    localStorage.removeItem("@axiacrm:usuario");
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        handleLogin,
        handleLogout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
