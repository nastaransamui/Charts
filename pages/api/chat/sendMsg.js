
import { setMsgLive } from '../../../lib/chat/sendMsg'
const Pusher = require("pusher");
export const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  useTLS: true,
});

export default async (req, res) =>{
    // const session = await getSession({ req });
    
    const {NewMessage, Sender, Reciver} = req.body;

        pusher.trigger("Chat-development", "chat", {
          value: {...NewMessage}
        });
        setMsgLive(NewMessage, Sender, Reciver)
    // if (session) {
        res.json("done");
    // } else {
    //     res.json({ error: 'You must be sign in to view the protected content on this page.' })
    // }
}