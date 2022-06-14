const { asyncHandler } = require("../middleware/errorMiddleware");
const service = require("../services/orderService");
const Product = require("../models/productModel");

// Crate new Order
exports.createOrder = asyncHandler(async (req, res) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    shippingCharge,
    totalPrice,
  } = req.body;

  const order = await service.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    shippingCharge,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json(order);
});

// Get Single Order
exports.getSingleOrder = asyncHandler(async (req, res) => {
  const order = await service.findById(req.params.id, "user", "name email");

  if (!order) {
    return res.status(404).json("That order is not available");
  }

  res.status(200).json(order);
});

// get logged in user orders / my order
exports.myOrders = asyncHandler(async (req, res) => {
  const orders = await service.find({ user: req.user._id });

  res.status(200).json(orders);
});

// Get all orders -- Admin
exports.getAllOrders = asyncHandler(async (req, res) => {
  const orders = await service.find();

  let totalAmount = 0;

  orders.forEach((order) => (totalAmount += order.totalPrice));

  res.status(200).json({ totalAmount, orders });
});

// update Order status -- Admin
exports.updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await service.findById(req.params.id);

  if (!order) {
    return res.status(404).json("That order is not available");
  }

  if (order.orderStatus === "Delivered") {
    return res.status(400).json("You have already delivered this order");
  }

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity);
    });
  }

  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  res.status(200).json(`Successfully changed in ${req.body.status}`);
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}

// delete Order -- Admin
exports.deleteOrder = asyncHandler(async (req, res) => {
  const order = await service.findById(req.params.id);

  if (!order) {
    return res.status(404).json("That order is not available");
  }

  await service.deleteOne({ _id: req.params.id });
  res.status(200).json(`${req.params.id} deleted successfully`);
});
