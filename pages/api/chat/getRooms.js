import { getSession } from 'next-auth/client'
import { getRoomsLive } from '../../../lib/chat/getRooms';

export default async(req, res) =>{
    const session = await getSession({ req });
    const { roomID,  guestID } = req.body;
    if (session) {
        res.json(await getRoomsLive(roomID, guestID));
    } else {
        res.json({ error: 'You must be sign in to view the protected content on this page.' })
    }
}