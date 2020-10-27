// start of third party modules

const express = require('express');

const router = express.Router()

//start of custom moules

const tourController = require('./../controllers/tourController');

const authController = require('./../controllers/authController');

const reviewRouter = require('./reviewRoutes');

//using the params midddleware

// router.param('id' , tourController.checkId);

//chaining multiple midddlewares

// const checkBody = tourController.checkBody;


//nesting routes

router.use('/:tourId/reviews' , reviewRouter);


// router.use(checkBody);

// creating an alias router

router

    .route('/top-5-cheap')

    .get(tourController.aliasTopTours , tourController.getAllTours);


//the tours stats

router

    .route('/tour-stats')

    .get(tourController.getTourStats);


//the monthly plans

router

    .route('/monthly-plan/:year')

    .get(authController.protect , authController.restrictTo('admin' , 'lead-guide' , 'guide') , tourController.getMonthlyPlan);

// getting the tours base on location

router

    .route('/tours-within/:distance/center/:latlng/unit/:unit')

    .get(tourController.getToursWithin)


// getting tour based on distances

router

    .route('/distances/:latlng/unit/:unit')

    .get(tourController.getDistances)

//creating A New Tour

router

    .route('/')

    .post(authController.protect , authController.restrictTo('admin' , 'lead-guide') ,tourController.createTour)
         
    .get(tourController.getAllTours);

//the api link for all the tours

// app.get('/api/v1/tours' , getAllTours);

//getting a single tour

router
    .route('/:id')
    
    .get(tourController.getTour)

    .patch(authController.protect 
        
    , authController.restrictTo('admin' , 'lead-guide')  

    , tourController.uploadTourImages

    , tourController.resizeTourImages
    
    , tourController.updateTour)

    .delete(tourController.deleteTour)


//Updating the tours

// app.patch('/api/v1/tours/:id' , updateTour)

//Deleting the tours

// app.delete('/api/v1/tours/:id' , deleteTour)



//exporting the router

module.exports = router;
