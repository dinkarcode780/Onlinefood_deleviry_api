
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "USER", 
  },

  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "USER", // Restaurant from which order is placed
    required: true,
  },

  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "USER", 
  },

  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    
      },
      quantity: {
        type: Number,
        min: 1,
      },
      price: {
        type: Number,
  
      },
    }
  ],

  deliveryAddress: {
    type: String,
  },

  totalAmount: {
    type: Number,
  },

  paymentStatus: {
    type: String,
    enum: ["COD", "ONLINE"],
    default: "PENDING",
  },

  orderStatus: {
    type: String,
    enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"],
    default: "Pending",
  },

  deliveryTime: {
    type: Date,
  }

}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);
export default Order;







