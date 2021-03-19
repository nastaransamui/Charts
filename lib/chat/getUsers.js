import {connectToDatabase } from '../mongodb';
const ObjectID = require('mongodb').ObjectID;
export async function getUsersLive(userId){
    try {
        const { db } = await connectToDatabase();
        const Users = await db.collection("users");
        const AllUsers = async () =>{
            const result = Users.find({ _id: { $ne: ObjectID(userId) } }).toArray();
            return await result
        } 

        return await AllUsers();
    } catch (error) {
        return error
    }
}