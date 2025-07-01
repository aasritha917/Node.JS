const express = require("express");
const connectDB = require("./config/db");
const rentalRoutes = require("./routes/rentalRoutes");

const app = express();
app.use(express.json());

connectDB();

app.use("/api", rentalRoutes);

app.listen(3000, () => {
  console.log("Server running on............");
});
