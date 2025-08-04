import express from 'express';
import { createProduct, deleteProduct, getProduct, getProductByFilter, getProductById, updateProduct } from '../controllers/productController.js';
import { upload } from '../middleware/multerS3.js';

const router = express.Router();

router.post("/createProduct",upload.array("images", 5), createProduct);

router.put("/updateProduct", upload.array("images", 5), updateProduct);

router.get("/getProduct",getProduct);

router.get("/getProductByFilter",getProductByFilter)

router.get("/getProductById", getProductById);

router.delete("/deleteProduct",deleteProduct);

export default router;