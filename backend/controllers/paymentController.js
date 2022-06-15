const { asyncHandler } = require("../middleware/errorMiddleware");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment = asyncHandler(async (req, res) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "usd",
    metadata: {
      company: "Q-Sneakers",
    },
  });

  res.status(200).json({ client_secret: myPayment.client_secret });
});

exports.sendStripeKey = asyncHandler(async (req, res) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_PUBLISHED_KEY });
});
