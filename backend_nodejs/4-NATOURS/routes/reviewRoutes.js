const express = require("express");
const {
  getAllReviews,
  createReviews,
  deleteReview,
} = require("../controllers/reviewControllers");
const { restrictTo, protectRoutes } = require("../controllers/authControllers");

const reviewRouter = express.Router({ mergeParams: true });

reviewRouter.use(protectRoutes);

reviewRouter
  .route("/")
  .get(getAllReviews)
  .post(restrictTo("user"), createReviews);

reviewRouter.route("/:id").delete(restrictTo("user", "admin"), deleteReview);

module.exports = reviewRouter;
