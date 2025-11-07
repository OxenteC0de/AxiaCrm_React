export default interface Produto {
  id: number;
  titulo: string;
  descricao: string;
  data: string;
  status: boolean;
  clienteId?: number;
  cliente?: any;
}
