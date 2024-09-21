const express = require("express");
const router = express.Router();

const tourRouter = require("./tourRoutes");
const userRouter = require("./userRoutes");
const reviewRouter = require("./reviewRoutes");

router.use("/tours", tourRouter);
router.use("/users", userRouter);
router.use("/reviews", reviewRouter);

module.exports = router;
