import {connectToDatabase } from '../mongodb';
const ObjectID = require('mongodb').ObjectID;
export async function getUsersLive(userId){

    try {
        const { db } = await connectToDatabase();
        const Users = await db.collection("users");
        const data = await Users.find({ _id: { $ne: ObjectID(userId) } }).toArray();
        let users = {}
        
        users = JSON.parse(JSON.stringify(data))

        return users
    } catch (error) {
        return error
    }
}