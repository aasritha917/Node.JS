const express = require("express")
const User = require("../model/userModel");
const userRouter = express.Router()

userRouter.post("/users", async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
})

userRouter.post("/users/:userId/address", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        user.addresses.push(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

userRouter.get("/users/summary", async (req, res) => {
    try {
        const users = await User.find();
        const summary = {
            totalUsers: users.length,
            totalAddresses: users.reduce((sum, user) => sum + user.addresses.length, 0),
            users: users.map(user => ({
                name: user.name,
                numberOfAddresses: user.addresses.length
            }))
        };
        res.json(summary);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

userRouter.get("/users/:userId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        res.json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


module.exports = userRouter;
