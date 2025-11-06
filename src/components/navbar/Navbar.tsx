import { useContext, type ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { ToastAlerta } from '../../utils/ToastAlerta';

function Navbar() {

  const navigate = useNavigate();
  const { usuario, handleLogout } = useContext(AuthContext);

  function logout() {
    handleLogout();
    ToastAlerta('O Usuário foi desconectado com sucesso!', 'info');
    navigate('/');
  }

  let component: ReactNode;

  if (usuario.token !== "") {
    component = (

      // Fundo sólido corporativo + sombra leve
      <div className="w-full flex justify-center py-4 bg-primary-800 text-white shadow-md">
        <div className="container flex justify-between items-center text-lg px-4">

          <Link to='/home' className="font-semibold tracking-wide hover:text-secondary transition">
            CRM Pro
          </Link>

    ''      <div className="flex gap-6">
            <Link to='/postagens' className='hover:text-secondary transition'>Postagens</Link>

            <Link to='/temas' className='hover:text-secondary transition'>Temas</Link>

            <Link to='/cadastrartema' className='hover:text-secondary transition'>Cadastrar Tema</Link>

            <Link to='/perfil' className='hover:text-secondary transition'>Perfil</Link>

              <button 
              onClick={logout} 
              className="border border-secondary px-3 py-1 rounded-md hover:bg-secondary hover:text-primary-900 transition font-medium"
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{component}</>;
}

export default Navbar;
