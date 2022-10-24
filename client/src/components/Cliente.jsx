import useClientes from "../hooks/useClientes"

function Cliente({ cliente }) {
  const { _id, name, email, telefono, eventoTipo, fechaEvento, total } = cliente

  const { setEdicion, eliminarCliente } = useClientes();

  return (
    <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
      <p className="font-bold uppercase text-indigo-700">Nombre: 
        <span className="font-normal normal-case text-black"> {name}</span>
      </p>
      <p className="font-bold uppercase text-indigo-700">Email: 
        <span className="font-normal normal-case text-black"> {email}</span>
      </p>
      <p className="font-bold uppercase text-indigo-700">Telefono: 
        <span className="font-normal normal-case text-black"> {telefono}</span>
      </p>
      <p className="font-bold uppercase text-indigo-700">Tipo de evento: 
        <span className="font-normal normal-case text-black"> {eventoTipo}</span>
      </p>
      <p className="font-bold uppercase text-indigo-700">Fecha de evento: 
        <span className="font-normal normal-case text-black"> {fechaEvento}</span>
      </p>
      <p className="font-bold uppercase text-indigo-700">Costo total: 
        <span className="font-normal normal-case text-black"> {total}</span>
      </p>
      <div className="flex justify-between my-5">
        <button 
          onClick={() => setEdicion(cliente)}
          type="button"
          className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold rounded-lg "
          >
          Editar
        </button>
        <button 
          onClick={() => eliminarCliente(_id)}
          type="button"
          className="py-2 px-10 bg-red-700 hover:bg-indigo-700 text-white uppercase font-bold rounded-lg "
          >
          Eliminar
        </button>
      </div>
    </div>
  )
}

export default Cliente