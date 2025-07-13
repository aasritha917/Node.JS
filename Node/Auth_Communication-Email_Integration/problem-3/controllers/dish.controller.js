const Dish = require("../models/dish.model");

const createDish = async (req, res) => {
  try {
    const dish = new Dish(req.body);
    await dish.save();
    res.status(201).json({ msg: "Dish created", dish });
  } catch (err) {
    res.status(500).json({ msg: "Error creating dish", error: err.message });
  }
};

const getAllDishes = async (req, res) => {
  try {
    const dishes = await Dish.find();
    res.json(dishes);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching dishes", error: err.message });
  }
};

const updateDish = async (req, res) => {
  try {
    await Dish.findByIdAndUpdate(req.params.id, req.body);
    res.json({ msg: "Dish updated" });
  } catch (err) {
    res.status(500).json({ msg: "Error updating dish", error: err.message });
  }
};

const deleteDish = async (req, res) => {
  try {
    await Dish.findByIdAndDelete(req.params.id);
    res.json({ msg: "Dish deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting dish", error: err.message });
  }
};

module.exports = { createDish, getAllDishes, updateDish, deleteDish };
