import express from "express";
import { createState, deleteState, getState, getStateById, updateState } from "../controllers/stateController.js";

const router = express.Router();

router.post("/createState",createState);

router.put("/updateState",updateState);

router.get("/getState",getState);

router.get("/getStateById",getStateById);

router.delete("/deleteState",deleteState)


export default router;