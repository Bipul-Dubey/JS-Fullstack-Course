const express = require("express");
const userRouter = express.Router();

const {
  getAllUser,
  createNewUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userControllers");
const { signup, login } = require("../controllers/authControllers");

userRouter.route("/signup").post(signup);
userRouter.route("/login").post(login);

userRouter.route("/").get(getAllUser).post(createNewUser);
userRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = userRouter;
