const express = require("express");

const {
  registerUser,
  loginUser,
  logoutUser,
  forgetPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateUserProfile,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");
const { isAuthenticated, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

// me
router.route("/user").get(isAuthenticated, getUserDetails);

router
  .route("/admin/users")
  .get(isAuthenticated, authorizeRoles("admin"), getAllUsers);

router
  .route("/admin/user/:id")
  .get(isAuthenticated, authorizeRoles("admin"), getSingleUser)
  .put(isAuthenticated, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteUser);

// Update user story
router.route("/password/forget").post(forgetPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/password/update").put(isAuthenticated, updatePassword);

router.route("/user/update").put(isAuthenticated, updateUserProfile);

router.route("/logout").get(logoutUser);

module.exports = router;
