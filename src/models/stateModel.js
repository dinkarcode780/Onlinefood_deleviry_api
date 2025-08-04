import mongoose from "mongoose";

const stateSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },

  country: {
    type: String,
    default: "India",
    trim: true,
  },

  isActive: {
    type: Boolean,
    default: true,
  }

}, { timestamps: true });

const State = mongoose.model("State", stateSchema);
export default State;
