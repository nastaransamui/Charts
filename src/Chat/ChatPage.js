import React, {useEffect, useState} from 'react';
import useStyles from './chat-styles';
import PropTypes from 'prop-types';
import ChatBody from './ChatBody'
import ChatLeftPanel from './ChatLeftPanel'
import ChatHeaderPage from './ChatHeaderPage'
import ChatSendMessage from './ChatSendMessage'
import {
    Divider,
    Grid, Paper
} from '@material-ui/core';
import axios from 'axios';
import io from 'socket.io-client'
import moment from 'moment'
import aes256 from 'aes256'
import {useSelector, useDispatch} from 'react-redux';
import LoadingOverlay from 'react-loading-overlay';
import Pusher from 'pusher-js';
let pusher ;
// if(process.env.NEXTAUTH_URL.includes("vercel")){
 pusher = new Pusher(process.env.PUSHER_APP_KEY, {
     cluster: process.env.PUSHER_APP_CLUSTER,
     encrypted: true
    });
// }
const ChatPage = (props) => {
    const classes = useStyles();
    const {session, profile, ChatUsersProps, chatText} = props
    const [users, setUsers] = useState([])
    const [newUserFromPush, setNewUserFromPush] = useState(null)
    const [newChatFromPush, setNewChatFromPush] = useState(null)
    const [Msg, setMsg] = useState([])
    const [ChatValue, setChatValue] = useState('')
    const [reciver, setReciver] = useState(null)
    const [leftwidth, setLeftwidth] = useState(null)
    const {"next-i18next": nextI18Next }= useSelector(state => state)
    const dispatch = useDispatch();
    const [LoadingRoute, setLoadingRoute] = useState(false)
    const [ChatBodyLoadingRoute, setChatBodyLoadingRoute] = useState(true)
    var key = process.env.SECRET;
    useEffect(()=>{
        let  isMount = true;
        if (pusher === undefined) {
            const socket = io();
            if (isMount) {
            axios.get('/api/socketio')
            .then((data)=>{
                socket.sendBuffer = [];
                socket.emit("login", profile[0]._id);
                socket.on("users", data => {
                    setUsers(data)
                });
                socket.on('singOut', (data) => {
                    socket.emit("logout", profile[0]._id);
                    setUsers(data)
                  });
            })
        }
        return()=>{
            isMount = false;
            socket.off('login');
            socket.off('users');
            socket.off('singOut');
            socket.disconnect()
        }
        } else {
             const channel = pusher.subscribe('Chat-development')
                channel.bind('user-login', function(data) {
                setNewUserFromPush(data.value)
              });
            setLoadingRoute(true)
            setUsers(ChatUsersProps)
            setLoadingRoute(false)
            return() =>{
                isMount = false
                pusher.unsubscribe('Chat-development')
              }
        }
    },[])

 
    useEffect(()=>{
        let isMount = true
        if(isMount && pusher !== undefined){
            const channel = pusher.subscribe('Chat-development')
            channel.bind('chat', function(data) {
                setNewChatFromPush(data.value)
              });
        }
        return() =>{
          isMount = false
        }
    },[])

    useEffect(() =>{
        let isMount = true
        if(isMount && newUserFromPush !== null){
            if(newUserFromPush.online){
                let userIdLogin = newUserFromPush.id;
                var foundIndex = users.findIndex(x => x._id == userIdLogin);
                if(foundIndex === -1){
                    setUsers(oldusers =>[...oldusers, {...newUserFromPush, _id: newUserFromPush.id}])
                }else{
                    setLoadingRoute(false)
                    users[foundIndex] = {...users[foundIndex],online: newUserFromPush.online};
                    setUsers(oldusers =>[...oldusers])
                }
            }else{
                let userIdLogout = newUserFromPush.userId
                var foundIndex = users.findIndex(x => x._id == userIdLogout);
                users[foundIndex] = {...users[foundIndex],online: newUserFromPush.online};
                setUsers(oldusers=>[...oldusers])
                setLoadingRoute(false)
            }
        }
        return() =>{
            isMount = false;
        }
    }, [newUserFromPush])

    useEffect(() =>{
        let isMount = true
        if(isMount && newChatFromPush !== null){
            if (reciver !== null) {
                if(newChatFromPush.senderId !== profile[0]._id){
                    if(profile[0]._id ===newChatFromPush.reciverId && reciver._id === newChatFromPush.senderId){
                        setMsg(oldMsg=>[...oldMsg, newChatFromPush])
                    }
                }
            }
        }
        return() =>{
            isMount = false;
        }
    }, [newChatFromPush])

    const SendMessage =()=>{
        const now = moment().format()
        const senderId = profile[0]._id
        const reciverId = reciver._id
        const NewMessage = {
        name: session.user._id,
        senderId: senderId,
        reciverId: reciverId,
        body: aes256.encrypt(key, ChatValue),
        time: now
          }
        if (pusher === undefined) {
            const socket = io();
            socket.emit("sendMsg",NewMessage,profile[0]._id,reciver._id)
            setChatValue('')
            setMsg(oldMsg=>[
                ...oldMsg,NewMessage
            ])
            socket.on(`sendMsgReturn${profile[0]._id}${reciver._id}`, data =>{
                if(data[reciver._id] === undefined) setMsg(data[profile[0]._id])
                if(data[profile[0]._id] === undefined) setMsg(data[reciver._id])
            })
        } else {
            setChatValue('')
            setMsg(oldMsg=>[
                ...oldMsg,NewMessage
            ])
            axios.post('api/chat/sendMsg',{
                NewMessage: NewMessage,
                Sender: profile[0]._id,
                Reciver: reciver._id
            })
        }
    }

    const UserClicked =(d) =>{
        if (pusher === undefined) {
            const socket = io();
            if(reciver !==null && reciver._id !==d._id ){
                setChatBodyLoadingRoute(true)
                setReciver(d)
                setMsg([])
                socket.emit(`room`, profile[0]._id,d._id)
                setReciver(d)
                socket.on(`roomReturn${profile[0]._id}${d._id}`, data =>{
                    setChatBodyLoadingRoute(false)
                    setMsg(data[d._id])
                })
            }else{
                socket.emit(`room`, profile[0]._id,d._id)
                setReciver(d)
                socket.on(`roomReturn${profile[0]._id}${d._id}`, data =>{
                    setChatBodyLoadingRoute(false)
                    setMsg(data[d._id])
                })
            }
        } else {
            if(reciver !==null && reciver._id !==d._id ){
                setChatBodyLoadingRoute(true)
                setReciver(olddata => d)
                setMsg(olddata => [])
                axios.post('api/chat/getRooms',{
                    roomID: profile[0]._id,
                    guestID: d._id
                }).then((data)=>{
                    setChatBodyLoadingRoute(false)
                    setMsg(data.data.value[d._id])
                })
            }else{
                setReciver(d)
                axios.post('api/chat/getRooms',{
                    roomID: profile[0]._id,
                    guestID: d._id
                }).then((data)=>{
                    setChatBodyLoadingRoute(false)
                    setMsg(data.data.value[d._id])
                })
            }
        }
    }

    return(
        <div>
            <LoadingOverlay active={LoadingRoute} spinner text='Loading ...' >
            <Grid container>
                <ChatHeaderPage {...props}/>
                <Grid container component={Paper} className={classes.chatSection}>
                    <ChatLeftPanel users={users} UserClicked={UserClicked} {...props} leftwidth={leftwidth} setLeftwidth={setLeftwidth} />
                    <Grid item xs={9}>
                        {reciver !== null ? <ChatBody Msg={Msg} reciver={reciver} profile={profile} {...props} ChatBodyLoadingRoute={ChatBodyLoadingRoute}/> : 
                        <div className={classes.messageAreaReplacement}>
                            {chatText[`${nextI18Next}_users_empty`]}    
                        </div>}
                        <Divider />
                        {reciver !==null && <ChatSendMessage SendMessage={SendMessage} setChatValue={setChatValue} ChatValue={ChatValue} {...props}  leftwidth={leftwidth}/>}
                    </Grid>
                </Grid>
            </Grid>
            </LoadingOverlay>
        </div>
    )
}
ChatPage.propTypes = {
    session: PropTypes.object.isRequired,
    profile: PropTypes.array.isRequired,
}
export default ChatPage;