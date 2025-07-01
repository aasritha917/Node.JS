const express = require("express")
const connecToDB = require("./config/dbConfig")
const router = require("./routes/userRoutes")
const errorHandler = require("./middleware/userMiddleware")

const app = express()
app.use(express.json())

connecToDB()

app.use("/",router)
app.use(errorHandler)
app.listen(3000,()=>{
    console.log("server starts....")
})