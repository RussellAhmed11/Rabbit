const express =require("express");
const cors=require("cors");
const dotenv=require("dotenv")
const connectDB=require("./Config/db")
const userRoutes=require("./Routes/UserRoutes")

const app=express();

// medlware
dotenv.config()
app.use(express.json());
app.use(cors())

const port=process.env.PORT ||3000

// connect to mongodb database
connectDB()

// Api routes
app.use("/api/users",userRoutes)
app.get("/",(req,res)=>{
    res.send("well come to rabbit server")
})
app.listen(port,()=>{
    console.log(`Rabbit server is running on ${port}`)
})