const cookieParser = require("cookie-parser");
const express = require("express");
const fileUpload = require("express-fileupload");
require("dotenv").config({ path: "backend/config/.env" });

const { errorHandler, notFound } = require("./middleware/errorMiddleware");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());

// Routes Import
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const country = require("./routes/countryRoute");

// test route
app.get("/", (req, res) => {
  res.json("working!");
});

// Routes
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", country);

// Errors Middleware
app.use(notFound);
app.use(errorHandler);

module.exports = app;
