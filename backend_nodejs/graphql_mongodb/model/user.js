const mongoose = require("mongoose");

// Define Mongoose User Schema and Model
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true, min: 0 },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
