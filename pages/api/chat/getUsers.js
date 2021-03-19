import { getSession } from 'next-auth/client'
import { getUsersLive } from '../../../lib/chat/getUsers'

export default async (req, res) =>{
    const session = await getSession({ req });
    const { userId } = req.body;
    if (session) {
        res.json(await getUsersLive(userId));
    } else {
        res.json({ error: 'You must be sign in to view the protected content on this page.' })
    }
}