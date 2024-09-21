const mongoose = require("mongoose");

const tourSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tour name must not be empty"],
      unique: [true, "Tour name must not be unique"],
      maxlength: [40, "A tour name must have less or equal than 40 character"],
      minlength: [10, "A tour name must have more or equal than 10 character"],
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
      enum: {
        // this is only for string
        values: ["easy", "medium", "difficult"],
        message: "Difficulty is either: easy, medium,difficult",
      },
    },
    ratingsAverage: {
      type: Number,
      default: 0.0,
      min: [1, "Rating must more or equal to 1.0"],
      max: [5, "Rating must less or equal to 5.0"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0.0,
    },
    price: {
      type: Number,
      required: [true, "Tour price must not be empty"],
    },
    priceDiscount: {
      type: Number,
      validate: {
        message: "Discount price ({VALUE}) must be less then price",
        validator: function (val) {
          // this only points to current doc when we are creating not while updating
          return val < this.price;
        },
      },
    },
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
    startDates: [Date],
    startLocation: {
      // GeoJSON
      type: {
        type: String,
        default: "Point",
        enum: ["Point"],
        message: "Type can be 'Point' only",
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    locations: [
      {
        type: {
          type: String,
          default: "Point",
          enum: ["Point"],
          message: "Type can be 'Point' only",
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number,
      },
    ],
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// implementing indexing
tourSchema.index({
  price: 1, // column to set as index
});

// virtual property - this is present only when get method is called and
// we cannot perform any calculation on this in BE
tourSchema.virtual("durationWeeks").get(function () {
  return this.duration / 7;
});

// virtual populate
tourSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "tour",
  localField: "_id",
});

tourSchema.pre(/^find/, function (next) {
  this.populate({
    path: "guides",
    select: "-__v -createdAt -updatedAt -passwordChangedAt",
  });
  next();
});

// Document middleware: runs before the .save() and .create(), not on insertMany
/* tourSchema.pre("save", function (next) {
  console.log("this in save", this);
  next();
}); */

/* tourSchema.post("save", function (doc, next) {
  console.log("this in post save", doc);
  next();
});
 */

// Query middleware: its run when any find query is executed
// tourSchema.pre("find", function (next) {
/* tourSchema.pre(/^find/, function (next) {
  console.log("find query executed");
  next();
}); */

// Agregation middleware: its run before and after any aggregation happen
/* tourSchema.pre("aggregate", function (next) {
  console.log("aggregation is happend");
  next();
}); */

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;

/* 
Like node js, mongoose is also have middleware, Types:
- Documents Middleware
- Query Middleware
- Aggregate Middleware
- Model Middleware
*/
