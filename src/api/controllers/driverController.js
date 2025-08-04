import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { compareValue, hashValue } from "../utils/hashHelper.js";

import userModel from "../../models/userModel.js";

export const driverRegister = asyncHandler(async(req,res)=>{
    const { name, email, phoneNumber, password, location,userType} = req.body;

    const image = req.file ? req.file.location : null;

    const existingDriver = await userModel.findOne({ email });

    if (existingDriver) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const otp = 12345;
    const hashedPassword = await hashValue(password, 10);
    const hashedOtp = await hashValue(otp.toString(), 10);

    const driver = await userModel.create({
        name,
        email,
        phoneNumber,
        password: hashedPassword,
        location,
        image,
        userType,
        otp: hashedOtp,
      });

    res.status(201).json({
        success: true,
        message: "Driver registered successfully",
        data: driver,
    });
    
});


export const driverLogin = asyncHandler(async (req, res) => {
    const { phoneNumber, otp } = req.body;
  
    const driver = await userModel.findOne({ phoneNumber });
    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }
  
    const isOtpValid = await compareValue(otp.toString(), driver.otp);
    if (!isOtpValid) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
  
    const token = jwt.sign({ driverId: driver._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
  
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      driver: {
        id: driver._id,
        name: driver.name,
        email: driver.email,
        phoneNumber: driver.phoneNumber,
        vehicleType: driver.vehicleType,
      },
    });
  })


  export const driverUpdate = asyncHandler(async (req, res) => {

    const { name, email, phoneNumber,  location } = req.body;
    const image = req.file ? req.file.location : null;

    const { driverId } = req.body;
  
    const updatedDriver = await userModel.findByIdAndUpdate(
      driverId,
      {
        name,
        email,
        phoneNumber,
        location,
        ...(image && { image }),
      },
      { new: true }
    );
  
  
    res.status(200).json({ success: true, message: "Driver updated successfully", data: updatedDriver });
  });


  export const getDriver = asyncHandler(async (req, res) => {
    const allDrivers = await userModel.find();
    res.status(200).json({ success: true, message: "All drivers fetched", data: allDrivers });
  });



  export const getDriverById = asyncHandler(async (req, res) => {
    const { driverId } = req.query;

    const driver = await userModel.findById(driverId);
   
  
    res.status(200).json({ success: true, message: "Driver fetched", data: driver });
  });


  export const deleteDriver = asyncHandler(async (req, res) => {
    const { driverId } = req.query;

    const deletedDriver = await userModel.findByIdAndDelete(driverId);

    res.status(200).json({ success: true, message: "Driver deleted", data: deletedDriver });
  });

  export const logoutDriver = asyncHandler(async (req, res) => {
    res.clearCookie("authorization");
    res.json({ success: true, message: "Driver logged out successfully" });
  });