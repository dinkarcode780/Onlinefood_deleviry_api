import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "USER", 
  },

  name: {
    type: String,
    trim: true,
  },

  items: [
    {
      name: {
        type: String,
        trim: true,
      },
      description: {
        type: String,
        trim: true,
      },
      price: {
        type: Number,

      },
      image: {
        type: String,
        trim: true,
      },
      isAvailable: {
        type: Boolean,
        default: true,
      }
    }
  ],

 
}, { timestamps: true });

const category = mongoose.model("Category", categorySchema);
export default category;


