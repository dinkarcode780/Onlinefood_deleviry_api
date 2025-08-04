import asyncHandler from "../utils/asyncHandler.js";

import categoryModel from "../../models/categoryModel.js";

// export const  addCategory = asyncHandler(async(req,res)=>{
      
//     const { restaurantId, name, description, items } = req.body;

//     // const image = req.files?.map(file => file.location);
//     const image = req.file ? req.file.location : null; 

  
//   if (!restaurantId || !name) {
//     return res.status(400).json({
//       success: false,
//       message: "Missing required fields: restaurantId or name",
//     });
//   }


//   const category = await categoryModel.create({
//     restaurantId,
//     name,
//     description: description || "", 
//     image: image || "", 
//     items: items || [], 
//   });

//   res.status(201).json({
//     success: true,
//     message: "Category added successfully",
//     data: category,
//   });
    
// });




export const addCategory = asyncHandler(async (req, res) => {
    const { restaurantId, name, description, items } = req.body;
  
   
    let parsedItems = [];
    try {
      parsedItems = JSON.parse(items);
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Items must be a valid JSON array",
      });
    }
  
    const files = req.files || [];
    parsedItems = parsedItems.map((item, index) => ({
      ...item,
      image: files[index]?.location || "",  
    }));
  
    const category = await categoryModel.create({
      restaurantId,
      name,
      description: description || "",
      items: parsedItems,
    });
  
    res.status(201).json({
      success: true,
      message: "Category with items added successfully",
      data: category,
    });
  });
  




// export const updateCategory = asyncHandler(async(req,res)=>{

//    const { categoryId} = req.body;

//    const { name, description, items} = req.body;
//    const image = req.files?.map(file => file.location);
// // const image = req.file ? req.file.location : null; 

//    const updatedCategory = await categoryModel.findByIdAndUpdate(
//     categoryId,
//     {
//       name,
//       description,
//       ...(items && { items }),
//       ...(image && { image }),
//     },
//     { new: true }
//   );

//   res.status(200).json({
//     success: true,
//     message: "Category updated successfully",
//     data: updatedCategory,
//   });

// });

export const updateCategory = asyncHandler(async (req, res) => {
    const { categoryId, name, description, items } = req.body;
  
    
    let parsedItems;
    if (items) {
      try {
        parsedItems = JSON.parse(items);
      } catch (err) {
        return res.status(400).json({
          success: false,
          message: "Items must be a valid JSON array",
        });
      }
    }
  

    const files = req.files || [];
    if (parsedItems) {
      parsedItems.forEach((item, index) => {
        item.image = files[index]?.location || item.image || ""; // Keep existing image if no new image
      });
    }
  
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      categoryId,
      {
        ...(name && { name }),
        ...(description && { description }),
        ...(parsedItems && { items: parsedItems }),
      },
      { new: true }
    );
  
    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: updatedCategory,
    });
  });
  

export const getCategory = asyncHandler(async(req,res)=>{

    const getCategoryList = await categoryModel.find();

    res.status(200).json({
        success: true,
        message: "Category list fetched successfully",
        data: getCategoryList,
      });
});


export const getCategoryById = asyncHandler(async(req,res)=>{

    const { categoryId} = req.query;;

    const getCategoryById = await categoryModel.findById(categoryId);

    res.status(200).json({
        success: true,
        message: "Category fetched successfully",
        data: getCategoryById,
      });
});

export const deleteCategory = asyncHandler(async(req,res)=>{

    const { categoryId} = req.query;

    const deletedCategory = await categoryModel.findByIdAndDelete(categoryId);

    res.status(200).json({
        success: true,
        message: "Category deleted successfully",
        data: deletedCategory,
      });
})
