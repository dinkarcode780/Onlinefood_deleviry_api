import asyncHandler from "../utils/asyncHandler.js";

import cartModel from "../../models/cartModel.js";
import productModel from "../../models/productModel.js";

export const addToCart = asyncHandler(async(req,res)=>{
    
    const { userId, items, restaurantId } = req.body;

  // Validate required fields
  if (!userId || !items || items.length === 0 || !restaurantId) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields",
    });
  }

  
  const updatedItems = await Promise.all(
    items.map(async (item) => {
      const product = await productModel.findById(item.productId);
      if (!product) {
        throw new Error(`Product with ID ${item.productId} not found`);
      }
      return {
        productId: item.productId,
        quantity: item.quantity,
        price: parseFloat(product.price), // Fetch price from Product model
      };
    })
  );

  // Calculate total amount
  const totalAmount = updatedItems.reduce((total, item) => total + item.quantity * item.price, 0);

  // Find the cart for the user
  let cart = await cartModel.findOne({ userId });

  if (cart) {
    // Update the existing cart
    cart.items = updatedItems;
    cart.restaurantId = restaurantId;
    cart.totalAmount = totalAmount;
    await cart.save();
  } else {
    // Create a new cart
    cart = await cartModel.create({
      userId,
      items: updatedItems,
      restaurantId,
      totalAmount,
    });
  }

  res.status(201).json({
    success: true,
    message: "Cart created successfully",
    data: cart,
  });
});

// export const updateCart = asyncHandler(async(req,res)=>{
     
//   const { cartId} = req.query;
//     const { userId, productId, quantity } = req.body;


//     if (!userId || !productId || quantity === undefined) {
//       return res.status(400).json({
//         success: false,
//         message: "Missing required fields",
//       });
//     }
  
    
      



//     let cart = await cartModel.findOne({ userId });
  
//     if (!cart) {
//       return res.status(404).json({
//         success: false,
//         message: "Cart not found",
//       });
//     }
  

//     const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
  
//     if (itemIndex === -1) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found in cart",
//       });
//     }
  
   
//     cart.items[itemIndex].quantity = quantity;
  

//     const totalAmount = cart.items.reduce((total, item) => total + item.quantity * item.price, 0);
//     cart.totalAmount = totalAmount;
  
    
//     await cart.save();
  
//     res.status(200).json({
//       success: true,
//       message: "Cart updated successfully",
//       data: cart,
//     });

// });


export const updateCart = asyncHandler(async (req, res) => {
  const { userId, productId, quantity, restaurantId } = req.body;


  if (!userId || !productId || quantity === undefined || !restaurantId) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields",
    });
  }

  
  const product = await productModel.findById(productId);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

 
  const productPrice = parseFloat(product.price);
  if (isNaN(productPrice)) {
    return res.status(400).json({
      success: false,
      message: "Invalid product price",
    });
  }

  let cart = await cartModel.findOne({ userId });

  if (!cart) {
    
    if (quantity === 0) {
      return res.status(400).json({
        success: false,
        message: "Cannot add item with quantity 0",
      });
    }

    cart = await cartModel.create({
      userId,
      restaurantId,
      items: [
        {
          productId,
          quantity,
          price: productPrice,
        },
      ],
      totalAmount: quantity * productPrice,
    });
  } else {
    
    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingItemIndex > -1) {
      if (quantity === 0) {
        
        cart.items.splice(existingItemIndex, 1);
      } else {
      
        cart.items[existingItemIndex].quantity = quantity;
        cart.items[existingItemIndex].price = productPrice;
      }
    } else {
    
      if (quantity > 0) {
        cart.items.push({
          productId,
          quantity,
          price: productPrice,
        });
      }
    }

 
    cart.totalAmount = cart.items.reduce((sum, item) => {
      const itemPrice = item.price || 0; // Fallback to 0 if price is missing
      const itemQuantity = item.quantity || 0; // Fallback to 0 if quantity is missing
      return sum + itemQuantity * itemPrice;
    }, 0);

  
    cart.restaurantId = restaurantId;

  
    await cart.save();
  }

  res.status(200).json({
    success: true,
    message: "Cart updated successfully",
    data: cart,
  });
});




export const deleteCart = asyncHandler(async(req,res)=>{

  const { cartId } = req.params;
  
    const deletedCart = await cartModel.findByIdAndDelete(cartId);

    res.status(200).json({
        success: true,
        message: "Cart deleted successfully",
        data: deletedCart,
    });

})