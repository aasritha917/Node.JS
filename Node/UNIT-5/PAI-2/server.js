const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const authorRoutes = require('./routes/authorRoutes');
const statsRoutes = require('./routes/statsRoutes');

const errorHandler = require('./middleware/errorHandler');
const { connectRedis } = require('./utils/redisClient');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const connectToDB = async() => {
    try {
       await mongoose.connect(process.env.MONGO_URI)
       console.log("connection successful")
    } catch (err) {
        console.log("erroe in connectiong")
    }
}
connectToDB()
//connectRedis();

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/books', bookRoutes);
app.use('/api/v1/authors', authorRoutes);
app.use('/api/v1/stats', statsRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
