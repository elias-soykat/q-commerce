const express = require("express");
const {
  createOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");
const { isAuthenticated, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/order/create").post(isAuthenticated, createOrder);

// get logged in user order / my order
router.route("/orders/user").get(isAuthenticated, myOrders);

router.route("/order/:id").get(isAuthenticated, getSingleOrder);

router
  .route("/admin/orders")
  .get(isAuthenticated, authorizeRoles("admin"), getAllOrders);

router
  .route("/admin/order/:id")
  .put(isAuthenticated, authorizeRoles("admin"), updateOrderStatus)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteOrder);

module.exports = router;
