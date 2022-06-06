const express = require("express");
const {
  processPayment,
  sendStripeKey,
} = require("../controllers/paymentController");
const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();

router.route("/payment/process").post(isAuthenticated, processPayment);

router.route("/stripeapikey").get(sendStripeKey);

module.exports = router;
