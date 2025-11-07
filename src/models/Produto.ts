export default interface Produto {
  id: number;
  titulo: string;
  descricao?: string;
  valor: number;
  status: boolean;
  cliente?: { id: number };
}
