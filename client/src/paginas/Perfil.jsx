import AdminNav from "../components/AdminNav";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import Alerta from "../components/Alerta";

function Perfil() {
    const { auth, actualizarPerfil } = useAuth();
    const [alerta, setAlerta] = useState({});
    const [input, setInput] = useState({
        name: '',
        email: '',
        telefono: '',
        salon: ''
    });

    useEffect(() => {
        if(auth?._id){
           setInput({
            name: auth.name,
            email: auth.email,
            telefono: auth.telefono,
            salon: auth.salon
            })
        };
    },[auth])

    const handleChange = (e) => {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const { email, name } = input
        
        if([name, email].includes('')){
            setAlerta({
                msg: 'Debes completar con el email y el nombre',
                error: true
            })
        }
        
        const toSend = {
            id: auth._id,
            ...input
        }

        const resultado = await actualizarPerfil(toSend)
        setAlerta(resultado)
    };
    
    const { msg } = alerta

  return (
    <>
        <AdminNav />
        <h2 className="font-black text-3xl text-center mt-10">Editar perfil</h2>
        <p className="text-xl mt-5 mb-10 text-center">Modifica tu <span className="font-bold text-indigo-600">Perfil</span> </p>

        <div className="flex justify-center">
            <div className="lg:w-1/2">
                {msg && <Alerta alerta={alerta} />}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white py-10 px-10 lg:mb-0 shadow-md rounded-md ">
                <div className="mb-5">
                <label 
                    htmlFor="name"
                    className="text-gray-700 uppercase font-bold"
                    >
                    Nombre
                    </label>
                <input 
                    id='name'
                    type='text'
                    placeholder="Tu nombre"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    name="name"
                    value={input.name || ''}
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
                    placeholder="Tu email"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    name="email"
                    value={input.email || ''}
                    onChange={(e)=>handleChange(e)}
                    />
                </div>
                <div className="mb-5">
                <label 
                    htmlFor="telefono"
                    className="text-gray-700 uppercase font-bold"
                    >
                    Telefono
                    </label>
                <input 
                    id='telefono'
                    type='text'
                    placeholder="Tu telefono"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    name="telefono"
                    value={input.telefono || ''}
                    onChange={(e)=>handleChange(e)}
                    />
                </div>
                <div className="mb-5">
                <label 
                    htmlFor="salon"
                    className="text-gray-700 uppercase font-bold"
                    >
                    Salón de eventos
                    </label>
                <input 
                    id='salon'
                    type='text'
                    placeholder="Tu salón de eventos"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    name="salon"
                    value={input.salon || ''}
                    onChange={(e)=>handleChange(e)}
                    />
                </div>
                <input
                type="submit"
                value="Guardar cambios"
                className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transitions-colors rounded-sm"
            />
                </form>
            </div>
        </div>
    </>
  )
}

export default Perfil