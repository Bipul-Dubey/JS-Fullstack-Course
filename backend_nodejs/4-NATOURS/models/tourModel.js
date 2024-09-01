const mongoose = require("mongoose");

const tourSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tour name must not be empty"],
      unique: [true, "Tour name must not be unique"],
    },
    duration: {
      type: Number,
      required: [true, "A tour must have a duration"],
    },
    maxGroupSize: {
      type: Number,
      required: [true, "A tour must have a group size"],
    },
    difficulty: {
      type: String,
      required: [true, "A tour must have a difficulty"],
    },
    ratingsAverage: {
      type: Number,
      default: 0.0,
    },
    ratingsQuantity: {
      type: Number,
      default: 0.0,
    },
    price: {
      type: Number,
      required: [true, "Tour price must not be empty"],
    },
    priceDiscount: Number,
    summary: {
      type: String,
      trim: true, // remove all white space from start and end
      required: [true, "A tour must have a description"],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, "A tour must have a cover image"],
    },
    images: [String],
    startDate: [Date],
  },
  {
    timestamps: true,
  }
);

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
