import { Router } from "express";
import { getAllMovies, getMovie, updateMovie, createMovie, removeMovie } from "../controllers/Movie.js";
import checkPremission from "../middlewares/checkPremission.js";

const routerMovie = Router();

routerMovie.get("/", getAllMovies);
routerMovie.get("/:id", getMovie);
routerMovie.put("/:id", updateMovie);
routerMovie.post("/", createMovie); 
routerMovie.delete('/:id',removeMovie);

export default routerMovie;
