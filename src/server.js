// server.js
'use server'
import  http  from "http";
import express from 'express'
import cors from 'cors'
import { Server } from "socket.io";

const app = express();

const server = http.createServer(app)

const io = new Server(server,{

  cors:{
    origin:"*",
    method:["GET","POST"],
  }
}
)

app.use(cors('*'))

app.use(express.json())

app.post("/send",(res,req)=>{
  

  io.emit('PushNotification',{
  // console.log("object")
  })
  res.status(200).send({
    message:"send Success"
  })

  io.on('connection',(socket)=>{
    console.log("Connected")
    socket.on('disconnect',()=>{
      console.log("Client Disconnected")
    })
  })
})
server.listen(8080,()=>{
  console.log("server running on port 8080")
})