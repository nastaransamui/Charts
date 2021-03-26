import {connectToDatabase } from '../mongodb';
import {pusher} from '../../pages/api//auth/[...nextauth]'
export async function setMsgLive(NewMessage, Sender, Reciver){
    try {
        const { db } = await connectToDatabase();
        const Rooms = await db.collection("rooms");
        const filterSender = {room_owner: Sender}
        const updateSender = {
            $push:{
                [`${Reciver}`]: {...NewMessage}
            }
        }
        const options = { upsert: true, returnOriginal: false, setDefaultsOnInsert: true };
        const filterReciver = {room_owner: Reciver}
        const updateReciver = {
          $push:{
            [`${Sender}`]: {...NewMessage}
          }
        }
        Rooms.findOneAndUpdate(filterSender, updateSender,options,(err, res)=>{
            if(err) {pusher.trigger("Chat-development", "chat", {
                value: err
              })}else{
                pusher.trigger("Chat-development", "chat", {
                    value: {...NewMessage}
                  });
              }

        })
        Rooms.findOneAndUpdate(filterReciver, updateReciver,options,(err,res)=>{
            if(err) pusher.trigger("Chat-development", "chat", {
                value: err
              })
          })
        return "done"
    } catch (error) {
        return error
    }
}