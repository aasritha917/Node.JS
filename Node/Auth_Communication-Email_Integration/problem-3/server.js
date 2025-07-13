const express = require("express");
require("dotenv").config();

const app = express();
const connectToDB = require("./config/db.config");
const indexRoutes = require("./routes/index");

app.use(express.json());
connectToDB();

app.use("/", indexRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started on port", process.env.PORT || 3000);
});
