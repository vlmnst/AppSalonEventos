import AdminNav from "../components/AdminNav";
import { useState } from "react";
import Alerta from "../components/Alerta";
import useAuth from "../hooks/useAuth";

function CambiarPassword() {
  const [alerta, setAlerta] = useState({})
  const [input, setInput] = useState({
    passwordActual:'',
    passwordNuevo: ''
  });

  const { guardarPassword } = useAuth();

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(Object.values(input).some(campo => campo === '')){
      setAlerta({
        msg: 'Todos los campos son requeridos',
        error: true
      });
      return
    };

    if(input.passwordNuevo.length < 6){
      setAlerta({
        msg: 'El nuevo password debe tener al menos 6 carácteres',
        error: true
      });
      return
    };

    const respuesta = await guardarPassword(input)
    setAlerta(respuesta)
    setInput({
      passwordActual:'',
      passwordNuevo: ''
    })
    return

  }

  const { msg } = alerta;

  return (
    <>
        <AdminNav />
        <h2 className="font-black text-3xl text-center mt-10">Cambiar Password</h2>
        <p className="text-xl mt-5 mb-10 text-center">Modifica tu <span className="font-bold text-indigo-600">Password</span> </p>
        <div className="flex justify-center">        
        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white items-center lg:w-1/2  ">
          { msg && <Alerta alerta={alerta} />}
        <form onSubmit={handleSubmit} >
        <div className="my-5">
                <label
                  className="uppercase text-gray-600 text-1xl font-bold">
                  Password Actual
                </label>
                <input 
                  type="password"
                  placeholder="Tu password Actual"
                  className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                  name='passwordActual'
                  value={input.passwordActual}
                  onChange={(e) => handleChange(e)}
                  />
              </div>
              <div className="my-5">
                <label
                  className="uppercase text-gray-600 text-1xl font-bold">
                  Nuevo Password
                </label>
                <input 
                  type="password"
                  placeholder="Tu nuevo password"
                  className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                  name='passwordNuevo'
                  value={input.passwordNuevo}
                  onChange={(e) => handleChange(e)}
                  />
              </div>
              <input 
              type='submit'
              value="Modificar password"
              className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-900 md:w-auto"
              />
        </form>
       </div> 
       </div>
    </>
  )
}

export default CambiarPassword