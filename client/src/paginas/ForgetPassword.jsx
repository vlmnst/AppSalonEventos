import { Link } from "react-router-dom";
import { useState } from "react";
import { plannerAxios } from "../config/axios";
import Alerta from "../components/Alerta";

function ForgetPassword() {
  const [ input, setInput ] = useState('');
  const [ alerta, setAlerta ] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await plannerAxios.post(`/forget-password`, { input });
      setAlerta({
        msg: data.msg,
        error: false
      });
    } catch (error) {
      console.log(error.response.data.error)
      
      setAlerta({
        msg: error.response.data.error,
        error: true
      });
    }
    
  }

  const { msg } = alerta

  return (
  <>
    <div>
      <h1 className="text-indigo-600 font-black text-6xl">
        Recupera 
        <span className="text-black"> tu clave</span>
      </h1>
    </div> 

    <div className="mt-20 md:mt-5 shadow-lg px-5 py-5 rounded-xl bg-white items-center">
    {
        msg &&
        <Alerta alerta = {alerta}/>
      }
      <form onSubmit={handleSubmit}>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 text-1xl font-bold">
            Para recuperar tu clave ingresa tu Email
          </label>
          <input 
            type="email"
            placeholder="Email de Registro"
            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
              <input
                type="submit"
                value="Enviar instrucciones"
                className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-900 md:w-auto"
                />
      </form>
        <nav className="mt-5 lg:flex lg:justify-between">
        <Link 
          className="block text-center my-5 text-gray-500"
          to="/">¿Ya tienes una cuenta? Inicia sesión</Link>
        <Link 
          className="block text-center my-5 text-gray-500"
          to="/register">¿No tienes una cuenta? Registrate</Link>
        </nav>
    </div> 
  </>
  )
}

export default ForgetPassword