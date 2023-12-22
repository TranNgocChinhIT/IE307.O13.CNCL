import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import { signUpValidator, signInValidator } from "../validation/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()
const {SERCRET_CODE} = process.env
export const signUp = async (req, res) => {
  try {
    // Bước 1: Kiểm tra lỗi
    const { error } = signUpValidator.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    // Bước 2: Kiểm tra xem email đã tồn tại chưa
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(400).json({
        message: "Email này đã được đăng ký. Bạn có muốn đăng nhập không?",
      });
    }

    // Bước 3: Mã hóa mật khẩu
    const hashedPassword = await bcryptjs.hash(req.body.password, 10);

    // Bước 4: Khởi tạo người dùng trong cơ sở dữ liệu
    const user = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    // Bước 5: Gửi thông báo cho người dùng, xóa mật khẩu trước khi trả về
    user.password = undefined;

    return res.status(200).json({
      user,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message, // Sửa lại từ "messsage" thành "message"
    });
  }
};
export const signIn = async (req, res) => {
  try {
    const { error } = signInValidator.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const user = await User.findOne({email: req.body.email})
    if (!user) {
      return res.status(400).json({
        message: "Email này chua được đăng ký. Bạn có muốn đăng ký không?",
      });
    }
    const isMatch = await bcryptjs.compare(req.body.password, user.password)
    if(!isMatch) {
      return res.status(400).json({
        message: "Mat khau khong dung",
      });
    }
    const accessToken = jwt.sign({_id:user._id}, SERCRET_CODE)
    user.password = undefined;

    return res.status(200).json({
      user,
      accessToken
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message, // Sửa lại từ "messsage" thành "message"
    });
  }
};
