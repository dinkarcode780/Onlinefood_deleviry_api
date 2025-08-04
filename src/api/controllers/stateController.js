import asyncHandler from "../utils/asyncHandler.js";

import stateModel from "../../models/stateModel.js";

export const createState = asyncHandler(async(req,res)=>{

  
    const { name, country, isActive } = req.body;

    const existingState = await stateModel.findOne({ name, country });
    if (existingState) {
      return res.status(400).json({
        success: false,
        message: "State already exists",
      });
    }
  
   
    const state = await stateModel.create({
      name,
      country: country || "India", 
      isActive: isActive !== undefined ? isActive : true,
    });
  
    res.status(201).json({
      success: true,
      message: "State created successfully",
      data: state,
    });
  

});


export const updateState = asyncHandler(async(req,res)=>{

    const { stateId } = req.query;

    const { name, country, isActive } = req.body;

    const updatedState = await stateModel.findByIdAndUpdate(
        stateId,
        {
          name,
          country,
          isActive,
        },
        { new: true }
      );
    
      res.status(200).json({
        success: true,
        message: "State updated successfully",
        data: updatedState,
      });
});


export const getState = asyncHandler(async(req,res)=>{
    
     const allState = await stateModel.find();
     res.status(200).json({ success: true, message: "All State Fetched Successfully", data: allState,});

});


export const getStateById = asyncHandler(async(req,res)=>{
    const { stateId } = req.query;

    const state = await stateModel.findById(stateId);
  
    res.status(200).json({
      success: true,
      message: "State fetched successfully",
      data: state,
    });

})

export const deleteState = asyncHandler(async(req,res)=>{

    const { stateId } = req.query;

    const deleted = await stateModel.findByIdAndDelete(stateId);
    res.status(200).json({ success: true, message: "State deleted Successfully", data: deleted });

});