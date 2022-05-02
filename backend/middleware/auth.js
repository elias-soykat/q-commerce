const { asyncHandler } = require("./errorMiddleware");
const jwt = require("jsonwebtoken");
const service = require("../services/userService");

exports.isAuthenticated = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json("Please login to access this resource");
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await service.findById(decodedData.id, "-");

  next();
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json(`Role: ${req.user.role} is not allowed to access this resource`);
    }

    next();
  };
};
