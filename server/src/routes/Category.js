import { Router } from "express";
import checkPremission from "../middlewares/checkPremission.js";
import { createCategory, getAllCategories, getCategory, removeCategory, updateCategory } from "../controllers/Category.js";

const routerCategory = Router();

routerCategory.get("/", getAllCategories);
routerCategory.get("/:id", getCategory);
routerCategory.put("/:id",updateCategory);
routerCategory.post("/", createCategory); 
routerCategory.delete('/:id',removeCategory);

export default routerCategory;
