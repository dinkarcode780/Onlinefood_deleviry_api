import express from "express";
import { createCity, getAllStatesWithCities, getCity, getCityById, } from "../controllers/cityController.js";

const router = express.Router();


router.post("/createCity",createCity);

router.get("/getCity",getCity);

router.get("/getCityById",getCityById);

router.get("/getAllStatesWithCities",getAllStatesWithCities);
export default router;