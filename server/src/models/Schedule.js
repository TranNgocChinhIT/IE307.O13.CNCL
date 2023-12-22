import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema(
  {
    screeningDate: {
      type: Date,
      required: true,
    },
    screeningTime: {
      type: String,
      required: true,
    },
    theater: {
      type: String,
      required: true,
    },
    ticketPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Schedule", scheduleSchema);
