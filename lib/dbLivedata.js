import {connectToDatabase } from './mongodb';
const stream = require('stream');
   
export async function dbLivedata (store){
    try {
    const { db } = await connectToDatabase();
    const Users = await db.collection("users");
    const Rooms = await db.collection("rooms");
    const changeStream = Users.watch({ fullDocument: 'updateLookup' });

    const AllUsers = async () =>{
        const result = Users.find({}).toArray();
        return await result
    } 
    const AllRooms = async ()=> {
        const result = Rooms.find({}).toArray()
        return await result
    } 
     let Majid = []
//      changeStream.on('change', (next) => {
//         AllUsers()
//    });
const Hashem = async (fullDocument)=>{
    return await AllUsers()
}
changeStream.stream().pipe(
    new stream.Writable({
        objectMode: true,
        write: function (doc, _, cb) {
            // console.log(doc);
            Hashem(doc.fullDocument);
            cb();
        }
     })
);
     store.dispatch({type: `chatUsers`, payload:JSON.stringify(await AllUsers())});

     return {
        AllRooms: JSON.stringify(await AllRooms()),
        users: JSON.stringify(await AllUsers()) ,
        Majid: JSON.stringify(await Majid),
        Hashem: JSON.stringify(await Hashem())
     }
    }catch(error){
        return error
    }
}