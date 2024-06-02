import mongoose from "mongoose";

const mapSchema = new mongoose.Schema(
  {
    cinema_name: {
      type: String,
      required: true,
    },
    location_name: {
      type: String,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    hasManyAmenities: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Map", mapSchema);
