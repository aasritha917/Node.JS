const express = require("express");
const connectDB = require("./config/db");
const libraryRoutes = require("./routes/libraryRoutes");

const app = express();
app.use(express.json());

connectDB();
app.use("/api", libraryRoutes);

app.listen(3000, () => {
  console.log("Server running on.........");
});
