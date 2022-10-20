import jwt  from "jsonwebtoken"
import EventPlanner from "../models/EventPlanner.js"
const checkAuth = async (req, res, next) => {
    let token
    if(
        req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.planner = await EventPlanner.findById(decoded.id).select(
                "-password -token -confirmado"
                );
             return next();
        } catch (e) {
            const error = new Error('Token no valido')
           
            res.status(403).json( { error: error.message } )            
        }
    }
    if(!token){
        const error = new Error('Token no valido o inexistente')
        res.status(403).json( { error: error.message } )
    }

    next();
}

export default checkAuth;