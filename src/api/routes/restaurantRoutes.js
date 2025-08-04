import express from "express";
import { deleteRestaurant, getRestaurant, getRestaurantById, loginRestaurant, logoutRestaurant, registerRestaurant, updateRestaurant } from "../controllers/restaurantController.js";
import { upload } from "../middleware/multerS3.js";

const router = express.Router();

router.post("/registerRestaurant",upload.single("image"),registerRestaurant);

router.post("/loginRestaurant",loginRestaurant);// 

router.put("/updateRestaurant",upload.single("image"),updateRestaurant);

router.get("/getRestaurant",getRestaurant);

router.get("/getRestaurantById",getRestaurantById);

router.delete("/deleteRestaurant",deleteRestaurant);

router.get("/logoutRestaurant",logoutRestaurant);


export default router;