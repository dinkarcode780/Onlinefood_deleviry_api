import express from "express";
import { addToCart, deleteCart, updateCart } from "../controllers/cartController.js";

const router = express.Router();

router.post("/addToCart",addToCart);

router.put("/updateCart",updateCart);

router.delete("/deleteCart",deleteCart);

export default router;