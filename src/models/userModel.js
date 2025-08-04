import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },

  ownerName:{
    type: String,
    trim: true,
  },


  email: {
    type: String,
    trim: true,
  },
    phoneNumber: {
        type: Number,
        trim: true,
    },

    address:{
      type: String,
      trim: true,
    },
    otp:{
        type: String,
        
    },

    fcmToken: {
        type: String,
        trim: true,
      },

  password: {
    type: String,
    trim: true,
  },

  image: {
    type: String,
    trim: true,
  },
  userType: {
    type: String,
    enum: ["USER", "ADMIN","DRIVER","RESTAURANT"],
    default: "USER",
  },

  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    longitude: {
      type: Number,
    },
    latitude: {
      type: Number,
    },
  },



  // location: {
  //   type: {
  //     type: String,
  //     enum: ['Point'],
  //     default: 'Point'  
  //   },
  //   coordinates: {
  //     type: [Number], 
  //   },
  // },

  




  disable: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });



userSchema.index({ location: "2dsphere" });
  
const User = mongoose.model("User", userSchema);
export default User;