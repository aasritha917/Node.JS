const express = require("express");
const connectToDB = require("./config/dbconfig");
const vehicleRoutes = require("./routers/vehicleRoutes");

const app = express();
app.use(express.json());

connectToDB();
app.use("/api", vehicleRoutes);

app.get("/", (req, res) => {
  res.send("Vehicle Trip Management System Running...");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
