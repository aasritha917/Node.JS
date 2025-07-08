const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRouter = require('./routes/userRoutes');

dotenv.config()

const app = express()
app.use(express.json())

app.use('/user', userRouter)

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to DB");
    app.listen(process.env.PORT, () => {
      console.log("Server started at port " + process.env.PORT);
    });
  })
  .catch(err => console.log("DB Error: ", err));
