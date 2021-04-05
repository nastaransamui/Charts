const Pusher = require("pusher");
export const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  useTLS: true,
});


export default async (req, res) =>{
        const {isTyping} = req.body;
        pusher.trigger("Chat-development", "isTyping", {
          value: {...isTyping}
        });
        res.json(isTyping);
}