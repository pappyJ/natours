// const fs = require('fs');

//end of core modules import

//start of third party moules

// const express = require('express');

// const app = express();

// app.use(express.json());

//end of third party moules

//start of custom moules

const multer = require('multer');

const sharp = require('sharp');

const Tour = require('./../Models/tourModel');

// const APIFeatures = require('./../utils/apiFeaures');

const catchAsync = require('./../utils/catchAsync');

const AppError = require('./../utils/appError');

const factory = require('./factoryHandler');

const { MSG, STATUS } = require('../shared/constants/responseConstants');

//creating the alias for the top 5 chap tours

exports.aliasTopTours = async (req, res, next) => {
  req.query.limit = '5';

  req.query.sort = '-ratingsAverage,price';

  req.query.fields = 'name,price,ratingsAverage';

  next();
};

//reading the data from a file

// const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json` , 'utf-8'));

// app.get('/' , (req , res) => {

//     // res.status(200).send('Hello From  THe Server Side...');

//     res.status(200).json({message : 'THis Is A Json Example' , app: 'Natours'});

// })

//Refactoring Our Codes

//using middleware params to check valiid id

// exports.checkId = (req , res , next , val) =>

// {
//     if(req.params.id > tours.length)

//     {
//         console.log(`The Tour Id Is ${val}`)

//         return res.status(404).json({

//             status: 'Failed',

//             message: 'ID Not Found'

//         })
//     }

//     next();
// }

//using middleware params to check for name property in post reques

// exports.checkBody = (req , res , next) =>

// {
//     if(!req.body.name || !req.body.price)

//     {
//         return res.status(400).json({

//             status: 'Failed',

//             message: 'Bad Request'

//         })
//     }

//     next();
// }

// exports.createTour = (req , res) => {

//     const newId = tours[tours.length - 1].id + 1;

//     const newTour = Object.assign({id: newId} , req.body);

//     tours.push(newTour);

//     fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json` , JSON.stringify(tours) , err => {

//         res.status(201).json({

//             status: 'Success',

//             // data:

//             // {
//             //     tour: newTour
//             // }

//         })

//     });

// }

// exports.createTour =  catchAsync(async (req , res , next) => {

//     const newTour = await Tour.create(req.body);

//     res.status(201).json({

//         status: 'Success',

//         data:

//         {
//             tour: newTour
//         }

//     })

// const newTour = new Tour({});

// newTour.save();

// try

// {

// }

// catch(err)

// {
//     res.status(400).json({

//         status: 'Failed',

//         message: err

//     })
// }

// });

// exports.getAllTours = catchAsync(async (req , res , next) => {

//     // try

//     // {
//         //Build Query

//         // //ing

//         // console.log(req.query);

//         // const queryObj = {...req.query};

//         // const exclude = ['page' , 'sort' , 'limit' , 'fields'];

//         // exclude.forEach(el => delete queryObj[el]);

//         // //Advanced Filtering

//         // let queryStr = JSON.stringify(queryObj);

//         // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g , match => `$${match}`);

//         // // console.log(JSON.parse(queryStr));

//         // let query = Tour.find(JSON.parse(queryStr));

//         // //Sorting

//         // if(req.query.sort)

//         // {

//         //   const sortBy = req.query.sort.split(',').join(' ');

//         //    query = query.sort(sortBy);

//         // //    console.log(sortBy);
//         // }

//         // else

//         // {
//         //     query = query.sort('-createdAt');
//         // }

//         // //Projecting or Limiting

//         // if(req.query.fields)

//         // {
//         //     const fields = req.query.fields.split(',').join(' ');

//         //     query = query.select(fields);

//         //     console.log(fields);

//         // }

//         // else

//         // {
//         //     query = query.select('-__v');
//         // }

//         // //Pagination

//         // // example = query = query.skip(2).limit(10);

//         // const page = req.query.page * 1 || 1;

//         // const limit = req.query.limit * 1 || 100;

//         // const skip = (page - 1) * limit;

//         // query = query.skip(skip).limit(limit);

//         // // the requested page is greater than the total number of results

