const express = require("express");
const tourRouter = express.Router();

const {
  getAllTour,
  createNewTour,
  getTour,
  updateTour,
  deleteTour,
} = require("../controllers/tourControllers");

// tourRouter.param("id", checkTourIdExists);

tourRouter.route("/").get(getAllTour).post(createNewTour);
// .post(validateCreateTourPayload, createNewTour);
tourRouter.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

module.exports = tourRouter;
