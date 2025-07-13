require("dotenv").config();
const express = require("express");
require("./config/db")();
require("./cron/bulkJob");
require("./cron/reportJob");

const app = express();
app.use(express.json());
app.use("/auth", require("./routes/auth"));
app.use("/books", require("./routes/books"));

app.listen(process.env.PORT, () => console.log("Server ready on", process.env.PORT));
