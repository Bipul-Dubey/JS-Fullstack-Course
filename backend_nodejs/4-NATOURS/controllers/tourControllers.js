const fs = require("fs");

// ========  loading data ==========
const tourDataFileName = `${__dirname}/../dev-data/data/tours-simple.json`;
const tours = JSON.parse(fs.readFileSync(tourDataFileName));

// exports.checkTourIdExists = (req, res, next, value) => {
//   const tour = tours?.find((tr) => tr.id == value);
//   if (!tour) {
//     res.status(400).json({
//       status: "failed",
//       message: "Tour not exists with given id",
//     });
//     return;
//   }
//   next();
// };

// exports.validateCreateTourPayload = (req, res, next) => {
//   const payload = req.body;
//   if (!payload?.name) {
//     res.status(400).json({
//       status: "failed",
//       message: "Required Name in payload is empty",
//     });
//   } else if (!payload?.price) {
//     res.status(400).json({
//       status: "failed",
//       message: "Required Price in payload is empty",
//     });
//   } else {
//     next();
//   }
// };

exports.getAllTour = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      tours: tours,
      count: tours?.length,
    },
  });
};

exports.getTour = (req, res) => {
  // :id -> manadatory
  // :y -> optional

  const tour = tours?.find((tr) => tr.id == req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      tour: tour,
    },
  });
};

exports.createNewTour = (req, res) => {
  const newId = tours?.at(-1)?.id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(tourDataFileName, JSON.stringify(tours), (err) => {
    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
        tour_id: newId,
      },
    });
  });
};

exports.updateTour = (req, res) => {
  const tourIndex = tours.findIndex((tr) => tr.id == req.params.id);

  const updatedTour = { ...tours[tourIndex], ...req.body };
  tours[tourIndex] = updatedTour;

  res.status(200).json({
    status: "success",
    data: {
      tour: updatedTour,
    },
  });
};

exports.deleteTour = (req, res) => {
  const tourIndex = tours.findIndex((tr) => tr.id == req.params.id);

  const updatedTour = tours?.filter((tr) => tr.id != req.params.id);
  fs.writeFile(tourDataFileName, JSON.stringify(updatedTour), (err) => {
    res.status(200).json({
      status: "success",
      message: `${req.params.id} Deleted successfully!`,
    });
  });
};
