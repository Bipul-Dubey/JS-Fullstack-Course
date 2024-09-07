const Tour = require("../models/tourModel");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const { catchAsync } = require("./errorControllers");

// ========  loading data ==========
// const tourDataFileName = `${__dirname}/../dev-data/data/tours-simple.json`;
// const tours = JSON.parse(fs.readFileSync(tourDataFileName));

// exports.checkTourIdExists = (req, res, next, value) => {
//   const tour = tours?.find((tr) => tr.id == value);
//   if (!tour) {
//     res.status(400).json({
//       status: "failed",
//       message: "Tour not exists with given id",
//     });
//     return;
//   }
//   next();
// };

// exports.validateCreateTourPayload = (req, res, next) => {
//   const payload = req.body;
//   if (!payload?.name) {
//     res.status(400).json({
//       status: "failed",
//       message: "Required Name in payload is empty",
//     });
//   } else if (!payload?.price) {
//     res.status(400).json({
//       status: "failed",
//       message: "Required Price in payload is empty",
//     });
//   } else {
//     next();
//   }
// };

exports.getTopNTour = async (req, res, next) => {
  if (!req.query.limit) {
    req.query.limit = "50";
  }
  req.query.sort = "-ratingsAverage,price";
  req.query.fields = "name,price,ratingsAverage,summary,difficulty";
  next();
};

exports.getAllTour = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Tour.find(), req.query)
    .sort()
    .filter()
    .pagination()
    .limitFields();

  const tours = await features.query;
  const allTour = await Tour.countDocuments();

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    data: {
      count: allTour,
      result: tours.length,
      tours: tours,
    },
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);

  if (!tour) {
    return next(
      new AppError(`No tour found with given id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    status: "success",
    data: {
      tour: tour,
    },
  });
});

exports.createNewTour = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      tour: newTour,
      id: newTour._id,
    },
  });
});

exports.updateTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      tour: tour,
    },
  });
});

exports.deleteTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndDelete(req.params.id);

  if (!tour) {
    return AppError(`No tour found with given id: ${req.params.id}`);
  }

  res.status(200).json({
    status: "success",
    data: {
      id: tour._id,
    },
  });
});

exports.getTourStats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        _id: "$difficulty",
        numTours: { $sum: 1 },
        numRatings: { $sum: "$ratingsQuantity" },
        avgRating: { $avg: "$ratingsAverage" },
        avgPrice: { $avg: "$price" },
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" },
      },
    },
    { $sort: { avgPrice: 1 } },
  ]);

  res.status(200).json({
    status: "success",
    data: {
      stats: stats,
    },
  });
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;

  const plan = await Tour.aggregate([
    {
      $unwind: "$startDates",
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
        _id: { $month: `$startDates` },
        numTourStarts: { $sum: 1 },
        tours: { $push: "$name" },
      },
    },
    {
      $addFields: { month: `$_id` }, // show month key with id value - id is month number here
    },
    {
      $project: {
        _id: 0, // not show _id key in response
      },
    },
    {
      $sort: { numTourStarts: -1 }, // 1 for ascending and -1 for descending order
    },
    // {
    //   $limit: 6, // limit the response
    // },
  ]);

  res.status(200).json({
    status: "success",
    data: {
      result: plan?.length,
      plan,
    },
  });
});
