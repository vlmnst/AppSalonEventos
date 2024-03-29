import EventPlanner from "../models/EventPlanner.js";
import generarJWT from "../helpers/jwt.js";
import generarId from "../helpers/id.js";
import emailRegistro from "../helpers/emailRegistro.js";
import emailOlvidePassword from "../helpers/emailOlvidePassword.js";

const registrar = async ( req, res ) => {
    const { email, name } = req.body
   //Evitar duplicidad de usuarios
   const existUser = await EventPlanner.findOne( { email } )

   if(existUser){
    const error = new Error('Email ya registrado');
    return res.status(400).json( {error: error.message});
   }

   try {
    const planner = new EventPlanner(req.body);
    const plannerSave = await planner.save();

    //Envio de mail 
    emailRegistro({
        email,
        name,
        token: plannerSave.token
    })
    console.log(plannerSave)
    res.json({msj : plannerSave})
   } catch (error) {
    console.log(error)
   }
    
}

const autenticar = async ( req, res ) => {
    const { email, password } = req.body

    //Comprobar si el usuario existe
    const usuario = await EventPlanner.findOne({ email })
    if(!usuario){
        const error = new Error('El usuario o clave incorrecta')
        return res.status(404).send({error : error.message});
    };
    
    //Comprobar si el usuario esta confirmado
    if(!usuario.confirmado){
        const error = new Error('Tu usuario no ha sido confirmado')
        return res.status(404).send({error : error.message});
    };

    //Autenticar al usuario
    if(await usuario.comprobarPassword(password)){
  
        return res.json({
            _id: usuario._id,
            name: usuario.name,
            email: usuario.email,
            telefono: usuario.telefono || "",
            salon: usuario.salon || "",
            token: generarJWT(usuario.id)
         })
    }else{
        const error = new Error('El usuario o clave incorrecta')
        return res.status(404).send({error : error.message});
    };
}

const confirmar = async ( req, res ) => {
    const { token } = req.params
    try {
        const usuarioConfirmar = await EventPlanner.findOne({ token })
        
        if(!usuarioConfirmar){
            const error = new Error('Token no valido')
            return res.status(400).json( { error: error.message } )
        }

        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true;
        await usuarioConfirmar.save();
    
        return res.json( { msg: 'Cuenta confirmada correctamente' } )
        
    } catch (error) {
        console.log(error)
    }
    
}

const profile = (req, res) => {
    const { planner } = req;
    return res.json({ planner })
}

const forgetPassword = async (req, res) => {
    const { input: email } = req.body
    const existePlanner = await EventPlanner.findOne({ email });
    if(!existePlanner){
        const error = new Error('Usuario no valido')
        return res.status(400).json( { error: error.message } )        
    }
    try {
        existePlanner.token = generarId();
        await existePlanner.save();

        //Envio de mail para el recupero de clave
        emailOlvidePassword({ 
            email, 
            token: existePlanner.token, 
            name: existePlanner.name
        });

        return res.json({ msg: "Hemos enviado un email con las instrucciones. Verifica tu correo!"})
    } catch (error) {
        console.log(error);
    }
}

const checkToken = async (req, res) => {
    const { token } = req.params
    const tokenValid = await EventPlanner.findOne({ token });
    if(tokenValid){
        return res.json( { msg: 'Token valido' } )
    }else{
        const error = new Error('Token no valido')
        return res.status(400).json( { error: error.message } )
    }
}

const newPass = async (req, res) => {
    const { token } = req.params
    const { password } = req.body

    const eventPlanner = await EventPlanner.findOne({ token });
    if(!eventPlanner){
        const error = new Error('Hubo un error')
        return res.status(400).json( { error: error.message } )
    }
    try {
        if(!password){
            const error = new Error('Debes ingresar un password')
            return res.status(400).json( { error: error.message } ) 
        }
        eventPlanner.token = null;
        eventPlanner.password = password;
        await eventPlanner.save();
        return res.json({ msg: 'Password modificado correctamente'})
    } catch (error) {
        console.log(error);
    }
}

const editarPerfil = async (req, res) => {
    const { id } = req.params
    const { name, email, telefono, salon } = req.body
    const planner = await EventPlanner.findById(id);

    if(!id) res.status(400).json({error : 'Usuario no existe'})

    if(email !== planner.email) {
        const existeEmail =  await EventPlanner.findOne({ email })
        if(existeEmail){
            const error = new Error("Ese email ya está en uso")
            return res.status(400).json({msg: error.message})
        }
    }

    try {
        planner.name = name || planner.name;
        planner.email = email || planner.email;
        planner.telefono = telefono || planner.telefono;
        planner.salon = salon || planner.salon;
        const plannerActualizado = await planner.save();
        return res.json(plannerActualizado)
   } catch (error) {
       console.log(error)
   }
}

const actualizarPassword = async (req, res) => {
    const { passwordActual,  passwordNuevo } = req.body;
    const { _id } = req.planner;

    const planner = await EventPlanner.findById(_id)
    if(!planner) {
        const error = new Error("Hubo un error")
        return res.status(400).json({error: error.message})
    }

    if( await planner.comprobarPassword(passwordActual)){
        planner.password = passwordNuevo
        await planner.save();
        return res.json({msg: 'Tu password se ha modificado correctamente'})
    } else {
        const error = new Error("El password actual es incorrecto")
        return res.status(400).json({error: error.message})
    }

}

export {
    registrar,
    autenticar, 
    confirmar,
    profile,
    forgetPassword,
    checkToken,
    newPass,
    editarPerfil,
    actualizarPassword
}