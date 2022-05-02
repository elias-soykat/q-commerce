const crypto = require("crypto");
const cloudinary = require("cloudinary");
const { asyncHandler } = require("../middleware/errorMiddleware");
const service = require("../services/userService");
const sendEmail = require("../utils/sendEmail");
const sendToken = require("../utils/sendToken");

// Register a User
exports.registerUser = asyncHandler(async (req, res) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json("Please enter the required field");
  }

  const user = await service.create({
    name,
    email,
    password,
    avatar: { public_id: myCloud.public_id, url: myCloud.secure_url },
  });

  sendToken(user, 201, res);
});

// Login a User
exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json("Please enter email & password");
  }

  const user = await service.findOne({ email });

  if (!user) {
    return res.status(401).json("Invalid email or password");
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return res.status(401).json("Invalid email or password");
  }

  sendToken(user, 200, res);
});

// Logout User
exports.logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json("Logged out!");
});

// Forget Password
exports.forgetPassword = asyncHandler(async (req, res) => {
  const user = await service.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).json("User not found");
  }

  // Get Reset Password Token
  const resetPassword = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetPassword}`;

  const message = `Hello, \n\n Follow this link to reset your Q-Commerce password for your ${user.email} account. \n\n ${resetPasswordUrl} \n\nIf you didn’t ask to reset your password, you can ignore this email.\n\nThanks. \n\n Your Q-Commerce Team`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Q-Commerce Password Recovery",
      message,
    });

    res.status(200).json({
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return res.status(500).json(err.message);
  }
});

// Reset Password
exports.resetPassword = asyncHandler(async (req, res) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await service.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json("Reset password token invalid or expired!");
  }

  if (req.body.password !== req.body.confirmPassword) {
    return res.status(400).json("Confirm password does not match");
  }

  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  sendToken(user, 200, res);
});

// Get User Details
exports.getUserDetails = asyncHandler(async (req, res) => {
  const user = await service.findById(req.user.id, "-");

  res.status(200).json(user);
});

// Update Password
exports.updatePassword = asyncHandler(async (req, res) => {
  const user = await service.findById(req.user.id, "+");

  const isPasswordMatched = await user.comparePassword(req.body.password);

  if (!isPasswordMatched) {
    return res.status(400).json("Old password is incorrect!");
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return res.status(400).json("Password does not match!");
  }

  user.password = await req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

// Update User Profile
exports.updateUserProfile = asyncHandler(async (req, res) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  // We will add cloudberry latter
  const user = await service.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
  });

  res.status(200).json(user);
});

// Get all Users -- Admin
exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await service.find();

  res.status(200).json(users);
});

// Get Single user -- Admin
exports.getSingleUser = asyncHandler(async (req, res) => {
  const user = await service.findById(req.params.id, "-");

  if (!user) {
    return res.status(404).json("That user is not available");
  }

  res.status(200).json(user);
});

// Update User Role -- Admin
exports.updateUserRole = asyncHandler(async (req, res) => {
  const newUserData = {
    role: req.body.role,
  };

  const user = await service.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
  });

  if (!user) {
    return res.status(404).json("That user is not available");
  }

  res.status(200).json(user);
});

// Delete User -- Admin
exports.deleteUser = asyncHandler(async (req, res) => {
  const user = await service.findById(req.params.id);
  // We will remove cloudberry latter

  if (!user) {
    return res.status(404).json("That user is not available");
  }

  await service.deleteOne({ _id: req.params.id });
  res.status(200).json(`${req.params.id} deleted successfully`);
});
