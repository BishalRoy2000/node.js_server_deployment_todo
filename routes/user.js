
import express from "express";
import {register, login, logout, getmyprofile} from "../controllers/user.js";
import { isAuthenticate } from "../middlewares/auth.js";


const router = express.Router();



router.post("/register",register); 

router.post("/login",login); 

router.get("/logout",logout);

router.get("/me", isAuthenticate, getmyprofile);



export default router; 