
import userModel from "../../models/userModel.js";
import categoryModel from "../../models/categoryModel.js";
import asyncHandler from "../utils/asyncHandler.js";



export const getHomePageData = asyncHandler(async (req, res) => {
  const { longitude, latitude } = req.body;

  console.log("Longitude:", longitude);
  console.log("Latitude:", latitude);

  if (!latitude || !longitude) {
    return res.status(400).json({
      success: false,
      message: "Location coordinates are required",
    });
  }

  try {
    const nearbyRestaurants = await userModel.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          distanceField: "distance",
          maxDistance: 5000, // 5 KM
          spherical: true,
          query: {
            userType: "RESTAURANT",
            disable: false,
          }
        }
      },
      {
        $limit: 20, // Limit kar do to avoid huge data
      },
      {
        $project: {
          name: 1,
          ownerName: 1,
          email: 1,
          phoneNumber: 1,
          address: 1,
          image: 1,
          location: 1,
          distance: 1,
        }
      }
    ]);

    const categories = await categoryModel.find().limit(10);

    res.status(200).json({
      success: true,
      location: {
        latitude,
        longitude,
      },
      data: {
        restaurants: nearbyRestaurants,
        categories,
      },
    });
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching homepage data",
      error: error.message,
    });
  }
});
