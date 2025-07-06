require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("DB connected"))
  .catch((err) => console.error("MongoDB Error:", err));

app.use("/students", require("./routes/studentRoutes"));
app.use("/courses", require("./routes/courseRoutes"));
app.use("/enroll", require("./routes/enrollmentRoutes"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
