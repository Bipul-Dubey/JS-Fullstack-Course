const sharp = require("sharp");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const { catchAsync } = require("./errorControllers");
const { deleteOne, getAll } = require("./handlerFactory");
const fs = require("fs");

const multer = require("multer");

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const dir = "public/images";

//     if (!fs.existsSync(dir)) {
//       fs.mkdirSync(dir, { recursive: true });
//     }

//     cb(null, dir);
//   },
//   filename: (req, file, cb) => {
//     // user-{userId}-timestamp.jpeg
//     const ext = file.mimetype.split("/")[1];
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//   },
// });

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadUserPhoto = upload.single("photo");

exports.resizeUserPhoto = (req, file, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`; // because it is always jpeg

  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/images/${req.file.filename}`);
  next();
};

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

exports.getAllUser = getAll(User);

exports.deleteUser = deleteOne(User);

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({
    status: "success",
    data: {
      user: user,
    },
  });
});

exports.updateCurrentUser = catchAsync(async (req, res, next) => {
  // current loggged in user can only update itself
  console.log("res", req.file);

  // 1) create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates use: /forgot-password and /reset-password/:token",
        400
      )
    );
  }

  // 2) filtered out data (key) which is not allowed to update
  const filteredBody = filterObj(req.body, "name", "email");
  if (req.file) filteredBody.photo = req.file.filename;

  // 3) update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    message: "User updated Successfully",
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteCurrentUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user.id, { isActive: false });

  // we send 204 - No content will display on API response
  res.status(204).json({
    status: "success",
    message: "User deleted Successfully",
    data: null,
  });
});
