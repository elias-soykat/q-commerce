const app = require("./app");
const connectDB = require("./config/db");
require("dotenv").config({ path: "backend/config/.env" });

connectDB();

const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(`server running on ${port} => ${process.env.NODE_ENV}`)
);
