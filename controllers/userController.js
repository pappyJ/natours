const User = require('./../Models/userModel');

const catchAsync = require('./../utils/catchAsync');

const AppError = require('./../utils/appError.js');

const factory = require('./factoryHandler');

const { MSG, STATUS } = require('../shared/constants/responseConstants');

const multer = require('multer');

const sharp = require('sharp');

// const multerStorage = multer.diskStorage({

//     destination : (req , file , cb) =>

//     {

//         cb(null , 'public/img/users');

//     },

//     filename : (req , file , cb) =>

//     {
//         const ext = file.mimetype.split('/')[1];

//         cb(null , `user-${req.user.id}-${Date.now()}.${ext}`);
//     }

// })

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(
      new AppError(
        'Not An Image ! Please Upload Only Images',
        STATUS.BAD_REQUEST
      ),
      false
    );
  }
};

const upload = multer({
  storage: multerStorage,

  fileFilter: multerFilter,
});

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)

    .toFormat('jpeg')

    .jpeg({ quality: 90 })

    .toFile(`public/img/users/${req.file.filename}`);

  next();
});

exports.uploadUserData = upload.single('photo');

const filterRequest = (obj, ...valid) => {
  const newObj = {};

  Object.keys(obj).forEach((el) => {
    if (valid.includes(el)) {
      newObj[el] = obj[el];
    }
  });

  return newObj;
};

//THe User Routes

// exports.getAllUsers = catchAsync(async (req , res) => {

//     const user = await User.find();

//     res.status(200).json({

//         status: 'Success',

//         results: user.length,

//         user

//     })

// });

// exports.getUser = (req , res) => {

//     res.status(500).json({

//         status: 'error',

//         message: 'This Route Is Not Yet Defined'

//     })

// }

exports.createUser = (req, res) => {
  res.status(STATUS.INTERNAL_SERVER_ERROR).json({
    status: MSG.ERROR,

    message: 'This Route Is Not Yet Defined Use /SignUp Instead',
  });
};

//using the factory functions

exports.getAllUsers = factory.getAll(User);

exports.getUser = factory.getOne(User);

exports.updateUser = factory.updateOne(User);

exports.deleteUser = factory.deleteOne(User);

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This Route Is Not For Password Updates . Please Use /updatePassword',
        STATUS.BAD_REQUEST
      )
    );
  }

  const filterdOptions = filterRequest(req.body, 'name', 'email');

  if (req.file) {
    filterdOptions.photo = req.file.filename;
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    filterdOptions,
    {
      new: true,

      runValidators: true,
    }
  );

  res.status(STATUS.OK).json({
    status: 'success',

    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(STATUS.NO_CONTENT).json({
    status: MSG.SUCCESS,

    data: null,
  });
});

exports.getMe = catchAsync(async (req, res, next) => {
  req.params.id = req.user.id;

  next();
});
