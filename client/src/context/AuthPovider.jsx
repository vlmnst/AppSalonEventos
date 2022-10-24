import { useState, useEffect, createContext } from 'react';
import {plannerAxios} from '../config/axios';


const AuthContext = createContext();
const AuthProvider = ({children}) => {

    const [ auth, setAuth ] = useState({})
    const [ cargando, setCargando ] = useState(true)

    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token')

            if(!token) {
                setCargando(false)
                return;
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };

            try {
                const { data } = await plannerAxios(`/profile`, config)
                setAuth(data)
                
            } catch (error) {
                console.log(error);
                setAuth({})
            }

            setCargando(false)
        }

        autenticarUsuario();
    }, [])

    const actualizarPerfil = async (datos) => {
        const token = localStorage.getItem('token')
        const config = {
            headers: {
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await plannerAxios.put(`/editar-perfil/${datos.id}`, datos, config)
            setAuth( data )
            return {
                msg: 'Modificado correctamente',
                error: false
            }
        } catch (error) {
            return { 
                msge: error.response.data.msg,
                error: true
            }
        }

    }

    const guardarPassword = async(datos) => {
        const token = localStorage.getItem('token')

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        };
        try {
           const { data } = await plannerAxios.put(`/cambiar-password`, datos, config) 
            return data
        } catch (error) {
            return { 
                msg: error.response.data.error,
                error: true
            }
        }
        
        
    }

    const cerrarSesion = () => {
        localStorage.removeItem('token')
        setAuth({})
    }

    return(
        <AuthContext.Provider value={{
            auth,
            setAuth,
            cargando,
            cerrarSesion,
            actualizarPerfil,
            guardarPassword
        }}>
            {children}
        </AuthContext.Provider>
    )
};

export { 
    AuthProvider
};

export default AuthContext;