import { Router } from "express";
import { createMovieScheduleRelationship, getAllMovieScheduleRelationships, getMovieScheduleRelationship, removeMovieScheduleRelationship, updateMovieScheduleRelationship } from "../controllers/movieScheduleRelationship.js";
import checkPremission from "../middlewares/checkPremission.js";

const routerMovieScheduleRelationship = Router();

routerMovieScheduleRelationship.get("/", getAllMovieScheduleRelationships);
routerMovieScheduleRelationship.get("/:id", getMovieScheduleRelationship);
routerMovieScheduleRelationship.put("/:id", updateMovieScheduleRelationship);
routerMovieScheduleRelationship.post("/", createMovieScheduleRelationship); 
routerMovieScheduleRelationship.delete('/:id',removeMovieScheduleRelationship);

export default routerMovieScheduleRelationship;
