import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "please add name"],
    },
    phone: {
      type: String,
      required: [true, "please add number phone"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "please add email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "please add password"],
    },
    region: {
      type: String,
      required: [true, "please add password"],
    },
    role: {
      type: String,
      default: "member",
    },
    confirmationToken: {
      type: String,
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
