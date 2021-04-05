import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import {mySendVerificationRequest} from '../../../lib/SinginEmail'
import {connectToDatabase } from '../../../lib/mongodb';
import {
  singInCallBack,
  sessionCallBack,
  jwtCallBack
} from '../../../lib/authCallBacks';
import Adapters from 'next-auth/adapters'
const Pusher = require("pusher");
export const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  useTLS: true,
});

export const options = {
    providers: [
        Providers.Facebook({
            clientId: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_SECRET,
        }),
        Providers.Google({
          clientId: process.env.GOOGLE_ID,
          clientSecret: process.env.GOOGLE_SECRET
        }),
        Providers.Twitter({
          clientId: process.env.TWITTER_ID,
          clientSecret: process.env.TWITTER_SECRET
        }),
        Providers.Email({
          server: process.env.EMAIL_SERVER, 
          from: process.env.EMAIL_FROM,
          sendVerificationRequest: ({ identifier: email, url, token, baseUrl, provider}) => { 
            mySendVerificationRequest({  identifier: email, url, token, baseUrl, provider }).then((data) => {return data})
           },
        }),
    ],
    // database: process.env.DATABASE_URL,
    secret: process.env.SECRET,
    debug: false,
    session:{jwt: false},
    maxAge: 10 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
    adapter: Adapters.TypeORM.Adapter({
      type: 'mongodb',
      url: process.env.DATABASE_URL,
      database: 'charts',
      synchronize: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      retryWrites: false,
      socketTimeoutMS: 30000,
      keepAlive: true,
    }),
    jwt:{
        encryption: true,
        secret: process.env.SECRET,
    },
    events: {
        signIn: async (message) => {
          const newEmailUser = message.isNewUser && message.account.id === 'email' && message.account.type === 'email'
          console.log("singin")
          async function run() {
            try {
              const { db } = await connectToDatabase();
            const users = await db.collection("users");
            const filter = { _id: message.user.id};
            const updateDoc = {
              $set: {
                online: true,
              },
            };
            const updateDocImage = {
              $set: {
                online: true,
                name : "Guest",
                image: 'https://source.unsplash.com/random'
              },
            };
            const options = { upsert: true, returnOriginal: false, setDefaultsOnInsert: true }
            if(newEmailUser){
              console.log("newemail user update photo and status")
              pusher.trigger("private-Chat-development", "user-login", {
                value: {...message.user, 
                online: true,
                name : "Guest",
                image: 'https://source.unsplash.com/random'
              }
              });
              const result =users.findOneAndUpdate(filter, updateDocImage, options)
              // pusher.trigger("private-Chat-development", "user-login", {
              //   result
              // });
            }else{
              console.log("newuser update  status")
              pusher.trigger("private-Chat-development", "user-login", {
                value: {...message.user, online: true}
              });
              const result = await users.findOneAndUpdate(filter, updateDoc, options)
            }
            // const result = await users.updateOne(filter, updateDoc)
            // const imageExist =await users.find(filter).toArray().then((data)=> { return data[0].image})
            // if( imageExist === undefined){
            //   const result = await users.updateOne(filter, updateDocImage)
            //   const update = await users.updateOne(filter, updateDoc)
            //   console.log(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`)
            // }else{
            //   const result = await users.updateOne(filter, updateDoc)
            // }
            
            } finally { }
          }
          run().catch(console.dir);
        },
        signOut: async (message) => {
          console.log("singout")
          async function run() {
            try {
              const { db } = await connectToDatabase();
            const users = await db.collection("users");
            const filter = { _id: message.userId};
            const updateDoc = {
              $set: {
                online: false,
              },
            };
            pusher.trigger("private-Chat-development", "user-login", {
              value: {...message, online: false}
            });
            const options = { upsert: true, returnOriginal: false, setDefaultsOnInsert: true }
            const result = await users.findOneAndUpdate(filter, updateDoc, options)
            console.log("newuser update  status")
            } finally {
            }
          }
          run().catch(console.dir);
         },
        // createUser: async (message) => {console.log('event nextauth: ' + message)},
        // linkAccount: async (message) => {console.log('event nextauth: ' + message)},
        // session: async (message) => {console.log('event nextauth: ' + message)},
        // error: async (message) => {console.log('event nextauth: ' + message) }
      },
      pages:{
          // signIn: '/api/auth/signin',  // Displays signin buttons
       // signOut: '/api/auth/signout', // Displays form with sign out button
      // error: '/api/auth/error', // Error code passed in query string as ?error=
      // verifyRequest: '/api/auth/verify-request', // Used for check email page
        // newUser: null // If set, new users will be directed here on first sign in
      },
      callbacks: {
        async signIn(user, account, profile) {
          singInCallBack(user, account, profile)
          return true
        },
        async session(session, user) {
         await  sessionCallBack(session, user)
          return session
        },
        async jwt(token, user, account, profile, isNewUser){
          await jwtCallBack(token, user, account, profile, isNewUser)
          return token
        }
      }
}

export default (req, res) => NextAuth(req, res, options);