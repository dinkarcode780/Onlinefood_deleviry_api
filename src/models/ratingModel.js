import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "USER",
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RESTAURANT",
  },
  rating: {
    type: Number,
  },
  review: {
    type: String,
    trim: true
  },
 
}, { timestamps: true });

const rating = mongoose.model("Rating", ratingSchema);
export default rating;
