
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

export const  createId = () => {
  let s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
  }
  //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

const ChatPage = (props) => {
  const classes = useStyles();
  const [session] = useSession();
  const [ChatValue, setChatValue] = useState('')
  const {ChatsMessages, profile} = props
  const [Messages,SetMessages] = useState(ChatsMessages.length !== undefined ? ChatsMessages : [])
  const [state, SetState] = useState( { chats: [] })
  const [users, setUsers] = useState(null)
  const [reciver, setReciver] = useState(null)
  useEffect(()=>{
      let isMount = true;
      if (isMount) {
          fetch('http://localhost:3000/api/examples/users')
          .then(response => response.json())
          .then(data => {setUsers(data)})
      }
      return()=>{
          isMount = false
      }
  },[])
  

  const SendClicked = (e) =>{
    const now = moment().format()
    const senderId = profile._id
    const reciverId = reciver._id
    const NewMessage = [{
      id: createId(),
      sender: senderId,
      reciver: reciverId,
      name: session.user.name,
      body: ChatValue,
      time: now
    }]
    axios.post('/api/chat/messages' , NewMessage[0])
    .then((res)=>{
      const chats = res.data.messages;
      SetMessages(old => [...old, ...chats])
      console.log(chats)
      // SetState({chats})
    })
    setChatValue('')
}

  return (
      <div>
        {session !==undefined && <>
          <Grid container>
            <ChatHeaderPage />
          </Grid>
          <Grid container component={Paper} className={classes.chatSection}>
              <ChatLeftPanel {...props}  users={users} reciver={reciver} setReciver={setReciver}/>
              <Grid item xs={9}>
                  {reciver !== null &&<ChatBody {...props} reciver={reciver} users={users} Messages={Messages}/>}
                  <Divider />
                  {reciver !== null &&<ChatSendMessage reciver={reciver} users={users}  {...props} SendClicked={SendClicked} ChatValue={ChatValue} setChatValue={setChatValue}/>}
              </Grid>
          </Grid>
        </>
        }
      </div>
  );
}

export default ChatPage;
