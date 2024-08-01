import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { createBooking, deleteBooking, getBooking, updateBooking, getOneBooking, getAcceptedREQ, getCompletedREQ } from "../controllers/book.controller.js";

const router = express.Router()

router.get('/get-bookings', getBooking);
router.get('/get-bookings/:bookId', getOneBooking);
router.post('/create-book',createBooking);
router.put("/update-book/:bookid" , verifyToken , updateBooking);
router.delete("/delete-book/:bookid", deleteBooking);

//router.delete('/deleteproduct/:productId/:userId', verifyToken, deleteproduct);
router.get('/getacceptedreq',getAcceptedREQ);
router.get('/getcompletedreq',getCompletedREQ);

export default router;