import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },

  description: {
    type: String,
    trim: true,
  },

  price: {
    type: String,

  },

  images: [
    {
      type: String,
      
    }
  ],

  categoryId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Category",
  },


  isAvailable: {
    type: Boolean,
    default: true,
  },

  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "USER", 
    
  },

}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
export default Product;
