import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  bookId:{
    type:String,
    unique:true,
  },

  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  serviceType: {
    type: String,
    required: true,

  },
  date: {
    type: Date,
    required: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  state: {
    type: String,
    required: true,
    trim: true
  },
  zip: {
    type: String,
    required: true,
    trim: true
  },
  paymentMethod: {
    type: String,
    required: true,
    
  },
  
  allergies: {
    type: String,
    trim: true,
    default:"No any allergies"
  },
  additional: {
    type: String,
    trim: true,
    default:"No any additional information"
  }
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
