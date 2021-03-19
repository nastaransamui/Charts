import {connectToDatabase } from '../mongodb';

export async function getMsgLive(Sender, Reciver, Msg){
    try {
        const { db } = await connectToDatabase();
        const Rooms = await db.collection("rooms");
        var queryOwner = {room_owner: Sender}
        if(Msg.length === 0){
            var oldChats = Rooms.find(queryOwner).toArray()
            .then((data) =>{
                return data[0][Reciver]
            })
            return await oldChats
        }else{
            return Msg
        }
        
    } catch (error) {
        return error
    }
}