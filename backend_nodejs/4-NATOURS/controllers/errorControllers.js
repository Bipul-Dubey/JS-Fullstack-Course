const AppError = require("../utils/appError");
const { fileLogger } = require("../utils/logger");

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client

  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    // Programming or other unknown error: don't leak error details
  } else {
    // 1: log to file so that we can find error
    const logDetails = `Error 💥💥💥: ${err} : 💥💥💥`;
    fileLogger(logDetails);

    // 2: Send generic message
    res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }
};

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDb = (err) => {
  const value = err.errorResponse.errmsg.match(/(["'])(\\?.)*?\1/)[0];

  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDb = (err) => {
  const errors = Object.values(err.errors).map((er) => er.message);
  const message = `Invalid input data: ${errors.join(", ")}`;
  return new AppError(message, 400);
};

exports.globalErrorMiddleware = (err, req, res, next) => {
  // console.log(err.stack); // trace error in call stack

  // read error status code
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV.trim() == "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV.trim() == "production") {
    let error = { ...err };

    if (err.name === "CastError") error = handleCastErrorDB(error);
    if (err.code === 11000) error = handleDuplicateFieldsDb(error);
    if (err.name === "ValidationError") error = handleValidationErrorDb(error);

    sendErrorProd(error, res);
  }
};

// async error handler
exports.catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
