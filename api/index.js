import express from "express";
import dotenv from "dotenv"
import conectarDB from "./config/db.js";
import plannerRoutes from "./routes/plannerRouts.js";
import clientRoutes from "./routes/clientRoutes.js"
import cors from "cors";

const app = express();
app.use(express.json());
dotenv.config();
conectarDB();

// const dominiosPermitidos = [`${process.env.CLIENT_URL}`]
// const corsOptions = {
//     origin: function ( origin, callback ) {
//         if(dominiosPermitidos.indexOf(origin) !== -1){
//             callback(null, true);
//         } else {
//             callback(new Error("No permitido por CORS"))
//         }
//     },
// };

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });

app.use('/eventPlanner', plannerRoutes);
app.use('/client', clientRoutes);

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log( `Servidor funcionando en el puerto ${PORT}` )
})

