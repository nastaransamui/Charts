
import React, {useEffect, useState} from 'react';
import useStyles from './chat-styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { useSession } from 'next-auth/client';
import ChatHeaderPage from './ChatHeaderPage';
import ChatLeftPanel from './ChatLeftPanel'
import ChatBody from './ChatBody'
import ChatSendMessage from './ChatSendMessage'
import moment from 'moment'
import axios from 'axios';

Array.prototype.last = function(){
    return this[this.length - 1];
}
export const ChatsMessages = [
  {
      id: 1,
      name: 'Majid Vezvaee',
      body: "Hey man, What's up ?Majid",
      time: "09:30"
  },
  {
      id: 2,
      name: 'Guest',
      body: "Hey, Iam Good! What about you ?Guest",
      time: "09:31"
  },
  {
      id: 3,
      name: 'Majid Vezvaee',
      body: "Cool. i am good, let's catch up!Majid",
      time: "09:32"
  },
  {
      id: 4,
      name: 'Guest',
      body: "This is Fourth Message from Guest",
      time: "09:33"
  },
  {
      id: 5,
      name: 'Majid Vezvaee',
      body: "This is 5th message from Majid",
      time: "09:34"
  },
  {
      id: 6,
      name: 'Majid Vezvaee',
      body: "This is 5th message from Majid",
      time: "11:34"
  },
  {
      id: 7,
      name: 'Majid Vezvaee',
      body: "This is 5th message from Majid",
      time: "11:34"
  },
  {
      id: 8,
      name: 'Guest',
      body: "This is Fourth Message from Guest",
      time: "09:33"
  },
  {
      id: 9,
      name: 'Guest',
      body: "This is Fourth Message from Guest",
      time: "09:33"
  },
  {
      id: 10,
      name: 'Guest',
      body: "This is Fourth Message from Guest",
      time: "09:33"
  },
]
export const  createId = () => {
  let s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
  }
  //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
const ChatPage = () => {
  const classes = useStyles();
  const [session] = useSession();
  const [ChatValue, setChatValue] = useState('')
  const [Messages,SetMessages] = useState(ChatsMessages)
  const [state, SetState] = useState( { chats: [] })

  const SendClicked = (e) =>{
    const now = moment().format('HH:mm')
    const NewMessage = [{
      id: createId(),
      name: session.user.name,
      body: ChatValue,
      time: now
    }]
    axios.post('/api/chat/messages' , NewMessage[0])
    .then((res)=>{
      const chats = res.data.messages;
      console.log(chats)
      SetState({chats})
    })
    setChatValue('')
    SetMessages(old => [...old, ...NewMessage])
}
  console.log(session)
  return (
      <div>
        {session !==undefined && <>
          <Grid container>
            <ChatHeaderPage />
          </Grid>
          <Grid container component={Paper} className={classes.chatSection}>
              <ChatLeftPanel />
              <Grid item xs={9}>
                  <ChatBody Messages={Messages}/>
                  <Divider />
                  <ChatSendMessage SendClicked={SendClicked} ChatValue={ChatValue} setChatValue={setChatValue}/>
              </Grid>
          </Grid>
        </>
        }
      </div>
  );
}

export default ChatPage;
