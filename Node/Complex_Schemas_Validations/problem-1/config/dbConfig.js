const mongoose = require("mongoose")

const connecToDB = ()=>{
    try{
        mongoose.connect("mongodb://localhost:27017/")
        console.log("connection Successful")
    }catch(err){
        console.log("fount error")
    }
}

module.exports = connecToDB