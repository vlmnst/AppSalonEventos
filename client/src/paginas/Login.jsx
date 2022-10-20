import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {plannerAxios} from "../config/axios";
import Alerta from "../components/Alerta.jsx";
import useAuth from "../hooks/useAuth";
function login() {

  const navigate = useNavigate();
  const [ alerta, setAlerta ] = useState({});
  const [ input, setInput ] = useState({
    email: '',
    password: ''
  });
  const { setAuth } = useAuth()
  const onChange = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await plannerAxios.post(`/login`, {email: input.email, password: input.password});
      localStorage.setItem('token', data.token);
      setAuth( data )
      navigate('/admin');
    } catch (error) {
      setAlerta({
        msg: error.response.data.error,
        error: true
      });
    };
  };

  const { msg } = alerta;

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Inicia Sesión y Administra tus 
          <span className="text-black"> Eventos</span>
          </h1>
      </div>    
          <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white items-center">
            {
              msg && 
              <Alerta alerta={alerta}/>
            }
            <form onSubmit={handleSubmit}>
              <div className="my-5">
                <label
                  className="uppercase text-gray-600 text-1xl font-bold">
                  Email
                </label>
                <input 
                  type="email"
                  placeholder="Email de Registro"
                  className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                  name='email'
                  value={input.name}
                  onChange={(e) => onChange(e)}
                  />
              </div>
              <div className="my-5">
                <label
                  className="uppercase text-gray-600 text-1xl font-bold">
                  Password
                </label>
                <input 
                  type="password"
                  placeholder="Tu password"
                  className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                  name='password'
                  value={input.password}
                  onChange={(e) => onChange(e)}
                  />
              </div>
              <input
                type="submit"
                value="Iniciar Sesión"
                className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-900 md:w-auto"
                />
            </form>

            <nav className="mt-10 lg:flex lg:justify-between">
              <Link 
                className="block text-center my-5 text-gray-500"
                to="/register">¿No tienes una cuenta? Registrate</Link>
              <Link 
                className="block text-center my-5 text-gray-500"
                to="/forgetpassword">Olvide mi password</Link>

            </nav>
          </div>
      
    </>
  )
}

export default login