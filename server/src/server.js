import express from "express"
import dotenv from "dotenv"
import router from "./routes/index.js";
import connectDB from "./config/db.js"
const app = express();

dotenv.config()
//REST OBJECT
const PORT = process.env.PORT;
connectDB()
//middlewares
app.use(express.json());
app.use("/api",router)
//listen
app.listen(PORT, () => {
  console.log(`Server Runnning ${PORT}`);
});