import {connectToDatabase } from './mongodb';
const ObjectID = require('mongodb').ObjectID;

export async function ownUser (session){
    try {
        const { db } = await connectToDatabase();
        const users = await db.collection("users");
        const data = await users.find({"email": session.user.email}).toArray();
        let profile = {}
        if(data.length > 0){
        profile = JSON.parse(JSON.stringify(data))
    }
        return profile
    } catch (error) {
        return error
    }

}