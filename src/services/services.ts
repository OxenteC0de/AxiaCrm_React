import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Buscar dados
export const buscar = async (url: string, setDado: any, config: any) => {
  const response = await api.get(url, config);
  setDado(response.data);
  return response.data;
};

// Cadastrar (POST)
export const cadastrar = async (url: string, dados: any, setDado: any) => {
  const response = await api.post(url, dados);
  setDado(response.data);
  return response.data;
};

//Logar (POST)
export const login = async (
  url: string,
  dados: Object,
  setDados: Function
) => {
  const resposta = await api.post(url, dados);
  setDados(resposta.data);
};

// Atualizar completo (PUT)
export const atualizar = async (
  url: string,
  dados: any,
  setDado: any,
  config: any
) => {
  const response = await api.put(url, dados, config);
  setDado(response.data);
  return response.data;
};

// Atualizar parcial (PATCH) , pois no back por algum motivo do passado a gente usou patch para atualizar!
export const atualizarPatch = async (
  url: string,
  dados: any,
  setDado: any,
  config: any
) => {
  const response = await api.patch(url, dados, config);
  setDado(response.data);
  return response.data;
};

// Deletar
export const deletar = async (url: string, config: any) => {
  const response = await api.delete(url, config);
  return response.data;
};
