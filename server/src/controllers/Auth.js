import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import { signUpValidator, signInValidator } from "../validation/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import crypto from "crypto";
import nodemailer from "nodemailer";
import schedule from "node-schedule";
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

    // Bước 4: Tạo xác nhận token và cập nhật người dùng
    const confirmationToken = crypto.randomBytes(20).toString("hex");
    const user = await User.create({
      ...req.body,
      password: hashedPassword,
      confirmationToken: confirmationToken,
    });

    // Bước 5: Gửi email xác nhận
    sendConfirmationEmail(user.email, confirmationToken);

    // Bước 6: Gửi thông báo cho người dùng, xóa mật khẩu trước khi trả về
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
    if (!user.confirmed) {
      return res.status(400).json({
        message: "Tài khoản của bạn chưa được xác nhận. Vui lòng kiểm tra email để xác nhận đăng ký.",
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

export const sendConfirmationEmail = (email, token) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.forwardemail.net",
    port: 587,
    secure: false,
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const confirmationLink = `${process.env.APP_URL}/api/auth/confirm/${token}`;

  // Use an HTML template for the email content
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Xác nhận đăng ký",
    html: `
      <p>Vui lòng nhấp vào liên kết sau để xác nhận đăng ký:</p>
      <a href="${confirmationLink}">Confirmation</a>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};
export const confirmRegistration = async (req, res) => {
  try {
    const user = await User.findOne({
      confirmationToken: req.params.token,
      confirmed: false,
    });

    if (!user) {
      return res.status(400).json({ message: "Token không hợp lệ." });
    }

    // Cập nhật trạng thái xác nhận trong cơ sở dữ liệu
    user.confirmed = true;
    user.confirmationToken = undefined;
    await user.save();
    return res.status(200).json({ message: "Xác nhận đăng ký thành công." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Đã có lỗi xảy ra." });
  }
};
const deleteUnconfirmedUsers = async () => {
  try {
    const cutoffTime = new Date(Date.now() - 5 * 60 * 1000); // 5 phút trước đây
    const unconfirmedUsers = await User.find({ confirmed: false, createdAt: { $lte: cutoffTime } });

    if (unconfirmedUsers.length > 0) {
      await User.deleteMany({ _id: { $in: unconfirmedUsers.map(user => user._id) } });
      console.log("Đã xóa người dùng không xác nhận thành công.");
    } else {
      console.log("Không có người dùng không xác nhận để xóa.");
    }
  } catch (error) {
    console.error("Lỗi khi xóa người dùng không xác nhận:", error);
  }
};

schedule.scheduleJob("0 0 * * *", deleteUnconfirmedUsers);
