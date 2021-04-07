
import { getRoomsLive } from '../../../lib/chat/getRooms';

export default async(req, res) =>{
    const { roomID,  guestID } = req.body;
        res.json(await getRoomsLive(roomID, guestID));
}