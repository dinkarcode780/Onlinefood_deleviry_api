import express from "express";
import { createRating, getAverageRating, getRating, getRatingById, updateRating } from "../controllers/ratingController.js";

const router = express.Router();

router.post("/createRating",createRating);

router.put("/updateRating",updateRating);

router.get("/getRating",getRating);

router.get("/getRatingById",getRatingById);

router.get("/getAverageRating",getAverageRating);

export default router;