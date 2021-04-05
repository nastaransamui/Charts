import { Server } from 'socket.io'
import {connectToDatabase } from '../../lib/mongodb'
import moment from 'moment'
import aes256 from 'aes256'
const ObjectID = require('mongodb').ObjectID;

const ioHandler = async (req, res) => {
  if (!res.socket.server.io) {
    const { db } = await connectToDatabase();
    const Users = await db.collection("users");
    const Rooms = await db.collection("rooms");
    const io = new Server(res.socket.server)
    var key = process.env.SECRET;
    io.on('connection', async(socket) => {
      socket.sendBuffer = [];
      socket.on('login', async (userName)=>{
        const All = await Users.find({}).toArray().then((data)=>io.emit("users", data))
      });
      socket.on('disconnecting', async () => {
        const All = await Users.find({})
        .toArray()
        .then((data)=>io.emit("singOut", data))
      });
      socket.on(`room`, async (roomID,guestID)=>{ 
        var queryOwner = {room_owner: roomID}
        var queryGuest = {room_owner: guestID}
        var options = { upsert: true, returnOriginal: false, setDefaultsOnInsert: true }
        var update ={}
        var updateGuest = {}
        var roomOwnerExist = Rooms.find(queryOwner).toArray()
        .then((data)=>{
          if(data.length !== 0){
            if(data[0][guestID] === undefined){
              update = {  $set: {[`${guestID}`]: [] }}
            }else{
              update = {  $set: {[`${guestID}`]: data[0][guestID] }}
            }
            Rooms.findOneAndUpdate(queryOwner, update, options,(err, res)=>{
              
              if (err) io.emit(`roomReturn${roomID}${guestID}`, err);
              io.emit(`roomReturn${roomID}${guestID}`, res.value)
            })
          }else{
             update = {  $set: {[`${guestID}`]: [] }}
            Rooms.findOneAndUpdate(queryOwner, update, options,(err, res)=>{
              if (err) io.emit(`roomReturn${roomID}${guestID}`, err);
              io.emit(`roomReturn${roomID}${guestID}`, res.value)
            })
          }
        }).catch(err => io.emit(`roomReturn${roomID}${guestID}`, err))
            var roomGuestExist = Rooms.find(queryGuest).toArray()
            .then((data) =>{
              if(data.length !== 0){
                if(data[0][roomID] === undefined){
                  updateGuest = {  $set: {[`${roomID}`]: [] }}
                }else{
                  updateGuest = {  $set: {[`${roomID}`]: data[0][roomID] }}
                }
                 
                Rooms.findOneAndUpdate(queryGuest, updateGuest, options)
              }else{
                 updateGuest = {  $set: {[`${roomID}`]: [] }}
                Rooms.findOneAndUpdate(queryGuest, updateGuest, options)
              }
            }).catch(err => console.log(err))
      })
      socket.on("sendMsg", async (msgTo,Sender,Reciver) => {
        const filterSender = {room_owner: Sender}
        const updateSender = {
          $push:{
            [`${Reciver}`]: {...msgTo}
          }
        }
        const options = { upsert: true, returnOriginal: false, setDefaultsOnInsert: true };
        const filterReciver = {room_owner: Reciver}
        const updateReciver = {
          $push:{
            [`${Sender}`]: {...msgTo}
          }
        }
        Rooms.findOneAndUpdate(filterSender, updateSender,options,(err,res)=>{
          if(err) io.emit(`sendMsgReturn${Sender}${Reciver}`, err);
          io.emit(`sendMsgReturn${Sender}${Reciver}`, res.value)
          io.emit(`sendMsgReturn${Reciver}${Sender}`, res.value)
        })
        Rooms.findOneAndUpdate(filterReciver, updateReciver,options,(err,res)=>{
          if(err) io.emit(`sendMsgReturn${Sender}${Reciver}`, err);
        })
        io.emit('getMsg', msgTo)
      });
      socket.on("typing", async(isTyping)=>{

        io.emit("returnTyping",isTyping)
      })
    })
    io.on('disconnect', async(socket)=>{
      console.log('client disconnect')
    })
    res.socket.server.io = io
  } else {
    console.log('socket.io already running')
  }
  res.end()
}

export const config = {
  api: {
    bodyParser: false
  }
}

export default ioHandler