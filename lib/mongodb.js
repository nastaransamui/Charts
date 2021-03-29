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
      socketTimeoutMS: 30000,
      keepAlive: true,
    }
mongoose.connect(DATABASE_URL, opts)
const MongoClient = mongoose.connection;

return MongoClient
  }
