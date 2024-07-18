import Booking from "../models/book.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const getBooking = async (req, res, next) => {
  try {
    const requests = await Booking.find();
    const totalRequests = await Booking.countDocuments();
    const lastMonthRequests = await Booking.countDocuments();

    res.status(200).json({
      requests,
      totalRequests,
      lastMonthRequests,
    });
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
      .json({ message: "Booking request submitted successfully!" });
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


// function generateBookingId(phone, date) {
//   // Generate a random number
//   const randomNum = Math.floor(Math.random() * 10000);

//   // Extract the last 4 digits of the phone number
//   const phoneLast4 = phone.slice(-4);

//   // Extract the year, month, and day from the date
//   const year = date.getFullYear().toString().slice(-2); // last two digits of the year
//   const month = (date.getMonth() + 1).toString().padStart(2, '0'); // month is 0-indexed, pad single digit months
//   const day = date.getDate().toString().padStart(2, '0');

//   // Concatenate all parts into a single string
//   const combined = randomNum + phoneLast4 + year + month + day;

//   // Reduce the string to 5 digits by taking the first 5 characters
//   const bookingId = combined.slice(0, 5);

//   return bookingId;
// }