import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { createBooking, deleteBooking, getBooking, updateBooking, getOneBooking, getAcceptedREQ, getCompletedREQ, acceptBooking, completeBooking } from "../controllers/book.controller.js";

const router = express.Router()

router.get('/get-bookings', getBooking);
router.get('/get-bookings/:bookId', getOneBooking);
router.post('/create-book',createBooking);
//router.put("/update-book/:bookid" , verifyToken , updateBooking);
//router.delete('/deleteproduct/:productId/:userId', verifyToken, deleteproduct);
router.get('/getacceptedreq',getAcceptedREQ);
router.get('/getcompletedreq',getCompletedREQ);
router.put('/accept-book/:id', acceptBooking);
router.put("/complete-book/:id", completeBooking);
router.delete("/delete-book/:id", deleteBooking);

export default router;