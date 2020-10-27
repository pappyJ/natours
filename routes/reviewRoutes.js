const express = require('express');

const router = express.Router({ mergeParams: true });

const reviewController = require('../controllers/reviewsController');

const authController = require('../controllers/authController');

//end of module import

router.use(authController.protect)

router

    .route('/')

    .get(reviewController.getAllReviews)

    .post(

        authController.restrictTo('user') , 
        
        reviewController.setTourIds , 
        
        reviewController.createReview
        
        )


router

    .route('/:id')

    .get(reviewController.getReview)

    .delete(authController.restrictTo('user' , 'admin') , reviewController.deleteReview)

    .patch(authController.restrictTo('user' , 'admin') , reviewController.updateReview);

module.exports = router;