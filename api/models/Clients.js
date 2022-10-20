import mongoose from "mongoose";

const clientSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        trim: true
    },
    telefono: {
        type: String,
        required: true,
        default: null,
        trim: true
    },
    eventoTipo: {
        type: String,
        required: true
    },
    fechaEvento: {
        type: String,
        required: true
    },
    total: {
        type: String,
        required: true
    },
    eventPlanner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EventPlanner'
    }
}, {
    timestamps: true
});

const Client = mongoose.model( 'Client', clientSchema );
export default Client;