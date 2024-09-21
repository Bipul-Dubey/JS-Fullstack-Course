const User = require("../models/userModel");
const AppError = require("../utils/appError");
const { catchAsync } = require("./errorControllers");
const { deleteOne, getAll } = require("./handlerFactory");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

exports.getAllUser = getAll(User);

exports.createNewUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "route not defined",
  });
};

exports.getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "route not defined",
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "route not defined",
  });
};

exports.deleteUser = deleteOne(User);

exports.updateCurrentUser = catchAsync(async (req, res, next) => {
  // current loggged in user can only update itself
  // 1) create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates use: /forgot-password and /reset-password/:token",
        400
      )
    );
  }

  // 2) filtered out data (key) which is not allowed to update
  const filteredBody = filterObj(req.body, "name", "email");

  // 3) update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    message: "User updated Successfully",
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteCurrentUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user.id, { isActive: false });

  // we send 204 - No content will display on API response
  res.status(204).json({
    status: "success",
    message: "User deleted Successfully",
    data: null,
  });
});
