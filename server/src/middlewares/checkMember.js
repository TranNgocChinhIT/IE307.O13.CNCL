import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import User from "../models/User.js";
dotenv.config()
const {SERCRET_CODE} = process.env
const checkMember = async (req,res , next) => {
    try {
        //kiem tra dang nhap
        const token = req.headers.authorization.split(" ")[1];
        //kiem tra token
        if(!token) {
            return res.status(403).json({
                message:"ban chua dang nhap",
            });
        }
        //kiem tra quyen
        const decoded = jwt.verify(token,SERCRET_CODE)
        const user = await User.findById(decoded._id)
        if (!user) {
            return res.status(403).json({
                message:"Token loi",
            });
        }
        if (user.role !== "member") {
            return res.status(400).json({
                message:"ban khong co quyen lam viec nay"
            })
        }

        //next
        next()
    } catch (error) {
        return res.json({
            name:error.name,
            message:error.message
        })
    }
};
export default checkMember;