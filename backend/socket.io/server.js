import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();


const server = http.createServer(app);
const io=new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"],
    }
});

export const getReceiverSocketId=(receiverid)=>{
    // console.log('receiverid', receiverid)
    return users[receiverid];
}

const users={}

io.on("connection",(socket)=>{
    const userId=socket.handshake.query.userId
    if(userId){
        users[userId]=socket.id
    }

    socket.on("sendMessage", (data) => {
        const message = { ...data};
        // console.log('message', message)
        const receiverSocketId = getReceiverSocketId(data.receiverid);
    
        if (receiverSocketId) {
            message.status = "delivered";
            // console.log('message.status', message.status)
          io.to(receiverSocketId).emit("receiveMessage", message);
        //   console.log('message', message)
        }
    
        socket.emit("messageStatusUpdate", {
          messageid: message._id,
          status: message.status,
        });
      });


    io.emit("getOnlineUsers",Object.keys(users));

    socket.on("seenMessage", (messageid) => {
        console.log('messageid', messageid)
          io.emit("messageStatusUpdate", {
            messageid,
            status: "seen",
          });
          
      });

    socket.on("deleteMessage", (messageid) => {
        io.emit("messageDeleted", messageid);
      }); 

    socket.on("disconnect",()=>{
        delete users[userId];
        io.emit("getOnlineUsers",Object.keys(users));

    })
})

export {app,io,server}