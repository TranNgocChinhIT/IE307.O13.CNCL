import mongoose from "mongoose";

const movieScheduleRelationshipSchema = new mongoose.Schema(
  {
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    schedule: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Schedule",
      required: true,
    },
    seats: [
      [
        {
          number: {
            type: String,
            required: true,
          },
          taken: {
            type: Boolean,
            required: true,
          },
          selected: {
            type: Boolean,
            required: true,
            default: false, 
          },
        },
      ],
    ],
  },
  { timestamps: true }
);

export default mongoose.model("MovieScheduleRelationship", movieScheduleRelationshipSchema);
