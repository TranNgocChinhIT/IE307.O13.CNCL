import { Router } from "express";
import { signUp,signIn, confirmRegistration } from "../controllers/Auth.js";

const routerAuth = Router();

routerAuth.post("/signup", signUp)
routerAuth.post("/signin", signIn)
routerAuth.get("/confirm/:token", confirmRegistration);
export default routerAuth;