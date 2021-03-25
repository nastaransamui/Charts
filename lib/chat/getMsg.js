import {connectToDatabase } from '../mongodb';

export async function getMsgLive(Sender, Reciver){
    try {
        const { db } = await connectToDatabase();
        const Rooms = await db.collection("rooms");
        var queryOwner = {room_owner: Sender}
        var oldChats = Rooms.find(queryOwner).toArray()
        .then((data) =>{
            return data[0][Reciver]
        })

        return await oldChats
    } catch (error) {
        return error
    }
}