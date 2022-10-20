import mongoose from "mongoose";
import generarId from "../helpers/id.js"
import bcrypt from "bcrypt"

const eventPlannerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    telefono: {
        type: String,
        default: null,
        trim: true
    },
    token: {
        type: String,
        default: generarId()
    },
    confirmado: {
        type: Boolean,
        default: false
    }


});

//Hasheo
eventPlannerSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
});

//Registrar funciones que se ejecuten solo en este modelo
eventPlannerSchema.methods.comprobarPassword = async function(passwordForm){ 
    return await bcrypt.compare(passwordForm, this.password)
}

const EventPlanner = mongoose.model( 'EventPlanner', eventPlannerSchema )

export default EventPlanner;