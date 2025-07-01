const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userProfileRoutes");

const app = express();
app.use(express.json());

connectDB();

app.use("/api", userRoutes);

app.listen(3000, () => {
  console.log("Server running on ........");
});
