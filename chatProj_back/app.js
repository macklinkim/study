const express = require("express")
const mongoose = require("mongoose")
require('dotenv').config()
const cors = require("cors")
const Room = require("./Modules/room")
const app = express()
app.use(cors());


mongoose
.connect(process.env.DB, {
  useNewUrlParser: true,  
  useUnifiedTopology:true,
})
.then(()=>console.log("DB connected"));

app.get("/", async (req,res)=>{
  Room.insertMany([
    {
      room: "111Javascript1322",
      
    },
    {
      room: "리액트 단톡방",
    },
    {
      room: "NodeJS 단톡방",
    },
  ]).then(()=>res.send("ok")).catch((error)=>res.send(error));
});
module.exports = app