// controllers/booking.controller.js

import Booking from "../models/book.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const getBooking = async (req, res, next) => {
  try {
    const { searchTerm } = req.query;
    const queryOptions = {};

    if (searchTerm) {
      queryOptions.title = { $regex: searchTerm, $options: 'i' };
    }

    const requests = await Booking.find(queryOptions);
    const totalRequests = await Booking.countDocuments(queryOptions);

    res.status(200).json({
      requests,
      totalRequests,
    });
  } catch (error) {
    next(error);
  }
};

export const getOneBooking = async (req, res, next) => {
  try {
    const { bookId } = req.query;

    if (!bookId) {
      return res.status(400).json({ message: 'Book ID is required' });
    }

    const booking = await Booking.findById(bookId);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({ booking });
  } catch (error) {
    next(error);
  }
};

export const createBooking = async (req, res, next) => {
  const { name, email, phone, address, city, state, zip, paymentMethod, serviceType, date, allergies, additional } = req.body;
  const bookId = phone;

  if (!name || !phone || !address || !city || !state || !zip || !paymentMethod || !serviceType || !date || !email) {
    next(errorHandler(400, "All fields are required"));
  }

  const newBooking = new Booking({
    bookId, name, email, phone, address, city, state, zip, paymentMethod, serviceType, date, allergies, additional
  });

  try {
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    next(error);
  }
};

export const updateBooking = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const updateData = req.body;

    const updatedBooking = await Booking.findByIdAndUpdate(bookId, updateData, { new: true });

    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json(updatedBooking);
  } catch (error) {
    next(error);
  }
};

export const deleteBooking = async (req, res, next) => {
  try {
    await Booking.findByIdAndDelete(req.params.bookid);
    res.status(200).json('The booking has been deleted');
  } catch (error) {
    next(error);
  }
};

export const getAcceptedREQ = async (req, res, next) => {
  try {
    const accepted = await Booking.find({ isAccepted: true });
    res.status(200).json({ accepted });
  } catch (error) {
    console.error("Error in getAccepted request controller:", error);
    res.status(500).json({ status: 500, message: "Internal server error" });
  }
};

export const getCompletedREQ = async (req, res, next) => {
  try {
    const completed = await Booking.find({ isCompleted: true });
    res.status(200).json({ completed });
  } catch (error) {
    console.error("Error in getCompleted request controller:", error);
    res.status(500).json({ status: 500, message: "Internal server error" });
  }
};
