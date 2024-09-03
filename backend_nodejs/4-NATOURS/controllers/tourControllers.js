const Tour = require("../models/tourModel");
const APIFeatures = require("../utils/apiFeatures");

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

exports.getAllTour = async (req, res) => {
  try {
    // // 1. Filtering
    // const queryObj = { ...req.query };
    // const excludedFields = ["page", "sort", "limit", "fields"];
    // excludedFields.forEach((el) => delete queryObj[el]);

    // // const tours = await Tour.find().where("duration").equals(query.duration);

    // // 2. Advance filtering
    // let queryStr = JSON.stringify(queryObj);
    // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // let query = Tour.find(JSON.parse(queryStr));

    // 3. Sorting
    // if (req.query.sort) {
    //   const sortBy = req.query.sort.split(",").join(" ");
    //   query = query.sort(sortBy);
    // } else {
    //   query = query.sort("-createdAt");
    // }

    // 4. Field limiting
    // if (req.query.fields) {
    //   const fields = req.query.fields.split(",").join(" ");
    //   query = query.select(fields);
    // } else {
    //   query = query.select("-__v");
    // }

    // 5. Pagination
    // const page = req.query.page || 1;
    // const limit = req.query.limit;
    // if (page && limit) {
    //   const skip = (page - 1) * limit;
    //   query = query.skip(skip).limit(limit);
    // }

    // Execute query
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
  } catch (error) {
    res.status(404).json({
      status: "fail",
      data: null,
      error: error,
    });
  }
};

exports.getTour = async (req, res) => {
  // :id -> manadatory
  // :y -> optional

  // const tour = tours?.find((tr) => tr.id == req.params.id);
  // res.status(200).json({
  //   status: "success",
  //   data: {
  //     tour: tour,
  //   },
  // });

  try {
    const tour = await Tour.findById(req.params.id);
    // Tour.findOne({_id: req.params.id})
    res.status(200).json({
      status: "success",
      data: {
        tour: tour,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      data: null,
      error: error,
    });
  }
};

exports.createNewTour = async (req, res) => {
  //  ==== text file ====
  // const newId = tours?.at(-1)?.id + 1;
  // const newTour = Object.assign({ id: newId }, req.body);
  // tours.push(newTour);
  // fs.writeFile(tourDataFileName, JSON.stringify(tours), (err) => {
  //   res.status(201).json({
  //     status: "success",
  //     data: {
  //       tour: newTour,
  //       tour_id: newId,
  //     },
  //   });
  // });
  // ==== db ====
  // Method 1
  // const newTour = new Tour({});
  // newTour.save();

  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
        id: newTour._id,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      data: null,
      error: error,
    });
  }
};

exports.updateTour = async (req, res) => {
  // const tourIndex = tours.findIndex((tr) => tr.id == req.params.id);

  // const updatedTour = { ...tours[tourIndex], ...req.body };
  // tours[tourIndex] = updatedTour;

  // res.status(200).json({
  //   status: "success",
  //   data: {
  //     tour: updatedTour,
  //   },
  // });

  try {
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
  } catch (error) {
    res.status(404).json({
      status: "fail",
      data: null,
      error: error,
    });
  }
};

exports.deleteTour = async (req, res) => {
  // const tourIndex = tours.findIndex((tr) => tr.id == req.params.id);
  // const updatedTour = tours?.filter((tr) => tr.id != req.params.id);
  // fs.writeFile(tourDataFileName, JSON.stringify(updatedTour), (err) => {
  //   res.status(200).json({
  //     status: "success",
  //     message: `${req.params.id} Deleted successfully!`,
  //   });
  // });

  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        id: tour._id,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      data: null,
      error: error,
    });
  }
};

exports.getTourStats = async (req, res) => {
  try {
    // we can also repeat stages
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
  } catch (error) {
    res.status(404).json({
      status: "fail",
      error: error,
    });
  }
};

exports.getMonthlyPlan = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(404).json({
      status: "fail",
      error,
    });
  }
};
