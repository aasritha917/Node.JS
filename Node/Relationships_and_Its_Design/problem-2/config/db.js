const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017");
    console.log("MongoDB connected");
  } catch (err) {
    console.error("DB Error:", err.message);
  }
};

module.exports = connectDB;
