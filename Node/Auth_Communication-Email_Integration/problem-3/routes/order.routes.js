const express = require("express");
const {
  createOrder,
  getUserOrders,
  updateOrderStatus,
} = require("../controllers/order.controller");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

const router = express.Router();

router.post("/", authMiddleware, roleMiddleware("user"), createOrder);
router.get("/", authMiddleware, roleMiddleware("user"), getUserOrders);

router.patch("/:id", authMiddleware, roleMiddleware("chef"), updateOrderStatus);

module.exports = router;
