import asyncHandler from "../utils/asyncHandler.js";

import ratingModel from "../../models/ratingModel.js";
// import mongoose from "mongoose";

export const createRating = asyncHandler(async(req,res)=>{

    const {userId, restaurantId, rating, review} = req.body;
    console.log("reefg",restaurantId);
    const newRating = await ratingModel.create({
        userId,
        restaurantId,
        rating,
        review
    });

    res.status(200).json({
        success: true,
        message: "Rating created successfully",
        data: newRating,
    });
});



export const updateRating = asyncHandler(async (req, res) => {
    const { ratingId } = req.query;
    const { rating, review } = req.body;
  
    const existingRating = await ratingModel.findByIdAndUpdate(ratingId);
  
    if (!existingRating) {
      return res.status(404).json({
        success: false,
        message: "Rating not found",
      });
    }
  
    if (rating !== undefined) existingRating.rating = rating;
    if (review !== undefined) existingRating.review = review;
  
    await existingRating.save();
  
    res.status(200).json({
      success: true,
      message: "Rating updated successfully",
      data: existingRating,
    });

  });


  export const getRating = asyncHandler(async(req,res)=>{
    const getRatingList = await ratingModel.find();

    res.status(200).json({
        success: true,
        message: "All Rating",
        data: getRatingList,
    });
  });


  export const getRatingById = asyncHandler(async(req,res)=>{
    const { ratingId } = req.query;
    const rating = await ratingModel.findById(ratingId);

    res.status(200).json({
        success: true,
        message: "Rating fetched successfully",
        data: rating,
    });
  });





  export const getAverageRating = asyncHandler(async (req, res) => {
    const { restaurantId } = req.query;
  
    
    if (!restaurantId) {
      return res.status(400).json({
        success: false,
        message: "Missing required field: restaurantId",
      });
    }
  
   
    const ratings = await ratingModel.find({ restaurantId });
  
    if (ratings.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No ratings found for this restaurant",
      });
    }
  
    
    const totalRatings = ratings.length;
    const averageRating =
      ratings.reduce((sum, rating) => sum + rating.rating, 0) / totalRatings;
  
    res.status(200).json({
      success: true,
      message: "Average rating fetched successfully",
      data: {
        restaurantId,
        averageRating,
        totalRatings,
      },
    });
  });