import  Express  from "express";
import { Login, Register } from "../Controllers/AuthController.js";

const router =Express.Router()
  

router.post('/register',Register)
router.post('/login',Login)



export default router