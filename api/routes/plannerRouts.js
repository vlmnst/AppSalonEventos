import express from "express";
import { registrar, 
         autenticar, 
         confirmar, 
         profile,
         forgetPassword,
         checkToken,
         newPass } from "../controllers/plannerControllers.js";
import checkAuth from "../middleware/auth.js";
const router = express.Router();

//GET
router.get('/confirm/:token', confirmar);
router.get('/profile', checkAuth, profile);
router.get('/forget-password/:token', checkToken);


//POST
router.post('/registrar', registrar );
router.post('/login', autenticar );
router.post('/forget-password/:token', newPass);
router.post('/forget-password', forgetPassword);





export default router;