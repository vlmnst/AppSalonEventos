import mongoose from "mongoose";

const conectarDB = async () => {
    try {
        const db = await mongoose.connect( process.env.MONGO_URI );
        const url = `${db.connection.host}:${db.connection.port}`
        console.log(`Mongodb connecting in ${url}`);
    }catch (err) {
        console.log(`error: ${err.message}`);
    }
};


export default conectarDB;

