import Clients from "../models/Clients.js";

const agregarCliente = async(req, res) => {

    try {
        const client = new Clients( req.body );
     
        client.eventPlanner = await  req.planner._id

        const clientSave = await client.save();
        return res.json(clientSave);
    } catch (error) {
        console.log(error);
    }
    
}

const obtenerClientes = async (req, res) => {
   try {
        const clientes = await Clients.find().where('eventPlanner').equals(req.planner) 
    console.log(clientes);
    return res.json(clientes)
   } catch (error) {
    console.log(error)
   }

}   

const obtenerCliente = async (req, res) => {

    const { id } = req.params;
    const cliente = await Clients.findById(id)
    if(!cliente){
        return res.status(404).json({ msg: 'Cliente no encontrado'})
    }
    if(cliente.eventPlanner._id.toString() !== req.planner._id.toString()) {
        return res.json({ msg: 'Accion no valida' })
    } 
    if(cliente){
        return res.json(cliente)
    }
};

const actualizarCliente = async (req, res) => {
    const { id } = req.params;
    const { name, email, telefono, fecha, total } = req.body
    const cliente = await Clients.findById(id)
    if(!cliente){
        return res.status(404).json({ msg: 'Cliente no encontrado'})
    }
    if(cliente.eventPlanner._id.toString() !== req.planner._id.toString()) {
        return res.json({ msg: 'Accion no valida' })
    } 
    try {
         cliente.name = name || cliente.name;
         cliente.email = email || cliente.email;
         cliente.telefono = telefono || cliente.telefono;
         cliente.fecha = fecha || cliente.fecha;
         cliente.total = total || cliente.total;

         const clienteActualizado = await cliente.save();
         return res.json(clienteActualizado)
    } catch (error) {
        console.log(error)
    }
}

const eliminarCliente = async (req, res) => {
    const { id } = req.params;
    const cliente = await Clients.findById(id)
    

    if(!cliente){
        return res.status(404).json({ msg: 'Cliente no encontrado'})
    }
    if(cliente.eventPlanner._id.toString() !== req.planner._id.toString()) {
        return res.json({ msg: 'Accion no valida' })
    } 
    try {
        await cliente.deleteOne();
        return res.json({ msg : 'Cliente eliminado' })
    } catch (error) {
        
    }
}



export {
    agregarCliente,
    obtenerClientes,
    obtenerCliente,
    actualizarCliente,
    eliminarCliente,
}