const User = require("../models/userModel");
const AppError = require("../utils/appError");
const sendEmails = require("../utils/email");
const { catchAsync } = require("./errorControllers");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const crypto = require("crypto");

const generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
};

const createSendToken = (user, statusCode, res) => {
  const token = generateToken(user._id);

  const cookiesOptions = {
    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    secure: false,
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    cookiesOptions.secure = true;
  }

  // send token via cookies
  res.cookie("token", token, cookiesOptions);

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user: user,
    },
  });
};

const getUserIdByToken = catchAsync(async (token) => {
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  return decoded;
});

exports.signup = catchAsync(async (req, res, next) => {
  const reqBody = req.body;
  const newUser = await User.create({
    name: reqBody.name,
    email: reqBody.email,
    password: reqBody.password,
    passwordConfirm: reqBody.passwordConfirm,
  });

  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) check if email and password in present
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  // 2) check if user exists and password is correct
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // 3) if everything ok and send token to client
  createSendToken(user, 200, res);
});

exports.protectRoutes = catchAsync(async (req, res, next) => {
  let token;
  // 1) Getting token and check if it's there
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access", 401)
    );
  }
  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }

  // 4) check if user changed password after the token was issued
  if (freshUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again.", 401)
    );
  }

  // access to routes
  req.user = freshUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // if given role not match with includes then return error
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }

    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on posted email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("There is no user with email address.", 404));
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/user/reset-password/${resetToken}`;

  const message = `Forgot your password? Submit a request with your new password and confirm password to: ${resetUrl} .\nUrl valid for 10 min`;
  try {
    await sendEmails({
      email: user.email,
      subject: "Reset your password",
      message: message,
    });

    res.status(200).json({
      status: "success",
      message: "Token sent to email",
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        "There was an error sending the email. Try again later!",
        500
      )
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) update changedPassWordAt property for the user
  // handling in model middle ware

  // 4) Log the user in, send jwt
  createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // update current logged user password
  // 1) Get iser from collection
  const user = await User.findById(req.user.id).select("+password");

  // 2) check if posted current password is correct
  if (!user.correctPassword(req.body.passwordCurrent, user.password)) {
    return next(new AppError("Your current password is wrong.", 401));
  }

  // 3) if so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  // 4) Log user in, send JWT
  createSendToken(user, 200, res);
});
