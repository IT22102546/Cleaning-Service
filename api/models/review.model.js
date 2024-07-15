import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true
       
    },

    reviewId:{
        type:String,
    },

    title: {
        type: String,
       
    },

    serviceId: {
        type: String,
        required:true
    },

    content: {
        type: String,
        required: true
    },

    rating: {
        type: Number,
        
    },

    reviewimageUrls:{
        type:Array,

    },
    
    reply:{
        type:String,
        
    },

}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);
export default Review;