//         // if(req.query.page)

//         // {
//         //     const numTour = await Tour.countDocuments();

//         //     if(skip >= numTour)

//         //     {
//         //         throw new Error;
//         //     }

//         // }

//         //Execute Query

//         const features = new APIFeatures(Tour.find() , req.query)

//         .filter()

//         .sort()

//         .limitFields()

//         .Pagination();

//         const tours = await features.query;

//         // filtering the tours

//         //logging the query strings to the console

//         // console.log(req.query , queryObj);

//         // const tours = await Tour.find({

//         //     difficulty: 'easy',

//         //     duration: 5

//         // });

//         //filtering the tours using mongoose methods

//         // const query = await Tour.find()

//         //         .where('difficulty')

//         //         .equals('easy')

//         //         .where('duration')

//         //         .equals(5)

//         // Send Response

//         res.status(200).json({

//                 status: 'Success',

//                 results: tours.length,

//                 requestedAt: req.requestTime,

//                 data:

//                 {
//                     tours
//                 }

//         })

//     });

// catch(err)

// {

//     res.status(404).json({

//         status: 'Failed',

//         message: err

//     });

// }

// }

// exports.getTour = catchAsync(async (req , res , next) => {

//     // try

//     // {

//         // const id = req.params.id * 1;

//         // const tour = tours.find(el => el.id === id);

//         const tour = await Tour.findById(req.params.id).populate('reviews')

//         if(!tour)

//         {
//             return next(new AppError(`No Tour With That ID Found` , 404)) ;
//         }

//         res.status(200).json({

//             status: 'Success',

//             data:

//             {
//                 tour
//             }

//         })

//     });

// catch(err)

// {

//     res.status(404).json({

//         status: 'Failed',

//         message: err

//     });

// }

// }

// exports.updateTour = catchAsync(async (req , res, next) => {

// try

// {

// if(req.params.id * 1 > tours.length)

// {

//     return res.status(404).json({

//         status: 'Failed',

//         message: 'ID Not Found'

//     })

// }

// const tour = await Tour.findByIdAndUpdate(req.params.id , req.body ,

// {new: true , runValidators: true})

// if(!tour)

// {
//     return next(new AppError(`No Tour With That ID Found` , 404)) ;
// }

// res.status(200).json({

//     status: 'Success',

//     data:

//     {
//         tour
//     }

// })

// }

// catch(err)

// {

//     res.status(404).json({

//         status: 'Failed',

//         message: err

//     });

// }

// })

//using factory functions

exports.getAllTours = factory.getAll(Tour);

exports.getTour = factory.getOne(Tour);

exports.createTour = factory.createOne(Tour);

exports.updateTour = factory.updateOne(Tour);

exports.deleteTour = factory.deleteOne(Tour);

// exports.deleteTour = catchAsync(async (req , res , next) => {

// try

// {

// await Tour.findByIdAndDelete(req.params.id);

// if(!tour)

// {
//     return next(new AppError(`No Tour With That ID Found` , 404)) ;
// }

// if(req.params.id * 1 > tours.length)

// {
//     return res.status(404).json({

//         status: 'Failed',

//         message: 'ID Not Found'

//     })
// }

// res.status(204).json({

//     status: 'Success',

//     data: null

// })

// }

// catch(err)

// {

//     res.status(404).json({

//         status: 'Failed',

//         message: err

//     });

// }

// });

exports.getTourStats = catchAsync(async (req, res) => {
  // try

  // {

  const stats = await Tour.aggregate([
    {
      $match: {
        ratingsAverage: { $gte: 4.5 },
      },
    },

    {
      $group: {
        _id: { $toUpper: '$difficulty' },

        numTours: { $sum: 1 },

        numRatings: { $sum: '$ratingsQuantity' },

        avgRating: { $avg: '$ratingsAverage' },

        avgPrice: { $avg: '$price' },

        minPrice: { $min: '$price' },

        maxPrice: { $max: '$price' },
      },
    },

    {
      $sort: { avgPrice: 1 },
    },
  ]);

  res.status(200).json({
    status: 'Success',

    data: {
      stats,
    },
  });

  // }

  //     catch(err)

  //     {

  //         res.status(404).json({

  //             status: 'Failed',

  //             message: err

  //         });

  //     }
});

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not An Image ! Please Upload Only Images'), false);
  }
};

