import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { addreview } from "../controllers/review.controller.js";


const router = express.Router();

router.post("/addreview",verifyToken,addreview);



export default router;