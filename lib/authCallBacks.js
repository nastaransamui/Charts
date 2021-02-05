import {connectToDatabase } from './mongodb';
const ObjectID = require('mongodb').ObjectID;
    /**
     * Add username and image to users from email login
     */
export async function singInCallBack (user, account, profile){
    const { db } = await connectToDatabase();
    const users = await db.collection("users");
    try {
        const accounts = await db.collection("accounts").find({userId:user.id}).toArray();
        const isProvider = accounts.length
        if(isProvider){
            return true;
        }else{
          users.updateOne({_id: new ObjectID(user.id)},{$set: {
            _id:  new ObjectID(user.id),
            email: user.email,
            name: "Guest",
            image: "https://source.unsplash.com/random",
            emailVerified: user.emailVerified,
            createdAt: user.createdAt,
          }})
        }
    } catch (error) {
        return error
    }
}
/**
 * update session of none provider users
 */

export async function sessionCallBack(session, user){

    try {
          if(user.name === null || user.picture === null){
          user ={
            name: "Guest",
            email: user.email,
            picture: "https://source.unsplash.com/random",
            iat: user.iat,
            exp: user.exp
          }}
        return user
    } catch (error) {
        return error
    }
}