const express = require("express");
const router = express.Router();
const controller = require("../controller/vehicleController");

router.post("/vehicles", controller.createVehicle);
router.get("/vehicles", controller.getVehicles);
router.post("/vehicles/:vehicleId/trips", controller.addTrip);

router.get("/query/over200km", controller.tripsOver200km);
router.get("/query/from-cities", controller.fromMajorCities);
router.get("/query/after-2024", controller.tripsAfterDate);
router.get("/query/car-truck", controller.carOrTruck);

module.exports = router;
