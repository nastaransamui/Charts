import { getSession } from 'next-auth/client'
import {connectToDatabase } from '../../../lib/mongodb'


export default async (req, res) => {
    const session = await getSession({ req })

    const chatHistory = {messages: [] };
    const {id = null, name = null , body = "", time = +new Date} = req.body;
    const chat =  { id, name, body, time};
    chatHistory.messages.push(chat);

    
    if (session) {
        res.json({...chatHistory, status: 'success'});
    } else {
        res.json({ error: 'You must be sign in to view the protected content on this page.' })
    }
}


  