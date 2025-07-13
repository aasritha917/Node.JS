require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Redis = require("ioredis");
const bookRoutes = require("./routes/book.routes");
const authRoutes = require("./routes/auth.routes");
const bulkRoutes = require("./routes/bulk.routes");
require("./cron/job");

global.redis = new Redis();
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(process.env.PORT));

app.use("/auth", authRoutes);
app.use("/books", bookRoutes);
app.use("/books", bulkRoutes);
