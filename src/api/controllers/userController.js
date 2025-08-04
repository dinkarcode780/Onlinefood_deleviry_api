import { validationResult } from "express-validator";

import jwt from "jsonwebtoken";

import {  compareValue, hashValue } from "../utils/hashHelper.js";

import asyncHandler from "../utils/asyncHandler.js";

import userModel from "../../models/userModel.js";

// import http from "http";

const generateOtp = () => Math.floor(1000 + Math.random() * 9000);


export const userRegiser = asyncHandler(async(req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
     });
     }
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {name,email,phoneNumber,password,userType, disable} = req.body;
      const image = req.file ? req.file.location : null; 


      const otp = 12345;
      console.log("OTP", otp); 
     

      const hashPassword = await hashValue(password,10);
      const hashOtp = await hashValue(otp.toString(),10);

      const existingUser = await userModel.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ message: "Email already registered" });
      }

        const User = await userModel.create ({
            name,
            email,
            phoneNumber,
            password: hashPassword,
            userType,
            disable,
            image,
            otp: hashOtp,
        });
        
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: User,
        });


});





export const login = asyncHandler(async (req, res) => {
  const { phoneNumber, otp } = req.body;

  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array()[0].msg,
    });
  }

  // Check if user exists
  const user = await userModel.findOne({ phoneNumber });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  // Verify OTP
  const isOtpValid = await compareValue(otp.toString(), user.otp);
  if (!isOtpValid) {
    return res.status(400).json({
      success: false,
      message: "Invalid OTP",
    });
  }



  const token = jwt.sign(
    {
      userId: user._id,
      userType: user.userType, 
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1h" }
  );
  


  res.status(200).json({
    success: true,
    message: "Login successful",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      userType: user.userType,
    },
  });
});


export const updateUser = asyncHandler(async(req,res)=>{
  
      const { name, email, phoneNumber,  userType, disable } = req.body;
      const image = req.file ? req.file.location : null; 
  
      const {userId} = req.body; 
  
      const updatedUser = await userModel.findByIdAndUpdate(
          userId,
          {
              name,
              email,
              phoneNumber,
              userType,
              disable,
              ...(image && { image }),
          },
          { new: true }
      );
  
      if (!updatedUser) {
          return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({
          success: true,
          message: "User updated successfully",
          data: updatedUser,
      });
});


export const getUser = asyncHandler(async(req,res)=>{

  const allUser = await userModel.find();
  res.status(200).json({
      success: true,
      message: "All users fetched successfully",
      data: allUser,
  });

});


export const deleteUser = asyncHandler(async(req,res)=>{

  const { userId } = req.query; 

  const deletedUser = await userModel.findByIdAndDelete(userId);

  

  res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: deletedUser,
  });
});



export const getUserById = asyncHandler(async(req,res)=>{
  
    const { userId } = req.query; 
  
    const user = await userModel.findById(userId);
  
    res.status(200).json({ success: true,  message: "User fetched successfully", data: user,});

});



export const logout = asyncHandler(async(req,res)=>{

  res.clearCookie("authorization");
  res.json({ success: true, message: "User logged out successfully" });

});










