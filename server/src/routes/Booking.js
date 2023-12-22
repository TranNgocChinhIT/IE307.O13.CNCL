import { Router } from "express";
import { createBooking, getAllBookings, getAllBookingsForUser, getBooking, removeBooking, updateBooking } from "../controllers/Booking.js";
import checkPremission from "../middlewares/checkPremission.js";

const routerBooking = Router();

routerBooking.get("/", getAllBookings);
routerBooking.get("/:id", getBooking);
routerBooking.get("/user/:id", getAllBookingsForUser);
routerBooking.put("/:id", updateBooking);
routerBooking.post("/", createBooking); 
routerBooking.delete('/:id',removeBooking);

export default routerBooking;
