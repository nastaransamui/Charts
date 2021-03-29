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
    const [pusherMassage, setPusherMassage] = useState(null)
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
                socket.emit("login", profile[0].name);
                socket.on("users", data => {
                    setUsers(data)
                });
                socket.on('singOut', (data) => {
                    socket.emit("logout", profile[0].name);
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
                console.log(data.value)
                setNewChatFromPush(data.value)
              });
        }
        return() =>{
          isMount = false
        }
    },[pusherMassage])

    useEffect(() =>{
        let isMount = true
        if(isMount && newUserFromPush !== null){
            if(newUserFromPush.online){
                let userIdLogin = newUserFromPush.id;
                var foundIndex = users.findIndex(x => x.name == userIdLogin);
                if(foundIndex === -1){
                    setUsers(oldusers =>[...oldusers, {...newUserFromPush, _id: newUserFromPush.id}])
                }else{
                    setLoadingRoute(false)
                    users[foundIndex] = {...users[foundIndex],online: newUserFromPush.online};
                    setUsers(oldusers =>[...oldusers])
                }
            }else{
                let userIdLogout = newUserFromPush.userId
                var foundIndex = users.findIndex(x => x.name == userIdLogout);
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
                if(newChatFromPush.senderId !== profile[0].name){
                    if(profile[0].name ===newChatFromPush.reciverId && reciver.name === newChatFromPush.senderId){
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
        const senderId = profile[0].name
        const reciverId = reciver.name
        const NewMessage = {
        name: profile[0].name,
        senderId: senderId,
        reciverId: reciverId,
        body: aes256.encrypt(key, ChatValue),
        time: now
          }
        if (pusher === undefined) {
            const socket = io();
            socket.emit("sendMsg",NewMessage,profile[0].name,reciver.name)
            setChatValue('')
            setMsg(oldMsg=>[
                ...oldMsg,NewMessage
            ])
            socket.on(`sendMsgReturn${profile[0].name}${reciver.name}`, data =>{
                if(data[reciver.name] === undefined) setMsg(data[profile[0].name])
                if(data[profile[0].name] === undefined) setMsg(data[reciver.name])
            })
        } else {
            setChatValue('')
            setMsg(oldMsg=>[
                ...oldMsg,NewMessage
            ])
            setPusherMassage(NewMessage)
            axios.post('api/chat/sendMsg',{
                NewMessage: NewMessage,
                Sender: profile[0].name,
                Reciver: reciver.name
            })
        }
    }
console.log(Msg)
    const UserClicked =(d) =>{
        if (pusher === undefined) {
            const socket = io();
            if(reciver !==null && reciver.name !==d.name ){
                setChatBodyLoadingRoute(true)
                setReciver(d)
                setMsg([])
                socket.emit(`room`, profile[0].name,d.name)
                setReciver(d)
                socket.on(`roomReturn${profile[0].name}${d.name}`, data =>{
                    setChatBodyLoadingRoute(false)
                    setMsg(data[d.name])
                })
            }else{
                socket.emit(`room`, profile[0].name,d.name)
                setReciver(d)
                socket.on(`roomReturn${profile[0].name}${d.name}`, data =>{
                    setChatBodyLoadingRoute(false)
                    setMsg(data[d.name])
                })
            }
        } else {
            if(reciver !==null && reciver.name !==d.name ){
                setChatBodyLoadingRoute(true)
                setReciver(olddata => d)
                setMsg(olddata => [])
                axios.post('api/chat/getRooms',{
                    roomID: profile[0].name,
                    guestID: d.name
                }).then((data)=>{
                    setChatBodyLoadingRoute(false)
                    setMsg(data.data.value[d.name])
                })
            }else{
                setReciver(d)
                axios.post('api/chat/getRooms',{
                    roomID: profile[0].name,
                    guestID: d.name
                }).then((data)=>{
                    setChatBodyLoadingRoute(false)
                    setMsg(data.data.value[d.name])
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