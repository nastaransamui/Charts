import { getSession } from 'next-auth/client'
import { setMsgLive } from '../../../lib/chat/sendMsg'
import {pusher} from '../auth/[...nextauth]'
export default async (req, res) =>{
    const session = await getSession({ req });
    const {NewMessage, Sender, Reciver} = req.body;
 
        pusher.trigger("Chat-development", "chat", {
          value: {...NewMessage}
        });
    if (session) {
        res.json(await setMsgLive(NewMessage, Sender, Reciver));
    } else {
        res.json({ error: 'You must be sign in to view the protected content on this page.' })
    }
}