import { Router } from "express";
import { getAllUser,getUser,updateUser,removeUser } from "../controllers/User.js";
import checkPremission from "../middlewares/checkPremission.js";

const routerUser = Router();
routerUser.get("/", getAllUser)
routerUser.get("/:id", getUser)
routerUser.put("/:id", updateUser)
routerUser.delete('/:id', removeUser);
export default routerUser;