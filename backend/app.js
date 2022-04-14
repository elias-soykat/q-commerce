const express = require("express");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");
const app = express();

// Middleware
app.use(express.json());

// Routes Import
const product = require("./routes/productRoutes");

app.use("/api/v1", product);

// Errors Middleware
app.use(notFound);
app.use(errorHandler);

module.exports = app;
