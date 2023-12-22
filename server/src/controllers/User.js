import User from "../models/User.js";
import dotenv from "dotenv"
import bcryptjs from "bcryptjs";
import { signUpValidator, signInValidator,userValidator } from "../validation/User.js";
dotenv.config()


export const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    if(users.length === 0){
      return res.status(404).json({
        message: "Khong tim thay danh sach user",
      });
    }
    return res.status(200).json({
      datas: users,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message, // Sửa lại từ "messsage" thành "message"
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if(!user){
      return res.status(404).json({
        message: "Khong tim thay user",
      });
    }
    user.password = undefined;
    return res.status(200).json({
      datas: user,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message, // Sửa lại từ "messsage" thành "message"
    });
  }
};
export const updateUser = async (req, res) => {
    try {
      const { error } = userValidator.validate(req.body, { abortEarly: false });
      if (error) {
        const errors = error.details.map((err) => err.message);
        return res.status(400).json({
          message: errors,
        });
      }
  
      // Bước 1: Nếu có mật khẩu mới được cung cấp, hãy hash nó
      if (req.body.password) {
        req.body.password = await bcryptjs.hash(req.body.password, 10);
      }
  
      // Bước 2: Cập nhật người dùng trong cơ sở dữ liệu
      const user = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );
  
      if (!user) {
        return res.status(404).json({
          message: "Update không thành công!!",
        });
      }
  
      // Bước 3: Nếu có mật khẩu mới, xóa mật khẩu trước khi trả về
      if (req.body.password) {
        user.password = undefined;
      }
  
      return res.status(200).json({
        datas: user,
      });
    } catch (error) {
      return res.status(500).json({
        name: error.name,
        message: error.message,
      });
    }
  };
  export const removeUser = async (req, res) => {
    try {

      const user = await User.findByIdAndDelete(
        req.params.id
      );
  
      if (!user) {
        return res.status(404).json({
          message: "Xoa không thành công!!",
        });
      }
  
  
      return res.status(200).json({
        message: "xoa user thanh cong"
      });
    } catch (error) {
      return res.status(500).json({
        name: error.name,
        message: error.message,
      });
    }
  }; 
  