import express from "express";
import { deleteDriver, driverLogin, driverRegister, driverUpdate, getDriver, getDriverById, logoutDriver,  } from "../controllers/driverController.js";
import { upload } from "../middleware/multerS3.js";

const router = express.Router();

router.post("/driverRegister",upload.single("image"),driverRegister);

router.post("/driverLogin",driverLogin);

router.put("/driverUpdate",upload.single("image"),driverUpdate);

router.get("/getDriver",getDriver);

router.get("/getDriverById",getDriverById);

router.delete("/deleteDriver",deleteDriver);

router.get("/logoutDriver",logoutDriver);

export default router;