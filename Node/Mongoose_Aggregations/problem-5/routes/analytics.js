const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");

router.get("/analytics/movie-bookings", async (req, res) => {
  try {
    const result = await Booking.aggregate([
      { $group: { _id: "$movieId", totalBookings: { $sum: 1 }, totalSeats: { $sum: "$seats" } } }
    ]);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/analytics/user-bookings", async (req, res) => {
  try {
    const result = await Booking.aggregate([
      {
        $lookup: { from: "movies", localField: "movieId", foreignField: "_id", as: "movie" }
      },
      { $unwind: "$movie" },
      {
        $group: {
          _id: "$userId",
          movies: { $push: "$movie.title" }
        }
      }
    ]);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/analytics/top-users", async (req, res) => {
  try {
    const result = await Booking.aggregate([
      { $group: { _id: "$userId", count: { $sum: 1 } } },
      { $match: { count: { $gt: 2 } } }
    ]);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/analytics/genre-wise-bookings", async (req, res) => {
  try {
    const result = await Booking.aggregate([
      { $match: { status: "Booked" } },
      {
        $lookup: { from: "movies", localField: "movieId", foreignField: "_id", as: "movie" }
      },
      { $unwind: "$movie" },
      {
        $group: { _id: "$movie.genre", totalSeats: { $sum: "$seats" } }
      }
    ]);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/analytics/active-bookings", async (req, res) => {
  try {
    const result = await Booking.aggregate([
      { $match: { status: "Booked" } },
      {
        $lookup: { from: "users", localField: "userId", foreignField: "_id", as: "user" }
      },
      { $unwind: "$user" },
      {
        $lookup: { from: "movies", localField: "movieId", foreignField: "_id", as: "movie" }
      },
      { $unwind: "$movie" },
      {
        $project: {
          userName: "$user.name",
          movieTitle: "$movie.title",
          seats: 1,
          bookingDate: 1
        }
      }
    ]);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
