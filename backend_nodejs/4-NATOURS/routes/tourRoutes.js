const express = require("express");
const tourRouter = express.Router();

const {
  getAllTour,
  createNewTour,
  getTour,
  updateTour,
  deleteTour,
  getTopNTour,
  getTourStats,
  getMonthlyPlan,
} = require("../controllers/tourControllers");
const { protectRoutes, restrictTo } = require("../controllers/authControllers");
const reviewRouter = require("./reviewRoutes");

// tourRouter.param("id", checkTourIdExists);

tourRouter.use("/:tourId/reviews", reviewRouter);

tourRouter.use(protectRoutes);
// to tour
tourRouter.route("/top-cheap-tours").get(getTopNTour, getAllTour);
tourRouter.route("/tour-stats").get(getTourStats);
tourRouter.route("/monthly-plan/:year").get(getMonthlyPlan);

tourRouter.route("/").get(getAllTour).post(createNewTour);
// .post(validateCreateTourPayload, createNewTour);
tourRouter
  .route("/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(restrictTo("admin", "lead-guide"), deleteTour);

module.exports = tourRouter;
