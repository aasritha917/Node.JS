const express = require("express");
const dotenv = require("dotenv");
const connectToDB = require("./config/db.config");
const emailRoute = require("./routes/email.router");

dotenv.config();
const app = express();

app.use(express.json());
connectToDB();

app.use("/", emailRoute);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
