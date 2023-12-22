import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imagePath: {
      type: String,
      required: true,
    },
    backdrop_path: {
      type: String,
      required: true,
    },
    evaluate: {
      type: Number,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    cast: {
      type: String,
      required: true,
    },
    categoryID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: false,  // Đặt required thành false để cho phép trường categoryID không bắt buộc
      default: null,  // Đặt giá trị mặc định là null cho trường hợp không có categoryID
    },
  },
  { timestamps: true }
);

export default mongoose.model("Movie", movieSchema);
