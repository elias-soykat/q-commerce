const User = require("../models/userModel");

exports.create = async (body) => {
  try {
    return await User.create(body);
  } catch (err) {
    if (err.code === 11000) {
      throw new Error("This user is already exists in our system");
    }
  }
};

exports.find = () => {
  try {
    return User.find();
  } catch (err) {
    throw new Error(err);
  }
};

exports.findOne = async (email) => {
  try {
    return await User.findOne(email).select("+password");
  } catch (err) {
    throw new Error("User not found!");
  }
};

exports.findById = async (id, pass) => {
  try {
    return await User.findById(id).select(`${pass}password`);
  } catch (err) {
    throw new Error("User not found!");
  }
};

exports.findByIdAndUpdate = async (id, body) => {
  try {
    return await User.findByIdAndUpdate(id, body, {
      new: true,
    });
  } catch (err) {
    throw new Error(err);
  }
};

exports.deleteOne = async (id) => {
  try {
    return await User.deleteOne(id);
  } catch (err) {
    throw new Error(err);
  }
};
