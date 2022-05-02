const Order = require("../models/orderModel");

exports.create = async (body) => {
  try {
    return await Order.create(body);
  } catch (err) {
    throw new Error(err);
  }
};

exports.find = (user = null) => {
  try {
    return Order.find(user);
  } catch (err) {
    throw new Error(err);
  }
};

exports.findById = async (id, user = null, nameEmail = null) => {
  try {
    return await Order.findById(id).populate(user, nameEmail);
  } catch (err) {
    throw new Error("Order not found!");
  }
};

exports.findByIdAndUpdate = async (id, body) => {
  try {
    return await Order.findByIdAndUpdate(id, body, {
      new: true,
    });
  } catch (err) {
    throw new Error(err);
  }
};

exports.deleteOne = async (id) => {
  try {
    return await Order.deleteOne(id);
  } catch (err) {
    throw new Error(err);
  }
};
