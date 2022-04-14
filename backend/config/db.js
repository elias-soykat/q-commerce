const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongodb connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`Error ${error.message}`);
  }
};

module.exports = connectDB;
