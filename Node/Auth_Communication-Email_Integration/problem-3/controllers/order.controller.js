const Order = require("../models/order.model");
const User = require("../models/user.model");

const createOrder = async (req, res) => {
  try {
    const chefs = await User.find({ role: "chef" });
    if (!chefs.length) return res.status(400).json({ msg: "No chefs available" });

    const randomChef = chefs[Math.floor(Math.random() * chefs.length)];

    const order = new Order({
      ...req.body,
      userId: req.user.userId,
      chefId: randomChef._id,
      status: "Order Received",
    });

    await order.save();
    res.status(201).json({ msg: "Order placed", order });
  } catch (err) {
    res.status(500).json({ msg: "Order error", error: err.message });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.userId });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ msg: "Fetch error", error: err.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (String(order.chefId) !== req.user.userId)
      return res.status(403).json({ msg: "Unauthorized" });

    order.status = req.body.status;
    await order.save();
    res.json({ msg: "Status updated", order });
  } catch (err) {
    res.status(500).json({ msg: "Update error", error: err.message });
  }
};

module.exports = { createOrder, getUserOrders, updateOrderStatus };
