const express = require("express")
const connecToDB = require("./config/dbConfig");
const userRouter = require("./routes/userRouter");

const app = express()
app.use(express.json());
connecToDB()

app.use("/",userRouter)

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" })
})

app.listen(3000,() =>{
    console.log("Server starts at node 3000......")
})