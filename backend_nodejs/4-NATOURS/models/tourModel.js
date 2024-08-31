const mongoose = require("mongoose");

const tourSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Tour name must not be empty"],
    unique: [true, "Tour name must not be unique"],
  },
  price: {
    type: Number,
    required: [true, "Tour price must not be empty"],
  },
  rating: {
    type: Number,
    default: 0.0,
  },
});

const Tour = mongoose.model("Tour", tourSchema);
