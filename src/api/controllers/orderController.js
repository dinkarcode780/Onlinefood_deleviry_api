import asyncHandler from "../utils/asyncHandler.js";

import orderModel from "../../models/orderModel.js";

export const createOrder = asyncHandler(async(req,res)=>{

    const {
        userId,
        restaurantId,
        driverId,
        items,
        deliveryAddress,
        totalAmount,
        paymentStatus,
      } = req.body;


    
      if (!userId || !restaurantId || !items || items.length === 0 || !deliveryAddress || !totalAmount) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields",
        });
      }




      // if (global.io && global.users) {
      //   for (const [userId, userInfo] of Object.entries(global.users)) {
      //     if (userInfo.role === 'driver') {
      //       global.io.to(userInfo.socketId).emit('newOrder', order);
      //     }
      //   }
      // }
    
      
      const order = await orderModel.create({
        userId,
        restaurantId,
        driverId,
        items,
        deliveryAddress,
        totalAmount,
        paymentStatus: paymentStatus || "PENDING", 
        orderStatus: "Pending", 
      });
    
      res.status(201).json({
        success: true,
        message: "Order created successfully",
        data: order,

      });
    
})

export const getOrder =  asyncHandler(async(req,res)=>{

    const getListOrder = await orderModel.find();

    res.status(200).json({
        success: true,
        message: "Order list",
        data: getListOrder,
    });
});


export const getOrderById = asyncHandler(async(req,res)=>{

    const { orderId } = req.query;

    const order = await orderModel.findById(orderId);

    res.status(200).json({
        success: true,
        message: "Order fetched successfully",
        data: order,
    });
});