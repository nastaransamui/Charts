import { getSession } from 'next-auth/client'
import {connectToDatabase } from '../../../lib/mongodb'


export default async (req, res) => {
    const session = await getSession({ req })
    const { db } = await connectToDatabase();
    const messages = await db.collection("messages");
    const chatHistory = {messages: [] };
    const changeStream = db.collection('messages').watch([], {'fullDocument': 'updateLookup'});
    let allMessages = {}
        changeStream.on('change', (event) => {
            allMessages = event.fullDocument
        });
    const {id , name , body , time ,sender, reciver} = req.body;
    const chat =  { id, name, body, time ,sender, reciver};
    chatHistory.messages.push(chat);
    const chatObjc = chatHistory.messages
    console.log("Majisd")
    if (session) {
        if (id === undefined || name === undefined || body===undefined || time === undefined || sender === undefined || reciver === undefined) {
            res.redirect("/chat")
        } else {
            messages.insertOne(chat)
            res.json({...chatHistory, status: 'success'});
        }
    } else {
        res.json({ error: 'You must be sign in to view the protected content on this page.' })
    }
}


  