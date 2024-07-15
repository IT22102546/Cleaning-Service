import express from "express";
import { verifyToken } from "../utils/verifyUser";

const router = express.Router()

router.get('/get-booking/:id', verifyToken,)
router.post('/create-book/:id',verifyToken, );
router.put("/update-book/:id" , verifyToken , );
router.delete("/delete-book/:id" , verifyToken , );



export default router;