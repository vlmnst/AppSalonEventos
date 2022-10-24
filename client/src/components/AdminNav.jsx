import { Link } from "react-router-dom";
function AdminNav() {
  return (
    <nav className="flex gap-4 lg:ml-5">
      <Link 
        className="font-bold text-gray-500 uppercase" 
        to="/admin/perfil"
        >
        Editar perfil
      </Link>
      <Link
        className="font-bold text-gray-500 uppercase"
        to="/admin/cambiar-password"
        > 
        Cambiar password
      </Link>
    </nav>
  );
}

export default AdminNav;
