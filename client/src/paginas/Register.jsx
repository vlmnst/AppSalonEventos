import { Link } from "react-router-dom"
import { useState } from "react";
import Alerta from "../components/Alerta";
import {plannerAxios} from "../config/axios";
function Register() {
  const [ input, setInput ] = useState({
    name: '',
    email: '',
    password: '',
    repetirPassword: ''
  });

  const [ alerta, setAlerta ] = useState({})

  const changeInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if([input.nombre, input.email, input.password, input.repetirPassword].includes('')){
      setAlerta({ msg: 'Hay campos vacios', error: true })
      return
    }
    if(input.password !== input.repetirPassword){
      setAlerta({ msg: 'Los Password no son iguales', error: true })
      return
    }
    if(input.password.length < 6) {
      setAlerta({ msg: 'El password debe tener mas de 6 carácteres', error: true })
      return
    }
    setAlerta('')
    //Crear el usuario
    try {
      await plannerAxios.post(`/registrar`, {email: input.email, name: input.name, password: input.password })
      setAlerta({
        msg: `${input.name} tu usuario se ha creado correctamente, revisa tu email`,  
        error: false
      })
    } catch (error) {
      setAlerta({
        msg: error.response.data.error,
        error: true
      })
    }
  }

  const { msg } = alerta

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Crea tu cuenta y Administra tus 
          <span className="text-black"> Eventos</span>
          </h1>
      </div>  
         <div className="mt-20 md:mt-5 shadow-lg px-5 py-5 rounded-xl bg-white items-center">
          {
            msg &&
            <Alerta
              alerta={alerta} /> 
          }
            
            <form
            onSubmit={handleSubmit}>
            <div className="my-5">
                <label
                  className="uppercase text-gray-600 text-1xl font-bold">
                  Nombre
                </label>
                <input 
                  type="text"
                  placeholder="Tu nombre"
                  className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                  name="name"
                  value={input.name}
                  onChange={ e => changeInput(e)}
                  />
              </div>
              <div className="my-5">
                <label
                  className="uppercase text-gray-600 text-1xl font-bold">
                  Email
                </label>
                <input 
                  type="email"
                  placeholder="Email de Registro"
                  className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                  name="email"
                  value={input.email}
                  onChange={ e => changeInput(e)}
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
                  name="password"
                  value={input.password}
                  onChange={ e => changeInput(e)}
                  />
              </div>
              <div className="my-5">
                <label
                  className="uppercase text-gray-600 text-1xl font-bold">
                  Repetir Password
                </label>
                <input 
                  type="password"
                  placeholder="Repite tu password"
                  className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                  name="repetirPassword"
                  value={input.repetirPassword}
                  onChange={ e => changeInput(e)}
                  />
              </div>
              <input
                type="submit"
                value="Crear cuenta"
                className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-900 md:w-auto"
                />
            </form>
            <nav className="mt-5 lg:flex lg:justify-between">
            <Link 
              className="block text-center my-5 text-gray-500"
              to="/">¿Ya tienes una cuenta? Inicia sesión</Link>
            <Link 
              className="block text-center my-5 text-gray-500"
              to="/forgetpassword">Olvide mi password</Link>
            </nav>
          </div>
    </>
  )
}

export default Register