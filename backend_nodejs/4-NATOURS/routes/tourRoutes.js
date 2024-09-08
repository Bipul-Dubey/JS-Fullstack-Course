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
const { protectRoutes } = require("../controllers/authControllers");

// tourRouter.param("id", checkTourIdExists);

// to tour
tourRouter.route("/top-cheap-tours").get(getTopNTour, getAllTour);
tourRouter.route("/tour-stats").get(getTourStats);
tourRouter.route("/monthly-plan/:year").get(getMonthlyPlan);

tourRouter.route("/").get(protectRoutes, getAllTour).post(createNewTour);
// .post(validateCreateTourPayload, createNewTour);
tourRouter.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

module.exports = tourRouter;
