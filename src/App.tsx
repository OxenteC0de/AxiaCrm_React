import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

// Produtos
import ListaProdutos from "./components/produto/listaproduto/ListaProduto";
import FormProduto from "./components/produto/formproduto/FormProduto";
import DeletarProduto from "./components/produto/deletarproduto/DeletarProduto";

// Usuários
import ListaUsuarios from "./components/usuario/listausuario/ListaUsuario";
import FormUsuario from "./components/usuario/formusuario/FormUsuario";
import DeletarUsuario from "./components/usuario/deletarusuario/DeletarUsuario";

// Clientes
import ListaClientes from "./components/clientes/listaclientes/ListaClientes";
import DeletarCliente from "./components/clientes/deletarclientes/DeletarCliente";
import FormCliente from "./components/clientes/formclientes/FormCliente";

// Páginas

import Home from "./pages/home/Home";
import Contato from "./pages/contato/Contato";
import SolicitarDemonstracao from "./pages/solicitardemonstracao/SolicitarDemonstracao";
// Componentes
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";



function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />

          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/contato" element={<Contato />} />
              <Route
                path="/solicitar-demonstracao"
                element={<SolicitarDemonstracao />}
              />

              {/* Produtos/Oportunidades */}
              <Route path="/oportunidades" element={<ListaProdutos />} />
              <Route
                path="/oportunidades/cadastrar"
                element={<FormProduto />}
              />
              <Route
                path="/editaroportunidades/:id"
                element={<FormProduto />}
              />
              <Route
                path="/deletaoportunidades/:id"
                element={<DeletarProduto />}
              />

              {/* Usuários */}
              <Route path="/usuarios" element={<ListaUsuarios />} />
              <Route path="/cadastrarusuario" element={<FormUsuario />} />
              <Route path="/editarusuario/:id" element={<FormUsuario />} />
              <Route path="/deletarusuario/:id" element={<DeletarUsuario />} />

              {/* Clientes */}
              <Route path="/clientes" element={<ListaClientes />} />
              <Route path="/cadastrarcliente" element={<FormCliente />} />
              <Route path="/editarcliente/:id" element={<FormCliente />} />
              <Route path="/deletarcliente/:id" element={<DeletarCliente />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
