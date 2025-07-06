const express = require("express");
const router = express.Router();
const Movie = require("../models/movie");
const User = require("../models/user");
const Booking = require("../models/booking");

router.post("/movies", async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(200).send("Movie created");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

router.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(200).send("User registered");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

router.post("/bookings", async (req, res) => {
  try {
    const { userId, movieId } = req.body;
    const userExists = await User.findById(userId);
    const movieExists = await Movie.findById(movieId);
    if (!userExists || !movieExists) return res.status(400).send("Invalid user or movie ID");
    
    const booking = new Booking(req.body);
    await booking.save();
    res.status(200).send("Booking created");
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
