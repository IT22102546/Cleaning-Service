import Review from "../models/review.model.js";

export const addreview = async (req, res, next) => {
    try {
        const { content, serviceID, userId, reviewimageUrls ,username,rating,title} = req.body;

        if (userId !== req.user.id) {
            return next(errorHandler(403, 'You are not allowed to add reviews'));
        }

        if (req.body.content) {
            if (!req.body.content || req.body.content.trim().length === 0) {
              return next(
                errorHandler(400, 'Content can not be empty')
              );
            }
         
          }
          if (req.body.rating) {
            if (!req.body.rating || req.body.rating.trim().length === 0) {
              return next(
                errorHandler(400, 'Rating can not be empty')
              );
            }
         
          }
        
        const newReview = new Review({
            content,
            serviceID,
            userId,
            reviewimageUrls,
            username, 
            rating,
            title
            
        });

        await newReview.save();

        res.status(200).json(newReview);
        
    } catch (error) {
        next(error);
    }
};