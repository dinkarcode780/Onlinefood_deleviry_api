import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",

      },
      quantity: {
        type: Number,
        trim:true,
      },
    }
  ],

  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "USER", 
    
  },

  totalAmount: {
    type: Number,
    default: 0,
  },

}, { timestamps: true });

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;

