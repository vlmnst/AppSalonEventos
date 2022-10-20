import { useState } from 'react';
import Alerta from './Alerta';
import { clientAxios } from '../config/axios';
import useClientes from '../hooks/useClientes';

function Formulario() {

    const { clientes, guardarCliente } = useClientes();
    const [input, setInput] = useState({
        name: '',
        eventoTipo: '',
        fechaEvento: '',
        telefono:'',
        email: '',
        total: ''
    });

    const [alerta, setAlerta] = useState({})
    const { msg } = alerta

    const handleChange = (e) => {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(Object.values(input).includes("")){
           
            setAlerta({
                msg: 'Todos los campos son requeridos',
                error: true
            })
        };
        if(!input.email.includes('@')){
            setAlerta({
                msg: 'El e-mail no es valido',
                error: true
            })
        };
        setAlerta({})
        guardarCliente(input)
        setInput({
            name: '',
            eventoTipo: '',
            fechaEvento: '',
            telefono:'',
            email: '',
            total: ''
        })
    }

  return (
    <>  
        {/* <h2 className="font-black text-3xl text-center ">Administrador de eventos</h2> */}

        <p className="text-xl mt-5 mb-10 text-center">
        Añade los eventos a tu agenda y
        <span className="text-indigo-600 font-bold"> Administralos</span>
        </p>  

        <form 
            onSubmit={handleSubmit}
            className="bg-white py-10 px-5 lg:mb-0 shadow-md rounded-md ">
             {msg && <Alerta alerta={alerta} />}
            <div className="mb-5">
                <label 
                    htmlFor="name"
                    className="text-gray-700 uppercase font-bold"
                    >
                    Nombre del solicitante
                    </label>
                <input 
                    id='name'
                    type='text'
                    placeholder="Nombre de quien contrata el evento"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    name="name"
                    value={input.name}
                    onChange={(e)=>handleChange(e)}
                    />
            </div>
            <div className="mb-5">
                <label 
                    htmlFor="telefono"
                    className="text-gray-700 uppercase font-bold"
                    >
                    Celular
                    </label>
                <input 
                    id='telefono'
                    type='text'
                    placeholder="Celular de contacto"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    name="telefono"
                    value={input.telefono}
                    onChange={(e)=>handleChange(e)}
                    />
            </div>
            <div className="mb-5">
                <label 
                    htmlFor="email"
                    className="text-gray-700 uppercase font-bold"
                    >
                    Email
                    </label>
                <input 
                    id='email'
                    type='text'
                    placeholder="Email de contacto"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    name="email"
                    value={input.email}
                    onChange={(e)=>handleChange(e)}
                    />
            </div>
            <div className="mb-5">
                <label 
                    htmlFor="eventoTipo"
                    className="text-gray-700 uppercase font-bold"
                    >
                    Indique tipo de evento que se realiza
                    </label>
                <input 
                    id='eventoTipo'
                    type='text'
                    placeholder="Cumpleaños, aniversario, egreso, etc"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    name="eventoTipo"
                    value={input.eventoTipo}
                    onChange={(e)=>handleChange(e)}

                    />
            </div>
            <div className="mb-5">
                <label 
                    htmlFor="fechaEvento"
                    className="text-gray-700 uppercase font-bold"
                    >
                    Fecha del evento
                    </label>
                <input 
                    id='fechaEvento'
                    type='date'
                    placeholder="Ingrese la fecha pactada para el evento"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    name="fechaEvento"
                    value={input.fechaEvento}
                    onChange={(e)=>handleChange(e)}

                    />
            </div>
            <div className="mb-5">
                <label 
                    htmlFor="total"
                    className="text-gray-700 uppercase font-bold"
                    >
                    Total a cobrar
                    </label>
                <input 
                    id='total'
                    type='text'
                    placeholder="Ingrese el precio final del evento"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    name="total"
                    value={input.total}
                    onChange={(e)=>handleChange(e)}

                    />
            </div>

            <input
                type="submit"
                value="Agregar evento"
                className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transitions-colors rounded-sm"
            />
        </form>
    </>
  )
}

export default Formulario