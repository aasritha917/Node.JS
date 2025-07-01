const Vehicle = require("../model/Vehicle");

exports.createVehicle = async (req, res) => {
  try {
    const vehicle = new Vehicle(req.body);
    await vehicle.save();
    res.status(201).json({ message: "Vehicle created", vehicle });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch vehicles" });
  }
};

exports.addTrip = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) return res.status(404).json({ error: "Vehicle not found" });

    vehicle.trips.push(req.body);
    await vehicle.save();
    res.status(200).json({ message: "Trip added", vehicle });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.tripsOver200km = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ "trips.distance": { $gt: 200 } });
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ error: "Query failed" });
  }
};

exports.fromMajorCities = async (req, res) => {
  try {
    const cities = ["Delhi", "Mumbai", "Bangalore"];
    const vehicles = await Vehicle.find({
      "trips.startLocation": { $in: cities },
    });
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ error: "Query failed" });
  }
};

exports.tripsAfterDate = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({
      "trips.startTime": { $gte: new Date("2024-01-01") },
    });
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ error: "Query failed" });
  }
};

exports.carOrTruck = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({
      type: { $in: ["car", "truck"] },
    });
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ error: "Query failed" });
  }
};
