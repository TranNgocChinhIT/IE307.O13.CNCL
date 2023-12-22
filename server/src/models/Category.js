import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true, 
            default:"unCategoried"
        },
        slug: {
            type: String, 
            unique: true,  
            required: true,
            default:"unCategoried"
        },
        movies: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Movie",
            },
        ],
    },
    { timestamps: true }
);

export default mongoose.model("Category", categorySchema);
