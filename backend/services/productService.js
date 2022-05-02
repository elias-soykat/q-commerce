const Product = require("../models/productModel");

exports.create = async (body) => {
  try {
    return await Product.create(body);
  } catch (err) {
    throw new Error(err);
  }
};

exports.find = () => {
  try {
    return Product.find();
  } catch (err) {
    throw new Error(err);
  }
};

exports.findById = async (id) => {
  try {
    return await Product.findById(id);
  } catch (err) {
    throw new Error("Product not found!");
  }
};

exports.findByIdAndUpdate = async (id, body) => {
  try {
    return await Product.findByIdAndUpdate(id, body, {
      new: true,
    });
  } catch (err) {
    throw new Error(err);
  }
};

exports.deleteOne = async (id) => {
  try {
    return await Product.deleteOne(id);
  } catch (err) {
    throw new Error(err);
  }
};

exports.countDocuments = async () => {
  try {
    return await Product.countDocuments();
  } catch (err) {
    throw new Error(err);
  }
};
