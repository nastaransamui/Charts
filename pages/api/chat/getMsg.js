import { getSession } from 'next-auth/client'
import { getMsgLive } from '../../../lib/chat/getMsg'

export default async (req, res) =>{
    const session = await getSession({ req });
    const {Sender, Reciver, Msg} = req.body;
    if (session) {
        res.json(await getMsgLive(Sender, Reciver, Msg));
    } else {
        res.json({ error: 'You must be sign in to view the protected content on this page.' })
    }
}