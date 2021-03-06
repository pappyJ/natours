const AppError = require('./../utils/appError');

const Tour = require('./../Models/tourModel');

const User = require('./../Models/userModel');

const { MSG, STATUS } = require('../shared/constants/responseConstants');

const catchAsync = require('./../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();

  res.status(STATUS.OK).render(
    'overview',

    {
      title: 'All Tours',

      tours,
    }
  );
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',

    fields: 'review rating user',
  });

  if (!tour) {
    return next(
      new AppError('There Is No Tour With That Name', STATUS.NOT_FOUND)
    );
  }

  res.status(STATUS.OK).render(
    'tour',

    {
      title: `${tour.name} Tour`,

      tour,
    }
  );
});

exports.login = (req, res) => {
  res.status(STATUS.OK).render('login', {
    title: 'Natours Login',
  });
};

exports.getAccount = (req, res) => {
  res.status(STATUS.OK).render(
    'account',

    {
      title: 'Your Account',
    }
  );
};

exports.updateUserData = async (req, res, next) => {
  const newUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,

      email: req.body.email,
    },

    {
      new: true,

      runValidators: true,
    }
  );

  res.status(STATUS.OK).render(
    'account',

    {
      title: 'Your Account',

      user: newUser,
    }
  );
};

exports.signUp = catchAsync(async (req, res, next) => {
  res.status(STATUS.OK).render('signUp', {
    title: 'Natours signUp',
  });
});
