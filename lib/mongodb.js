const mongoose = require('mongoose');
const { DATABASE_URL, MONGODB_DB } = process.env
// import { MongoClient } from 'mongodb'
// const { DATABASE_URL, MONGODB_DB } = process.env

if (!DATABASE_URL) {
    throw new Error(
      'Please define the DATABASE_URL environment variable inside .env.local'
    )
  }
  
  if (!MONGODB_DB) {
    throw new Error(
      'Please define the MONGODB_DB environment variable inside .env.local'
    )
  }

  export async function connectToDatabase() {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      retryWrites: false,
    }
mongoose.connect(DATABASE_URL, opts)
const MongoClient = mongoose.connection;
return MongoClient
  }
//   let cached = global.mongo
//   if (!cached) {
//     cached = global.mongo = { conn: null, promise: null }
//   }

//   export async function connectToDatabase() {
//       if(cached.conn){
//           return cached.conn
//       }
//       if(!cached.promise){
//           const opts = {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             retryWrites: false,
//           }
//           cached.promise = MongoClient.connect(DATABASE_URL, opts).then((client) =>{
//             return{
//                 client,
//                 db: client.db(MONGODB_DB),
//             }
//         })
//       }
//       cached.conn = await cached.promise;
//       return cached.conn;
//   }