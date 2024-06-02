import { Router } from "express";
import {
  getAllMaps,
  getMap,
  updateMap,
  createMapEntry,
  removeMap,
} from "../controllers/Map.js";

const routerMap = Router();

routerMap.get("/", getAllMaps);
routerMap.get("/:id", getMap);
routerMap.post("/", createMapEntry);
routerMap.put("/:id", updateMap);
routerMap.delete("/:id", removeMap);

export default routerMap;
