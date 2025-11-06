import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListaProdutos from "./components/produto/listaproduto/ListaProduto";
import FormProduto from "./components/produto/formproduto/FormProduto";
import DeletarProduto from "./components/produto/deletarproduto/DeletarProduto";


function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        {/* Página inicial */}
        {/* <Route path="/" element={<Home />} /> */}

        {/* Listagem de produtos */}
        <Route path="/produtos" element={<ListaProdutos />} />

        {/* cadastrar um novo produto */}
        <Route path="/produtos/cadastrar" element={<FormProduto />} />

        {/* Formulário para editar um produto existente */}
        <Route path="/editarproduto" element={<FormProduto />} />

        {/* Deletar um produto */}
        <Route path="/deletarproduto/" element={<DeletarProduto />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
