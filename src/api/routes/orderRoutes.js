import express from "express";
import { createOrder, getOrder, getOrderById } from "../controllers/orderController.js";

const router = express.Router();

router.post("/createOrder",createOrder);

router.get("/getOrder",getOrder);

router.get("/getOrderById",getOrderById);



export default router;