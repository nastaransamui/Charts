import { Server } from 'socket.io'
import { getSession } from 'next-auth/client'
import {connectToDatabase } from '../../lib/mongodb'
var Ably = require('ably');

const ioHandler = async (req, res) => {
  const { db } = await connectToDatabase();
    const Users = await db.collection("users");
    const Rooms = await db.collection("rooms");
    const io = new Server(res.socket.server)
    var ably = new Ably.Realtime('m2oVcw.3II4_w:u-1NYIH5tM5yrzqJ');
    var channel = ably.channels.get('test');
    channel.publish('greeting', 'hello');
    res.send(await Users.find({}).toArray())
}

export const config = {
  api: {
    bodyParser: false
  }
}

export default ioHandler