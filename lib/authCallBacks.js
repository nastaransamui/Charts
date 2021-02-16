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
          if (user.id !== undefined) {
            const existingUser = await users.find({_id: user.id}).toArray()
          users.updateOne({_id: user.id},{$set: {
            _id:  new ObjectID(user.id),
            email: user.email,
            name: "Guest",
            image: "https://source.unsplash.com/random",
            emailVerified: user.emailVerified,
            createdAt: user.createdAt,
          }})
          }
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
          if(session.user.name === null || session.user.picture === null){
          session.user ={
            name: "Guest",
            email: session.user.email,
            image: "https://source.unsplash.com/random",
          }}
        return session
    } catch (error) {
        return error
    }
}

export async function jwtCallBack(token, user, account, profile, isNewUser){
  token ={
    name: token.name === null ? 'Guess' : token.name,
    email: token.email,
    image: token.picture ===null ? "https://source.unsplash.com/random" : token.picture,
    iat: token.iat,
    exp: token.exp
  }
  return token;
}