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
      type: String,
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
    cast: [
      {
        actorName: {
          type: String,
          required: true,
        },
        actorImage: {
          type: String,
          required: true,
        },
      },
    ],
    trailer: {
      type: String,
      required: true,
    },
    categoryID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: false,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Movie", movieSchema);
