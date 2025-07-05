import express from "express";
import connectdb from "./db/db.js";
import dotenv from "dotenv";
import userroute from './routes/user.js';
import messageroute from './routes/message.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { app, server } from "./socket.io/server.js";




dotenv.config();
connectdb()

const port = process.env.PORT || 5000;
app.use(express.static("public"))
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: '*',
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT"]
  }));

app.use('/user', userroute);
app.use('/message', messageroute)



server.listen(port, ()=>{
    console.log(`server is running in port ${port}`);
    
})

