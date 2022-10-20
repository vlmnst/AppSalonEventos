import { createContext, useEffect, useState } from "react";
import { clientAxios } from "../config/axios";

const ClientesContext = createContext()

export const ClientesProvider = ({children}) => {

    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        const obtenerClientes = async () => {
            try {
                const token = localStorage.getItem('token')
                if(!token) return
                
                const config = {
                    headers:{
                        "Content-Type":"application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clientAxios('/', config)
                setClientes( data )
            } catch (error) {
                console.log(error.response)
            }
        }
        obtenerClientes();
    }, [])

    const guardarCliente = async(cliente) =>{
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clientAxios.post('/', cliente, config)
            const { createdAt, updatedAt, __v, ...clienteAlmacenado } = data
            setClientes([
                clienteAlmacenado,
                ...clientes
            ])

        } catch (error) {
            console.log(error.response)
        }
    }

    const setEdicion = (id) => {
        console.log('editando' , id)
    }

    return(
        <ClientesContext.Provider
        value={{
            clientes,
            guardarCliente,
            setEdicion
        }}
        >
            {children}
        </ClientesContext.Provider>
    )
}

export default ClientesContext;