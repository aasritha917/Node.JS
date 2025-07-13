const express = require("express");
const connectToDB = require("./config/db.config");
const userRoutes = require("./routes/user.routes");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use("/", userRoutes);

connectToDB();

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
