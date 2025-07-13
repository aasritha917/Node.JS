const express = require("express");
const {
  createDish,
  getAllDishes,
  updateDish,
  deleteDish,
} = require("../controllers/dish.controller");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

const router = express.Router();

router.post("/", authMiddleware, roleMiddleware("admin"), createDish);
router.get("/", authMiddleware, getAllDishes);
router.put("/:id", authMiddleware, roleMiddleware("admin"), updateDish);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteDish);

module.exports = router;
