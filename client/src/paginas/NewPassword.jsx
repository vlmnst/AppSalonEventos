import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Alerta from "../components/Alerta";
import {plannerAxios} from "../config/axios";

function NewPassword() {
  const params = useParams();
  const { token } = params;

  const [input, setInput] = useState({
    password: "",
    newPassword: "",
  });

  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false)
  const [passReady, setPassReady] = useState(false)
  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await plannerAxios(`/forget-password/${token}`);
        setAlerta({
          msg: "Coloca tu nuevo password",
          error: false
        })
        setTokenValido(true)
      } catch (error) {
        setAlerta({
          msg: "Hubo un error con el enlace",
          error: true,
        });
      }
    };
    comprobarToken();
  }, []);

  const onChange = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.password !== input.newPassword) {
      return setAlerta({
        msg: "Las claves no coinciden",
        error: true
      });
    }
    if (input.password.length < 6) {
      return setAlerta({
        msg: "La clave debe superar los 6 carácteres",
        error: true
      });
    }

    try {
      const newPass = await plannerAxios.post(`/forget-password/${token}`, {password: input.password})
      console.log(newPass)
      setAlerta({
        msg: newPass.data.msg,
        error: false
      })
      setPassReady(true)
      return
    } catch (error) {
      setAlerta({
        msg: error.response.data.error,
        error: true
      });
      return
    }
  };

  const { msg } = alerta;
  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Ingresa una nueva clave y
          <span className="text-black"> recupera el acceso</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white items-center">
        {msg && <Alerta alerta={alerta} />}
        {
          tokenValido && !passReady &&

        
        <form onSubmit={handleSubmit}>
          
          <div className="my-5">
            <label className="uppercase text-gray-600 text-1xl font-bold">
              New Password
            </label>
            <input
              type="password"
              placeholder="Tu password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              name="password"
              value={input.password}
              onChange={(e) => onChange(e)}
            />
          </div>

          <div className="my-5">
            <label className="uppercase text-gray-600 text-1xl font-bold">
              Repeat new password
            </label>
            <input
              type="password"
              placeholder="Tu password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              name="newPassword"
              value={input.newPassword}
              onChange={(e) => onChange(e)}
            />
          </div>
          <input
            type="submit"
            value="Generar nueva clave"
            className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-900 md:w-auto"
          />
        </form>
      }
      {
        tokenValido && passReady &&
        <Link className="block text-center my-5 text-gray-500" to="/">
        Vuelve al inicio
      </Link>
      }
        <nav className="mt-10 lg:flex lg:justify-between">
          <Link className="block text-center my-5 text-gray-500" to="/register">
            ¿No tienes una cuenta? Registrate
          </Link>
          <Link
            className="block text-center my-5 text-gray-500"
            to="/forgetpassword"
          >
            Olvide mi password
          </Link>
        </nav>
      </div>
    </>
  );
}

export default NewPassword;
