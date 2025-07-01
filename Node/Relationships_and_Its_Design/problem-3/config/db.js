const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017");
    console.log("MongoDB connected.");
  } catch (error) {
    console.error("DB Connection failed:", error.message);
  }
};

module.exports = connectDB;
