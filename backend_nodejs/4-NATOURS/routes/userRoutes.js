const express = require("express");
const userRouter = express.Router();

const {
  getAllUser,
  createNewUser,
  getUser,
  updateUser,
  deleteUser,
  updateCurrentUser,
  deleteCurrentUser,
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
userRouter.route("/update-current-user").patch(updateCurrentUser);
userRouter.route("/delete-current-user").delete(deleteCurrentUser);

userRouter.route("/").get(getAllUser);
userRouter
  .route("/:id")
  .get(getUser)
  .patch(updateUser)
  .delete(restrictTo("admin"), deleteUser);

module.exports = userRouter;
