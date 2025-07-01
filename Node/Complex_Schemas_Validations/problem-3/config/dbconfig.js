const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/");
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("DB Connection Error", err);
  }
};

module.exports = connectToDB;
