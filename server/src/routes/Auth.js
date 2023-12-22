import { Router } from "express";
import { signUp,signIn } from "../controllers/Auth.js";

const routerAuth = Router();

routerAuth.post("/signup", signUp)
routerAuth.post("/signin", signIn)
export default routerAuth;