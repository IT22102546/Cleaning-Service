import Booking from "../models/book.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import { query } from "express";

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

  const {name,email,phone,address,city,state,zip,paymentMethod,serviceType,date,allergies,additional} = req.body;
  const bookId = phone;

  if (!req.body.name || !req.body.phone ||!req.body.address || !req.body.city || !req.body.state || !req.body.zip || !req.body.paymentMethod   || 
    !req.body.serviceType || !req.body.date || !req.body.email
  ) {
    next(errorHandler(400, "All fields are required"));
  }

  const newBooking = new Booking({
   bookId, name, email, phone, address, city, state, zip, paymentMethod, serviceType, date, allergies, additional
  });

  try {
    await newBooking.save();
    res
      .status(201)
      .json(newBooking);
  } catch (error) {
    next(error);
  }

};

export const updateBooking = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All fields are required"));
  }
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found!"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(400, "Invalid Credentials!"));
    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET
    );
    const { password: hashedPassword, ...rest } = validUser._doc;
    const expiryDate = new Date(Date.now() + 3600000);
    res
      .cookie("acess_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteBooking = async (req, res, next) => {
  try {
    // if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    //   return next(errorHandler(403, 'You are not allowed to delete this post'));
    // }
    await Booking.findByIdAndDelete(req.params.bookid); // Corrected parameter name
    res.status(200).json('The booking has been deleted');
  } catch (error) {
    next(error);
  }
};



