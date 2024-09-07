const express = require("express");
const app = express();
const AppError = require("./utils/appError");
const { globalErrorMiddleware } = require("./controllers/errorControllers");
const { fileLogger } = require("./utils/logger");
// === middlewares ===
app.use(express.json());

// === serving static files ===
app.use(express.static(`${__dirname}/public`));

// == log api call ==
app.use((req, res, next) => {
  const logDetails = `
    Date: ${new Date().toLocaleString()}
    Host/IP: ${req.ip}
    Method: ${req.method}
    Pathname: ${req.originalUrl}
    body: ${JSON.stringify(req.body)}
  `;

  // Log the details to logs.txt
  fileLogger(logDetails);
  next();
});

//  ====== routing ========
const userRouter = require("./routes/userRoutes");
const tourRouter = require("./routes/tourRoutes");

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

// ==== return when no route handler match all above ====
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// ===== error handling: we handling try and catch in each function =====
app.use(globalErrorMiddleware);

module.exports = app;
