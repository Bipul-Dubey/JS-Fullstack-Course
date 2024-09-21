const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const { catchAsync } = require("./errorControllers");

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(AppError(`No document found with given id`, 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    // To allow for nested GET reviews on tour
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };

    const features = new APIFeatures(Model.find(filter), req.query)
      .sort()
      .filter()
      .pagination()
      .limitFields();

    const docs = await features.query;
    const docsCount = await Model.countDocuments();

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      data: {
        count: docsCount,
        result: docs.length,
        data: docs,
      },
    });
  });
