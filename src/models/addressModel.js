import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "USER",
  },

  addressType: {
    type: String,
    enum: ["Home", "Work", "Other"],
    default: "Home",
  },

  addressLine1: {
    type: String,
    trim: true,
  },

  addressLine2: {
    type: String,
    trim: true,
  },

  city: {
    type: String,
    trim: true,
  },

  state: {
    type: String,
    trim: true,
  },

  pincode: {
    type: String,
    trim: true,
  },


}, { timestamps: true });



const Address = mongoose.model("Address", addressSchema);
export default Address;
