const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
app.use(express.json());

const postRoutes = require("./routes/postRoutes");
const analyticsRoutes = require("./routes/analytics");

app.use(postRoutes);
app.use(analyticsRoutes);

mongoose.connect(process.env.MONGO_URL).then(() => {
  app.listen(3000, () => console.log("Server running on port 3000"));
});
