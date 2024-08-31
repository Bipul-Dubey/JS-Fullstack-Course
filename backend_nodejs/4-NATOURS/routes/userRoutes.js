const express = require("express");
const userRouter = express.Router();

const {
  getAllUser,
  createNewUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userControllers");

userRouter.route("/").get(getAllUser).post(createNewUser);
userRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = userRouter;
