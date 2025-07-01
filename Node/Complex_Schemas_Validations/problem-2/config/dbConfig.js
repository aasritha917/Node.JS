const mongoose = require("mongoose")

const connecToDB = () => {
    try{
        mongoose.connect("mongodb://localhost:27017/")
        console.log("connection successful...")
    }catch(err){
        console.log("error found")
    }
}

module.exports = connecToDB