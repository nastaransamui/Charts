import Ably from "ably/promises";
import {connectToDatabase } from '../../lib/mongodb'

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
    const client = new Ably.Realtime(process.env.ABLY_API_KEY);
    const Users = await db.collection("users");
    const tokenRequestData = await client.auth.createTokenRequest({ clientId: req.body.userName});
    const All = await Users.find({}).toArray().then((data)=>{
        return data
    })
    console.log(All)
    res.status(200).json([{
        token: tokenRequestData,
        users: All 
    }]);
};