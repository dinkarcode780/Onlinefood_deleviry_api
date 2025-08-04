import exorss from "express";
import { createAddress, getAddress, getAddressById, updateAddress } from "../controllers/addressController.js";

const router = exorss.Router();

router.post("/createAddress",createAddress);

router.put("/updateAddress",updateAddress);

router.get("/getAddress",getAddress);

router.get("/getAddressById",getAddressById);

export default router;
