import { useState } from "react";
import Formulario from "../components/Formulario";
import ListadoEventos from "../components/ListadoEventos";

function AdministrarEventos() {

  const [ mostrarFormulario, setMostrarFormulario ] = useState(true)
  
  return (
    <div className="flex flex-col md:flex-row px-5">
      <button
        type="button"
        onClick={() => setMostrarFormulario(!mostrarFormulario)}
        className="bg-indigo-600 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transitions-colors rounded-md
        mx-10 p-3 text-xs mb-5 md:hidden ">
          {mostrarFormulario ? 'Ocultar formulario' : 'Mostrar formulario'}
        </button>

      <div className={`${ mostrarFormulario ? "block" : "hidden" } md:block  md:w-1/2 lg:w-2/5 `}>
        <Formulario />
      </div>

      <div className="md:w-1/2 lg:w-3/5">
        <ListadoEventos />
      </div>
    </div>
  )
}

export default AdministrarEventos