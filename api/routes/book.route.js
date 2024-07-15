import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { createBooking, deleteBooking, getBooking, updateBooking } from "../controllers/book.controller.js";

const router = express.Router()

router.get('/get-booking/:id', verifyToken, getBooking)
router.post('/create-book',createBooking);
router.put("/update-book/:id" , verifyToken , updateBooking);
router.delete("/delete-book/:id" , verifyToken , deleteBooking);



export default router;