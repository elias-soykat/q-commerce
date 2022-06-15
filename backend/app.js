const cookieParser = require("cookie-parser");
const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");

// Config
if (process.env.NODE_ENV !== "prod") {
  require("dotenv").config({ path: "backend/config/.env" });
}

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());

// Routes Import
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

// Routes
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

// Connect frontend to backend
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

// Errors Middleware
app.use(notFound);
app.use(errorHandler);

module.exports = app;