const upload = multer({
  storage: multerStorage,

  fileFilter: multerFilter,
});

exports.uploadTourImages = upload.fields([
  {
    name: 'images',

    maxCount: 3,
  },

  {
    name: 'imageCover',

    maxCount: 1,
  },
]);

exports.resizeTourImages = catchAsync(async (req, res, next) => {
  if (!req.files.images || !req.files.imageCover) {
    return next();
  }

  // console.log(req.files.imageCover[0].buffer);

  const imageCoverFilename = `tour-${req.params.id}-${Date.now()}-tour.jpeg`;

  await sharp(req.files.imageCover[0].buffer)
    .resize(2000, 1333)

    .toFormat('jpeg')

    .jpeg({ quality: 90 })

    .toFile(`public/img/tours/${imageCoverFilename}`);

  req.body.imageCover = imageCoverFilename;

  req.body.images = [];

  await Promise.all(
    req.files.images.map(async (tour, i) => {
      const imageName = `tour-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;

      await sharp(tour.buffer)
        .resize(2000, 1333)

        .toFormat('jpeg')

        .jpeg({ quality: 90 })

        .toFile(`public/img/tours/${imageName}`);

      req.body.images.push(imageName);
    })
  );

  next();
});

//getting the monthly plan

exports.getMonthlyPlan = catchAsync(async (req, res) => {
  // try

  // {

  const year = req.params.year * 1; //2021

  const plan = await Tour.aggregate([
    //Stages

    {
      $unwind: '$startDates',
    },

    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),

          $lte: new Date(`${year}-12-31`),
        },
      },
    },

    {
      $group: {
        _id: {
          $month: '$startDates',
        },

        numTourStarts: {
          $sum: 1,
        },

        name: {
          $push: '$name',
        },
      },
    },

    {
      $addFields: {
        month: '$_id',
      },
    },

    {
      $project: {
        _id: 0,
      },
    },

    {
      $sort: {
        numTourStarts: -1,
      },
    },

    {
      $limit: 12,
    },
  ]);

  res.status(STATUS.OK).json({
    status: MSG.SUCCESS,

    results: await Tour.countDocuments(),

    data: {
      plan,
    },
  });

  // }

  // catch(err)

  // {

  //     res.status(404).json({

  //         status: 'Failed',

  //         message: err

  //     });

  // }
});

// '/tours-within/:distance/center/:latlng/unit/:unit'

exports.getToursWithin = catchAsync(async (req, res, next) => {
  const { distance, latlng, unit } = req.params;

  const [lat, lng] = latlng.split(',');

  if (!lat || !lng) {
    return next(
      new AppError(
        'Please Provide Latitude And Longitude In The Format lat lng',
        STATUS.BAD_REQUEST
      )
    );
  }

  const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;

  const tours = await Tour.find({
    startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  res.status(STATUS.OK).json({
    status: MSG.SUCCESS,

    results: tours.length,

    data: {
      data: tours,
    },
  });
});

exports.getDistances = catchAsync(async (req, res, next) => {
  const { latlng, unit } = req.params;

  const [lat, lng] = latlng.split(',');

  const multiplier = unit === 'mi' ? 0.000621371 : 0.001;

  if (!lat || !lng) {
    return next(
      new AppError(
        'Please Provide Latitude And  Longitude In The Format lat lng'
      )
    );
  }

  const distances = await Tour.aggregate([
    {
      $geoNear: {
        near: {
          type: 'Point',

          coordinates: [lng * 1, lat * 1],
        },

        distanceField: 'distance',

        distanceMultiplier: multiplier,
      },
    },

    {
      $project: {
        name: 1,
        distance: 1,
      },
    },
  ]);

  res.status(STATUS.OK).json({
    status: MSG.SUCCESS,

    results: distances.length,

    data: {
      data: distances,
    },
  });
});
