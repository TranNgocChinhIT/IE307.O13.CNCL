import routerAuth from "./Auth.js";
import routerCategory from "./Category.js";
import routerMovie from "./Movie.js";
import routerSchedule from "./Schedule.js";
import routerUser from "./User.js";
import express from "express"
import routerMovieScheduleRelationship from "./movieScheduleRelationship.js";
import routerBooking from "./Booking.js";
import routerReview from "./Review.js";
const router = express.Router()

router.use("/auth", routerAuth)
router.use("/user", routerUser)
router.use("/movie", routerMovie)
router.use("/category", routerCategory)
router.use("/schedule", routerSchedule)
router.use("/movieSchedule", routerMovieScheduleRelationship)
router.use("/booking", routerBooking)
router.use("/review",routerReview)
export default router;