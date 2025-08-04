import express from "express";
import {  deleteUser, getUser, getUserById, login, logout, updateUser, userRegiser } from "../controllers/userController.js";
import { userRegisterValidator } from "../middleware/userValidator.js";
import { upload } from "../middleware/multerS3.js";
import { userMiddleware } from "../middleware/userMiddleware.js";
// import { userMiddleware } from "../middleware/userMiddleware.js";
// import { auth } from "../middleware/userMiddleware.js";

const router = express.Router();

router.post("/users/userRegister",upload.single("image"),userRegiser);

router.post("/users/login",login);  

router.put("/users/updateUser", upload.single("image"),userMiddleware,updateUser);

router.get("/users/getUser",userMiddleware,getUser);

router.delete("/users/deleteUser",userMiddleware,deleteUser);

router.get("/users/logout",logout);

router.get("/users/getUserById",getUserById);






export default router;