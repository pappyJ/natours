const Review = require('./../Models/reviewModel');

// const catchAsync = require('./../utils/catchAsync');

const factory = require('./factoryHandler');


//end of importing modules

// exports.getAllReviews = catchAsync( async (req , res , next) => 

// {
//     let filter = {};

//     if(req.params.tourId)

//     {

//         filter = { tour :  req.params.tourId };

//     }

//     const reviews = await Review.find(filter);

//     res.status(200).json({


//         status: 'Success',
        
//         results: reviews.length,

//         data:

//         {
//             reviews
//         }


//     })

// }

// );

// exports.createReview = catchAsync( async (req , res , next) => 

// {

//     if(!req.body.tour) req.body.tour = req.params.tourId;

//     if(!req.body.user) req.body.user = req.user._id;

//     const review = await Review.create(req.body);

//     res.status(200).json({


//         status: 'Success',

//         results: review.length,

//         data:

//         {
//             review
//         }


//     })

// }

// )

exports.setTourIds = (req , res , next) =>


{
    if(!req.body.tour) req.body.tour = req.params.tourId;

    if(!req.body.user) req.body.user = req.user._id;

    next();

}

//using factory functions

exports.getAllReviews = factory.getAll(Review);

exports.getReview = factory.getOne(Review);

exports.createReview =factory.createOne(Review);

exports.updateReview = factory.updateOne(Review);

exports.deleteReview = factory.deleteOne(Review);