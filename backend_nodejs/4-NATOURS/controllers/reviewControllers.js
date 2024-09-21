const Review = require("../models/reviewModel");
const { catchAsync } = require("./errorControllers");
const { deleteOne, getAll } = require("./handlerFactory");

exports.getAllReviews = getAll(Review);

exports.createReviews = catchAsync(async (req, res, next) => {
  // allow nested route
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;

  const newReview = await Review.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      review: newReview,
    },
  });
});

exports.deleteReview = deleteOne(Review);
