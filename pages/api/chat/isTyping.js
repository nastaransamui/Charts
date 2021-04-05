const Pusher = require("pusher");
export const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  useTLS: true,
});


export default async (req, res) =>{
    const socketId = req.body.socket_id;
  const channel = req.body.channel_name;
  const presenceData = {
    user_id: "unique_user_id",
    user_info: {
      name: "Mr Channels",
      twitter_id: "@pusher"
    }
  };
  const auth = pusher.authenticate(socketId, channel, presenceData);
  res.send(auth);
}