import asyncHandler from "../utils/asyncHandler.js";

import productModel from "../../models/productModel.js";


export const createProduct = asyncHandler(async(req,res)=>{
    const { name, description, price,categoryId, restaurantId } = req.body;

    const images = req.files?.map(file => file.location);

  
    const product = await productModel.create({
        name,
        description,
        price,
       categoryId,
        images,
        restaurantId,
      });
    
      res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: product,
      });

});

export const updateProduct = asyncHandler(async(req,res)=>{

    const { productId } = req.body;

    const { name, description, price,categoryId, } = req.body;

    const images = req.files?.map(file => file.location);

    const updatedProduct = await productModel.findByIdAndUpdate(
        productId,
        {
          name,
          description,
          price,
         categoryId,
          ...(images && { images }),
        },
        { new: true }
      );
    
      res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: updatedProduct,
      });
});


export const getProduct = asyncHandler(async(req,res)=>{


    const productList = await productModel.find();

      res.status(200).json({
        success: true,
        message: "Product retrieved successfully",
        data: productList,
      });

});



export const getProductByFilter = asyncHandler(async (req, res) => {

  const { name } = req.query; 

 
  const filter = {};
  if (name) {
    filter.name = { $regex: name, $options: "i" }; // Case-insensitive search
  }

  
  const products = await productModel.find(filter);

  res.status(200).json({
    success: true,
    message: "Products retrieved successfully",
    data: products,
  });

});



export const getProductById = asyncHandler(async(req,res)=>{

    const { productId } = req.query;
    const product = await productModel.findById(productId);
   
      res.status(200).json({
        success: true,
        message: "Product retrieved successfully",
        data: product,
      });

});


export const deleteProduct = asyncHandler(async(req,res)=>{

    const { productId } = req.query;


    const deleted = await productModel.findByIdAndDelete(productId);
    
    res.status(200).json({ success: true, message: "Product deleted", data: deleted });

});