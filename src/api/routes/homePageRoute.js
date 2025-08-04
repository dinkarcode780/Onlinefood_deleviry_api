import express from "express";
import { getHomePageData } from "../controllers/homePageController.js";

const router = express.Router();


router.post("/getHomePageData",getHomePageData)

export default router;