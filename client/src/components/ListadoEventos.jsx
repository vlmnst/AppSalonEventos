import useClientes from "../hooks/useClientes";
import Cliente from "./Cliente";
function ListadoEventos() {

  const { clientes } = useClientes();
  console.log(clientes)
  return (
    <>
    {
      clientes.length ?
      (
        <>
        <h2 className="font-black text-3xl text-center ">Lista de eventos</h2>
        <p className="text-xl mt-5 mb-10 text-center">
        Administra tus
        <span className="text-indigo-600 font-bold"> eventos</span>
      </p>   
      {
        clientes.map( cliente => 
          <Cliente 
            key={cliente._id}
            cliente={cliente}
          />)
      }
        </>
      ):
      (
      <>
      <h2 className="font-black text-3xl text-center ">Aun no hay eventos</h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Comienza agregando eventos
        <span className="text-indigo-600 font-bold"> y aparecerán en este lugar</span>
      </p>
      </>)
    }
    </>
    )
}

export default ListadoEventos