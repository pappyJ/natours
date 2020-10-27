// start of third party modules

const path = require('path');

const express = require('express');

const morgan = require('morgan');

const AppError = require('./utils/appError');

const globalErrorHandler = require('./controllers/errorController');

const rateLimit = require('express-rate-limit');

const helmet = require('helmet');

const xss = require('xss-clean');

const hpp = require('hpp');

const mongoSanitize = require('express-mongo-sanitize');

const cookieParser = require('cookie-parser');

const app = express();

//setting the views

app.set('view engine', 'pug');

app.set('views', path.join(__dirname, 'views'));

//setting http headers

app.use(helmet());

//using the cookie parser to grab cookies

app.use(cookieParser());

//setting the body parsers

app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use(express.json({ limit: '10kb' }));

//sanitizing the user data

app.use(mongoSanitize());

//blocking crross site script attacks

app.use(xss());

//blocking parameter pollution

app.use(
  hpp({
    whitelist: [
      'duration',

      'ratingsQuantity',

      'ratingsAverage',

      'maxGroupSize',

      'difficulty',

      'price',
    ],
  })
);

const limit = {
  max: 100,

  windowMs: 60 * 60 * 1000,

  message: 'Too Much Request From This Api , Try Again In The Next One Hour',
};

const limitUser = {
  max: 10,

  windowMs: 60 * 60 * 1000,

  message:
    'Too Much Login Attempts From This Device , Try Again In The Next One Hour',
};

//setting the rate limiters

app.use('/api/v1/users/login', rateLimit(limitUser));

app.use('/api/v1/tours', rateLimit(limit));

//using the morgan logger

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));

  // console.log('Haaa')
}

// app.use(morgan('dev'))

// console.log(app.get('env'))

app.use(express.static(`${__dirname}/public`));

const userRouter = require('./routes/userRoutes');

const tourRouter = require('./routes/tourRoutes');

const reviewRouter = require('./routes/reviewRoutes');

const viewRouter = require('./routes/viewRoutes');

//end of requiring third party modules

//Middlewares

// view router

app.use('/', viewRouter);

//user router
app.use('/api/v1/users', userRouter);

//tour router

app.use('/api/v1/tours', tourRouter);

//review router

app.use('/api/v1/reviews', reviewRouter);

// app.use((req , res , next) => {

//     // console.log('Hello From THe Middleware....');

//     req.requestTime = new Date().toISOString();

//     next();

// })

// app.post('/' , (req , res) => {

//     res.status(200).send('You Can Post To This Endpoint');

// })

//handling invalid routes

app.all('*', (req, res, next) => {
  // res.status(404).json({

  //     status: 'Failed',

  //     message: `Can't Find ${req.originalUrl} On THis Server`

  // })

  const err = new AppError(`Can't Find ${req.originalUrl} On This Server`, 404);

  // err.statusCode = 404;

  // err.status = 'Failed';

  next(err);
});

app.use(globalErrorHandler);

module.exports = app;
