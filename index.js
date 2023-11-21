const port=process.env.PORT || 3000;
const {Server}=require("socket.io");
const cors=require("cors");
const http=require("http");
const express=require('express');
const conne= require('./data/connection');
const routesP= require('./data/routesP'); 
const routesU=require('./data/routesU');
const routesB=require('./data/routesB');
const routesv=require('./data/routesv');
const routPay=require('./data/pay')
const bodyParser = require('body-parser');
const { Socket } = require("dgram");
conne(); 
const app=express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use('/p',routesP);
app.use('/u',routesU);
app.use('/b',routesB);
app.use('/a',routesv);
app.post('/orders',routPay.orders);
app.post('/verify',routPay.verify)
app.use('/uploads', express.static('uploads')); 
const server=http.createServer(app);
const io=new Server(server,{
    cors: {
        origin: "http://localhost:5173",
        methods:["GET","POST"],
    }    
});
let usd = {};
let timer = 40;
let timerInterval;
let winner={};
let isTimerRunning = false;
io.on("connection",(sc)=>{
 
    console.log(`User Connected: ${sc.id}`);
    sc.on("sm",(data)=>{
        console.log(data);
        sc.to(data.rm).emit("re", data);
    })
    sc.on("userjoin", (data, us) => {
       console.log(`id joined:${sc.id}`);
        usd = {
            usdet:us.uname,
            ad: data,
            amount: data.price,
            room: data.model,
          };
        
        // First, make the user join the room
        console.log(usd.amount);
        sc.join(usd.room);
        console.log(sc.adapter.rooms);
        sc.to(usd.room).emit("uj", usd.usdet);
        console.log(`User logged in is ${us.uname} for product ${data.model}`);
      });
      sc.on('startBid', () => {
        if (!isTimerRunning) {
          isTimerRunning = true;
          console.log("bid std");
          // Broadcast to all connected clients that the timer has started
          io.emit('bidStarted');
    
          timerInterval = setInterval(() => {
            console.log("ecived");
            if (timer > 0) {
              timer--;
              // Broadcast the updated timer value to all connected clients
              // Inside the timer update logic (where timer value changes):
              io.to(usd.room).emit("timerUpdate", timer);

              console.log('timerUpdate', timer);
            }
            else {
           
              clearInterval(timerInterval);
              timerInterval = null;
              isTimerRunning = false;
              console.log(winner.wuid,usd.amount)
              if(timer==0){
                io.to(usd.room).emit("Winner", winner.wuid,usd.amount,winner.wname);}
                usd = {};
                timer = 40;
                winner = {};
                isTimerRunning = false;
            }
          }, 1000);
        }
      });
      sc.on('resetTimer', () => {
        clearInterval(timerInterval);
        timerInterval = null;
        timer = 40;
        isTimerRunning = false;
        io.emit('timerUpdate', timer);
      });
      
      sc.on("exit", (rmid) => {
        console.log(`to be removed :${sc.id}`);
        console.log(rmid);
        console.log(sc.adapter.rooms);
        sc.adapter.rooms.get(rmid).delete(sc.id); 
        console.log(`User ${usd.usdet} is leaving room ${rmid}`);
        const room = io.sockets.adapter.rooms[rmid];
        console.log(room);
        console.log(sc.adapter.rooms);
        io.to(rmid).emit("left", usd.usdet);
      });  
    // Assuming you want to check members in the "room" roo
    sc.on("binow",(g,e,u)=>{
      console.log(usd.room);
        if(usd.room == g){ 
          winner = {
            wname:u.uname,
            wuid:u.uid,
          };
        console.log("The base usd:",usd.amount)
        console.log("The incrementation :",e);
        var a=usd.amount;
        a+= e;
        usd.amount=a;
        console.log(usd.amount);
        console.log(winner.wname);
        io.to(usd.room).emit("re", usd.amount,winner.wname);
        }
    })
})
server.listen(port,()=>{
    console.log("Serve list");
}); 
// app.listen(3001,()=>{
//   console.log("server List 3001")
// })