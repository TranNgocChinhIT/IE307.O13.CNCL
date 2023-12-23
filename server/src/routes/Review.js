import { Router } from "express";
import { createReview, getAllReviews, getReview, removeReview, updateReview } from "../controllers/Review.js";
import checkPremission from "../middlewares/checkPremission.js";

const routerReview = Router();

routerReview.get("/", getAllReviews);
routerReview.get("/:id", getReview);
routerReview.put("/:id", updateReview);
routerReview.post("/", createReview); 
routerReview.delete('/:id',removeReview);

export default routerReview;
 