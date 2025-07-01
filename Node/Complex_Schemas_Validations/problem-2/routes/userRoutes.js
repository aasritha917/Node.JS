const express = require("express");
const router = express.Router();
const controller = require("../controller/userController");

router.post("/add-user", controller.addUser);
router.post("/add-profile/:userId", controller.addProfile);
router.get("/get-users", controller.getUsers);
router.get("/search", controller.searchUser);
router.put("/update-profile/:userId/:profileName", controller.updateProfile);
router.delete("/delete-profile/:userId/:profileName", controller.deleteProfile);

module.exports = router;
