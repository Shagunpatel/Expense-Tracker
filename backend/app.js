const express=require("express")
const cors=require("cors")
const { db } = require("./db/db")
const {readdirSync}=require('fs') // reads the files specified in a folder
const bodyparse=require('body-parser')
const app=express()
app.use(bodyparse.json())
app.use(bodyparse.urlencoded({extended:true}))

require ("dotenv").config()


const PORT =process.env.PORT
// routes

readdirSync('./routes').map((route)=>{ 
    app.use('/api/v1',require('./routes/'+route))// base url to access this
})
// it will read the files given in routes folder 
// middleware
// app.use(express.json())
app.use(cors()) // which host you want your server to be accessed by


app.get("/",(req,res)=>{
    res.send("Hello")
})
const server=()=>{
    db()
    app.listen(PORT,()=>{
        console.log("You are listening to port",PORT)
    })
}
server()