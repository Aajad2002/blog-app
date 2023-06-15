const express=require('express');
const app=express()
const cors=require('cors')
app.use(cors())
app.use(express.json())

const {connection}=require("./server/server")
app.get("/",(req,res)=>{
    res.send("Blog app Backend")
})

const {userRouter}=require("./routes/User.route")
app.use("/",userRouter)
const {blogRouter}=require("./routes/Blog.route")
app.use('/blogs',blogRouter)
require('dotenv').config();
const port=process.env.PORT;
app.listen(port,async()=>{
    try {
        await connection
        console.log("connected to database server")
    } catch (error) {
        console.log("unable to connect to database")
    }
    console.log(`server is running on port ${port}`)
})