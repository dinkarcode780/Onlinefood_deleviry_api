import asyncHandler from "../utils/asyncHandler.js";

import addressModel from "../../models/addressModel.js";

export const createAddress = asyncHandler(async(req,res)=>{
   
    const { user, addressType, addressLine1, addressLine2, city, state, pincode } = req.body;

 
  if (!user || !addressLine1 || !city || !state || !pincode) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields",
    });
  }

  const address = await addressModel.create({
    user,
    addressType: addressType || "Home", 
    addressLine1,
    addressLine2,
    city,
    state,
    pincode,
  });

  res.status(201).json({
    success: true,
    message: "Address created successfully",
    data: address,
  });


});


export const updateAddress = asyncHandler(async(req,res)=>{
       
    const { addressId } = req.query; 
    const { addressType, addressLine1, addressLine2, city, state, pincode } = req.body;
 
  const updatedAddress = await addressModel.findByIdAndUpdate(
    addressId,
    {
      addressType,
      addressLine1,
      addressLine2,
      city,
      state,
      pincode,
    },
    { new: true }
  );


  res.status(200).json({
    success: true,
    message: "Address updated successfully",
    data: updatedAddress,
  });
});


export const getAddress = asyncHandler(async(req,res)=>{

    const getAddressList = await addressModel.find();
   
    res.status(200).json({
      success: true,
      message: "All Address fetched successfully",
      data: getAddressList,
    });

});


export const getAddressById = asyncHandler(async(req,res)=>{

    const { addressId } = req.query; 

    const address = await addressModel.findByIdAndUpdate(addressId);

    res.status(200).json({
      success: true,
      message: "Address fetched successfully",
      data: address,
    });

})