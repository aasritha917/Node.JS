const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const contentRoutes = require("./routes/contentRoutes");

app.use("/auth", authRoutes);
app.use("/subscription", subscriptionRoutes);
app.use("/content", contentRoutes);

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("MongoDB connected");
  app.listen(process.env.PORT, () => console.log("Server running on", process.env.PORT));
});
