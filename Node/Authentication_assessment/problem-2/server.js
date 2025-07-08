const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");

dotenv.config();

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/notes", noteRoutes);

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log("Server running on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.error("DB Connection error:", err.message);
  });
