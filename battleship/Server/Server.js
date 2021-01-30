const express = require('express')
const app = express()
const server = require("http").Server(app);
const PORT = 5001;
const bodyParser = require("body-parser");
const router = express.Router();
const fs = require('fs')
const uuid = require('uuid');
const { timeEnd } = require('console');
const testMid = require("./AddUser")
const path = require('path');
const file = require("/Users/patrick/React_Projects/catmedia/User.json")
const mongoClinet = require('mongodb').MongoClient;
const assert = require('assert');
const WebSocket = require('ws');


server.listen(PORT);

const wss = new WebSocket.Server({server})

wss.on("connection", (ws)=>{
    ws.on("message", (message)=> {
        wss.clients.forEach(function each(cleint){
            if(cleint != ws && cleint.readyState === WebSocket.OPEN){
                cleint.send(message)
                console.log(message)
            }
        })
    //    const m = JSON.parse(message)
  //      console.log(m);
//        ws.send("fuck you")

    })
})





// wsServer.on("connect", (req) => {
//     req.
//     connection.on("message", (message) => {
//         let newMess = JSON.parse(message.utf8Data);
//         console.log(newMess)

      

//         switch(newMess.id){
//             case 0:{
//                 count++;
//                 console.log(count)
//                 connection.sendUTF(new Date())
//                 console.log(wsServer.clients)
               

//                 // on connection 
//                 break;
//             }
//             case 1: {
//                 break;
//             }
//         }

//         //console.log(message.id);
      
//     })

// })



console.log(PORT + " RUNNIN")