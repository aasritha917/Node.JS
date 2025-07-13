const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authorRoutes = require('./routes/authorRoutes');
const bookRoutes = require('./routes/bookRoutes');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

dotenv.config();
const app = express();

app.use(express.json());
app.use(logger);

app.use('/authors', authorRoutes);
app.use('/books', bookRoutes);

app.use(errorHandler);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('MongoDB connected');
    app.listen(3000, () => console.log('Server running on port 3000'));
})
.catch(err => console.error(err));
