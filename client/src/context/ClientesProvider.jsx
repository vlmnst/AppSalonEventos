import { createContext, useEffect, useState } from "react";
import { clientAxios } from "../config/axios";

const ClientesContext = createContext()

export const ClientesProvider = ({children}) => {

    const [clientes, setClientes] = useState([]);
    const [cliente, setCliente] = useState({});

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

    //GUARDAR O EDITAR UN CLIENTE
    const guardarCliente = async(cliente) =>{
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        if(cliente._id) {
            //editando
            try {
                const { data } = await clientAxios.put(`/${cliente._id}`, cliente, config)
                const clientesActualizado = clientes.map(clienteState => clienteState._id === data._id ? data : clienteState)

                setClientes(clientesActualizado)
                
            } catch (error) {
                console.log(error)
            }

        }else{
            //nuevo
             try {

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
       
    }

    const setEdicion = (paciente) => {
        setCliente(paciente)
    }

    const eliminarCliente = async(id) => {
       
        const confirmar = confirm('Estás seguro que deseas eliminar el registro?')
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        };

        try {
            if(confirmar) {
                const { data } = await clientAxios.delete(`/${id}`, config)
                const clientesACtualizados = clientes.filter(clientesState => clientesState._id !== id )
                setClientes(clientesACtualizados)
             }
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <ClientesContext.Provider
        value={{
            clientes,
            guardarCliente,
            setEdicion,
            cliente,
            eliminarCliente
        }}
        >
            {children}
        </ClientesContext.Provider>
    )
}

export default ClientesContext;