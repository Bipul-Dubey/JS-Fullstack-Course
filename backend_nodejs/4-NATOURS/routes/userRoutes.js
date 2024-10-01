const express = require("express");
const userRouter = express.Router();

const {
  getAllUser,
  deleteUser,
  updateCurrentUser,
  deleteCurrentUser,
  uploadUserPhoto,
  getUser,
  resizeUserPhoto,
} = require("../controllers/userControllers");
const {
  signup,
  login,
  resetPassword,
  forgotPassword,
  updatePassword,
  protectRoutes,
  restrictTo,
} = require("../controllers/authControllers");

userRouter.route("/signup").post(signup);
userRouter.route("/login").post(login);
userRouter.route("/forgot-password").post(forgotPassword);
userRouter.route("/reset-password/:token").patch(resetPassword);

userRouter.use(protectRoutes);

userRouter.route("/reset-my-password").patch(updatePassword);
userRouter
  .route("/update-current-user")
  .patch(uploadUserPhoto, resizeUserPhoto, updateCurrentUser);
userRouter.route("/delete-current-user").delete(deleteCurrentUser);

userRouter.route("/").get(getAllUser);
userRouter.route("/:id").get(getUser).delete(restrictTo("admin"), deleteUser);

module.exports = userRouter;
