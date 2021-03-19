import { getSession } from 'next-auth/client'
import { setMsgLive } from '../../../lib/chat/sendMsg'

export default async (req, res) =>{
    const session = await getSession({ req });
    const {NewMessage, Sender, Reciver} = req.body;
    if (session) {
        res.json(await setMsgLive(NewMessage, Sender, Reciver));
    } else {
        res.json({ error: 'You must be sign in to view the protected content on this page.' })
    }
}