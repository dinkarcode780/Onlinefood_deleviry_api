import express from "express";

import { addCategory, deleteCategory, getCategory, getCategoryById, updateCategory } from "../controllers/categoryController.js";
import { upload } from "../middleware/multerS3.js";

const router = express.Router();

router.post("/addCategory",upload.array("image"),addCategory);

router.put("/updateCategory",upload.array("image"),updateCategory);

router.get("/getCategory",getCategory);

router.get("/getCategoryById",getCategoryById);

router.delete("/deleteCategory",deleteCategory);

export default router;



