import {connectToDatabase } from '../mongodb';

export async function getRoomsLive(roomID, guestID){
    try {
        const { db } = await connectToDatabase();
        const Rooms = await db.collection("rooms");
        var queryOwner = {room_owner: roomID}
        var queryGuest = {room_owner: guestID}
        var options = { upsert: true, returnOriginal: false, setDefaultsOnInsert: true }
        var update ={  }
        var updateGuest = {}
        // Create room for guess
        Rooms.find(queryGuest).toArray()
        .then((data)=>{
            if (data.length !== 0) {
                if (data[0][roomID] === undefined) {
                update = {  $set: {[`${roomID}`]: [] }}
                } else {
                update = {  $set: {[`${roomID}`]: data[0][roomID] }}
                }
                return Rooms.findOneAndUpdate(queryGuest, update, options)
            } else {
                update = {  $set: {[`${roomID}`]: [] }}
                return Rooms.findOneAndUpdate(queryGuest, update, options)
            }
        }).catch((err) =>{return err})
        //Create and find room for owner and return
       return Rooms.find(queryOwner).toArray()
       .then((data)=>{
           if (data.length !== 0) {
               if (data[0][guestID] === undefined) {
                update = {  $set: {[`${guestID}`]: [] }}
               } else {
                update = {  $set: {[`${guestID}`]: data[0][guestID] }}
               }
               return Rooms.findOneAndUpdate(queryOwner, update, options)
           } else {
                update = {  $set: {[`${guestID}`]: [] }}
               return Rooms.findOneAndUpdate(queryOwner, update, options)
           }
       }).catch((err) =>{return err})

    } catch (error) {
        return error
    }
}