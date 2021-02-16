import {connectToDatabase } from './mongodb';
const ObjectID = require('mongodb').ObjectID;

export async function ownUser (session){
    try {
        const { db } = await connectToDatabase();
        const users = await db.collection("users");
        const data = await users.find({"email": session.user.email}).toArray();
        let profile = {}
        if(data.length > 0){
        profile = {
            _id: `${data[0]._id}`,
            email:`${data[0].email}`,
            emailVerified: `${data[0].emailVerified}`,
            createdAt: `${data[0].createdAt}`,
            updatedAt: `${data[0].updatedAt}`,
            image: `${data[0].image}`,
            name: `${data[0].name}`,
        }
    }
        return profile
    } catch (error) {
        return error
    }

}