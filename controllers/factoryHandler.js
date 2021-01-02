const catchAsync = require('./../utils/catchAsync');

const { MSG, STATUS } = require('../shared/constants/responseConstants');

const AppError = require('./../utils/appError');

const APIFeatures = require('./../utils/apiFeaures');

//end of importing functions

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(
        new AppError(`No Document With That ID Found`, STATUS.NOT_FOUND)
      );
    }

    res.status(STATUS.NO_CONTENT).json({
      status: MSG.SUCCESS,

      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(
      req.params.id,
      req.body,

      { new: true, runValidators: true }
    );

    if (!doc) {
      return next(new AppError(`No Document With That ID Found`, 404));
    }

    res.status(STATUS.OK).json({
      status: MSG.SUCCESS,

      data: {
        data: doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(STATUS.CREATED).json({
      status: MSG.SUCCESS,

      data: {
        data: doc,
      },
    });
  });

exports.getOne = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    const query = Model.findById(req.params.id);

    if (populateOptions) {
      query = query.populate(populateOptions);
    }

    const doc = await query;

    if (!doc) {
      return next(
        new AppError(`No Document With That ID Found`, STATUS.NOT_FOUND)
      );
    }

    res.status(STATUS.OK).json({
      status: MSG.SUCCESS,

      data: {
        data: doc,
      },
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const filter = {};

    if (req.params.tourId) {
      filter = { tour: req.params.tourId };
    }

    const features = new APIFeatures(Model.find(filter), req.query)

      .filter()

      .sort()

      .limitFields()

      .Pagination();

    const doc = await features.query;

    // const doc = await features.query.explain();

    res.status(STATUS.OK).json({
      status: MSG.SUCCESS,

      results: doc.length,

      requestedAt: req.requestTime,

      data: {
        data: doc,
      },
    });
  });
