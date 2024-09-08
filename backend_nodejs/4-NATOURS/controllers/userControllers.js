const User = require("../models/userModel");
const { catchAsync } = require("./errorControllers");

exports.getAllUser = catchAsync(async (req, res) => {
  const users = User.find();
  const count = await User.countDocuments();

  res.status(500).json({
    status: "error",
    count,
    results: users.length,
    users,
  });
});

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

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "route not defined",
  });
};
