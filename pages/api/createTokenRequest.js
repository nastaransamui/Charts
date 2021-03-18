
import {connectToDatabase } from '../../lib/mongodb'

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
    const Users = await db.collection("users");
    const Rooms = await db.collection("rooms");
    const pipeline = [ { $match: { runtime: { $lt: 15 } } }];
    const changeStream = Users.watch();
    // changeStream.on("change", (changeEvent) => { 
    //     console.log(changeEvent)
    //  });
    const AllUsers = await Users.find({}).toArray().then((data)=>{
        return data
    })
    const AllRooms = await Rooms.find({}).toArray().then((data)=>{
        return data
    })
    res.status(200).json([{
        AllRooms: AllRooms,
        users: AllUsers 
    }]);
};