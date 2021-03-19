import {connectToDatabase } from '../mongodb';

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
        Rooms.findOneAndUpdate(filterReciver, updateReciver,options)
        return Rooms.findOneAndUpdate(filterSender, updateSender,options)
    } catch (error) {
        return error
    }
}