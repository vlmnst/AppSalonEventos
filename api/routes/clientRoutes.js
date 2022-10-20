import express  from "express";
import checkAuth from "../middleware/auth.js"
import { agregarCliente, 
         obtenerClientes,
         obtenerCliente,
         actualizarCliente,
         eliminarCliente
         } from "../controllers/clientControllers.js";
const router = express.Router();

router.route('/')
    .post(checkAuth, agregarCliente)
    .get(checkAuth, obtenerClientes)

router.route('/:id')
.get(checkAuth, obtenerCliente)
.put(checkAuth, actualizarCliente)
.delete(checkAuth, eliminarCliente)

export default router;
