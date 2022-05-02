const app = require("./app");
const connectDB = require("./config/db");
const cloudinary = require("cloudinary");

// connecting database
connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(`server running on ${port} => ${process.env.NODE_ENV}`)
);
