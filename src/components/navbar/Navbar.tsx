import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { handleLogout } = useContext(AuthContext);

  function logout() {
    handleLogout();
    navigate("/");
  }

  return (
    <nav className="bg-[#0077B6] text-white py-4 shadow-lg">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-cyan-300">
          AxiaCRM
        </Link>

        <div className="flex gap-8 items-center">
          <Link to="/clientes" className="hover:text-cyan-300 transition">
            Clientes
          </Link>
          <Link to="/oportunidades" className="hover:text-cyan-300 transition">
            Oportunidades
          </Link>
          <Link to="/usuarios" className="hover:text-cyan-300 transition">
            Usuários
          </Link>
          <Link to="/contato" className="hover:text-cyan-300 transition">
            Contato
          </Link>

          <button
            onClick={logout}
            className="border-2 border-cyan-400 px-4 py-2 rounded-lg hover:bg-cyan-400 hover:text-[#0B2C59] transition-all duration-300 font-semibold shadow-md"
          >
            Sair
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
