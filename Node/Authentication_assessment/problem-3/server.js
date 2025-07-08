const express = require("express");
require("dotenv").config();
const connectToDB = require("./config/db");

const authRoutes = require("./routes/auth.routes");
const blogRoutes = require("./routes/blong.routes");

const app = express();
app.use(express.json());

connectToDB();

app.use("/auth", authRoutes);
app.use("/", blogRoutes);

app.get("/", (req, res) => res.send("Blog API with JWT and Aggregation Running"));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));