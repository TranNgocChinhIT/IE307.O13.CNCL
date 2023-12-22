import { Router } from "express";
import { createSchedule, getAllSchedules, getSchedule, removeSchedule, updateSchedule } from "../controllers/Schedule.js";
import checkPremission from "../middlewares/checkPremission.js";

const routerSchedule = Router();

routerSchedule.get("/", getAllSchedules);
routerSchedule.get("/:id", getSchedule);
routerSchedule.put("/:id", updateSchedule);
routerSchedule.post("/", createSchedule); 
routerSchedule.delete('/:id',removeSchedule);

export default routerSchedule;
