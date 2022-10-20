import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Header() {
    const { cerrarSesion } = useAuth()

  return (
    <header className="py-10 px-10 bg-indigo-600">
        <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center ">
            <h1 className="font-bold text-2xl text-indigo-200 text-center">Administrador de
            <span className="text-white"> Eventos</span>
            </h1>
            <nav className="flex felx-col lg:flex-row gap-4 mt-5 lg:mt-0">
                <Link to='/admin' className="text-white text-xs uppercase font-bold">Clientes</Link>
                <Link to='/admin' className="text-white text-xs uppercase font-bold">Perfil</Link>

                <button 
                    type='button' 
                    className="text-white text-xs uppercase font-bold"
                    onClick={cerrarSesion} 
                    >Cerrar Sesión</button>
            </nav>
        </div>

    </header>
  )
}

export default Header;