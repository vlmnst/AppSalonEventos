import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Alerta from "../components/Alerta";
import {plannerAxios} from "../config/axios";

function ConfirmAcount() {
  const params = useParams();
  const { token } = params;

  const [cuentaConfirmada, setCuentaConfrimada] = useState( false );
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({})

  useEffect(()=> {
    const confirmarCuenta = async () => {
      try {
    
       const { data } = await plannerAxios(`/confirm/${token}`);
       setAlerta({ msg: data.msg })
       setCuentaConfrimada(true);
       
      } catch (error) {
        setAlerta({
          msg: error.response.data.error,
          error: true
        });
      };
      setCargando(false) 
    }
    confirmarCuenta();
  }, [])

  

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Confirma tu cuenta y  
          <span className="text-black"> Administra tus Eventos</span>
          </h1>
      </div>    
          <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white items-center">
            {!cargando && 
            <Alerta alerta={alerta}
            />}
            {
              cuentaConfirmada && (
                <Link 
                className="block text-center my-5 text-gray-500"
                to="/">Inicia Sesión</Link>
              )
            }
          </div>
    </>
  )
}

export default ConfirmAcount