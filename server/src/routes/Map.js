import { Router } from "express";
import {
  getAllMaps,
  getMap,
  updateMap,
  createMapEntry,
  removeMap,
  getNearbyMovies,
  getIntersectbyMovies,
  getMovieByPolygon,
  getMoviesInCircle,
  getIntersectNearbyMovies,
} from "../controllers/Map.js";

const routerMap = Router();

routerMap.get("/", getAllMaps);
routerMap.get("/:id", getMap);
routerMap.post("/", createMapEntry);
routerMap.put("/:id", updateMap);
routerMap.delete("/:id", removeMap);
routerMap.get("/v1/nearby-movies", getNearbyMovies);
routerMap.get("/v1/intersect-movies", getIntersectbyMovies);
routerMap.get("/v1/intersect-near-movies", getIntersectNearbyMovies);
routerMap.get("/v1/movies-in-city", getMovieByPolygon);
routerMap.get("/v1/movies-in-circle", getMoviesInCircle);

export default routerMap;
