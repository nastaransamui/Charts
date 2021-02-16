import {connectToDatabase } from './mongodb';

export async function retriveMessages(profile){
    try {
        const { db } = await connectToDatabase();
        const messages = await db.collection("messages");
        const changeStream = db.collection('messages').watch([], {'fullDocument': 'updateLookup'});
        const chatHistory = {messages: [] };
        let allMessages = {}
        changeStream.on('change', (event) => {
            allMessages = event.fullDocument
        });
        const data = await messages.find({
            $or:[
                {
                    sender: profile._id
                },
                {
                    reciver: profile._id
                }
            ]
        }).toArray();
       if(data.length > 0){
        allMessages = data.map((d,i)=>{
            return{
                _id: `${d._id}`,
                sender: `${d.sender}`,
                reciver: `${d.reciver}`,
                name: `${d.name}`,
                body: `${d.body}`,
                time: `${d.time}`,
            }
        })
       }
       console.log(allMessages)
        return allMessages;
    } catch (error) {
        return error;
    }
}