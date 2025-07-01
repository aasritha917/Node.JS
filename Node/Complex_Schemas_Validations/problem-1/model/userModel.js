const mongoose = require("mongoose")
const User = require("../model/userModel");

const AddressSchema = new mongoose.Schema(
    {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, default: "India" },
        pincode: { type: String, required: true }
    }
)

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        age: { type: Number },
        address: [AddressSchema]
    }
)

module.exports = mongoose.model("User",UserSchema)