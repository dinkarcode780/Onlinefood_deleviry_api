import asyncHandler from "../utils/asyncHandler.js";
import { compareValue, hashValue } from "../utils/hashHelper.js";
import jwt from "jsonwebtoken";

import userModel from "../../models/userModel.js";


// export const registerRestaurant = asyncHandler(async(req,res)=>{

//     const { name, ownerName, email, phoneNumber, password, address, userType} = req.body;
//   const image = req.file ? req.file.location : null;

  
//   const coordinates = req.body.coordinates ? JSON.parse(req.body.coordinates) : [];
//   const location = {
//     type: req.body.location || "Point",
//     coordinates, // Must be [longitude, latitude]
//   };


//   const existingRestaurant = await userModel.findOne({ email });
//   if (existingRestaurant) {
//     return res.status(400).json({ message: "Email already registered" });
//   }

//   const otp = 12345;
//   const hashedPassword = await hashValue(password, 10);
//   const hashedOtp = await hashValue(otp.toString(), 10);

//   const restaurant = await userModel.create({
//     name,
//     ownerName,
//     email,
//     phoneNumber,
//     password: hashedPassword,
//     address,
//     image,
//     userType ,
//     location,
  
//     otp: hashedOtp,
//   });

//   res.status(201).json({
//     success: true,
//     message: "Restaurant registered successfully",
//     data: restaurant
//   });
// });



export const registerRestaurant = asyncHandler(async (req, res) => {
  const { 
    name, 
    ownerName, 
    email, 
    phoneNumber, 
    password, 
    address, 
    userType,
    longitude,
    latitude 
  } = req.body;

  const image = req.file ? req.file.location : null;

  // Validate required fields for longitude and latitude
  if (!longitude || !latitude) {
    return res.status(400).json({ message: "Longitude and Latitude are required" });
  }

  const location = {
    type: req.body.location || "Point",
    longitude: parseFloat(longitude),
    latitude: parseFloat(latitude),
  };

  // Check if restaurant already exists
  const existingRestaurant = await userModel.findOne({ email });
  if (existingRestaurant) {
    return res.status(400).json({ message: "Email already registered" });
  }

  // Generate and hash OTP and password
  const otp = 12345;
  const hashedPassword = await hashValue(password, 10);
  const hashedOtp = await hashValue(otp.toString(), 10);

  // Create new restaurant entry
  const restaurant = await userModel.create({
    name,
    ownerName,
    email,
    phoneNumber,
    password: hashedPassword,
    address,
    image,
    userType,
    location,
    otp: hashedOtp,
  });

  res.status(201).json({
    success: true,
    message: "Restaurant registered successfully",
    data: restaurant,
  });
});



export const loginRestaurant = asyncHandler(async(req,res)=>{

    const { phoneNumber, otp } = req.body;

  const restaurant = await userModel.findOne({ phoneNumber });

  if (!restaurant) {
    return res.status(404).json({ message: "Restaurant not found" });
  }

  const isOtpValid = await compareValue(otp.toString(), restaurant.otp);
  if (!isOtpValid) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  const token = jwt.sign({ restaurantId: restaurant._id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });

  res.status(200).json({
    success: true,
    message: "Login successful",
    token,
    restaurant: {
      id: restaurant._id,
      name: restaurant.name,
      email: restaurant.email,
      phoneNumber: restaurant.phoneNumber,
    },
  });
});

export const updateRestaurant = asyncHandler(async(req,res)=>{
    
  const { name, ownerName, email, phoneNumber, address,coordinates } = req.body;
  const image = req.file ? req.file.location : null;

  const  {restaurantId} = req.body

  const updatedRestaurant = await userModel.findByIdAndUpdate(
    restaurantId,
    {
      name,
      ownerName,
      email,
      phoneNumber,
      address,
      coordinates,
      ...(image && { image }),
    },
    { new: true }
  );


  res.status(200).json({ success: true, message: "Restaurant updated successfully", data: updatedRestaurant });

})


export const getRestaurant = asyncHandler(async(req,res)=>{

  const allRestaurant = await userModel.find();

  res.status(200).json({ success: true, message: "All Restaurant", data: allRestaurant });
});

export const getRestaurantById = asyncHandler(async(req,res)=>{

  const {restaurantId} = req.query

  const restaurant = await userModel.findById(restaurantId);

  res.status(200).json({ success: true, message: "Restaurant fetched successfully", data: restaurant });
});

export const deleteRestaurant = asyncHandler(async(req,res)=>{
  const { restaurantId } = req.query;

  const deleted = await userModel.findByIdAndDelete(restaurantId);
  res.status(200).json({ success: true, message: "Restaurant deleted", data: deleted });

});


export const logoutRestaurant = asyncHandler(async(req,res)=>{

  res.clearCookie("authorization");
  res.json({ success: true, message: "Restaurant logged out successfully" });
})