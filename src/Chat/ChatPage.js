import React, {useEffect, useState, useRef} from 'react';
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
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MobilePanel from './MobilePanel';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MobileChatBody from './MobileChatBody'
import Copyright from '../Copyright';
let pusher ;
// if(process.env.NEXTAUTH_URL.includes("vercel")){
 pusher = new Pusher(process.env.PUSHER_APP_KEY, {
     cluster: process.env.PUSHER_APP_CLUSTER,
     encrypted: true,
     activityTimeout: 50000,
     authEndpoint: '/api/pusher/auth',
    });
// }
const ChatPage = (props) => {
    const classes = useStyles();
    const {profile, ChatUsersProps, chatText, SetShowToolbar, showToolbar} = props
    const [users, setUsers] = useState([])
    const [newUserFromPush, setNewUserFromPush] = useState(null)
    const [newChatFromPush, setNewChatFromPush] = useState(null)
    const [pusherMassage, setPusherMassage] = useState(null)
    const [socketMassage, setSocketMassage] = useState(null)
    const [socketTyping, setSocketTyping] = useState(null)
    const [Msg, setMsg] = useState([])
    const [isTyping, setIsTyping] = useState([])
    const [ChatValue, setChatValue] = useState('')
    const [reciver, setReciver] = useState(null)
    const [leftwidth, setLeftwidth] = useState(null)
    const {"next-i18next": nextI18Next }= useSelector(state => state)
    const dispatch = useDispatch();
    const [LoadingRoute, setLoadingRoute] = useState(false)
    const [ChatBodyLoadingRoute, setChatBodyLoadingRoute] = useState(true)
    var key = process.env.SECRET;

    const isMobile = useMediaQuery('(max-width:800px)');

    useEffect(()=>{
        let isMount = true;
        if(isMount && isMobile && reciver===null){
            window.scrollTo(0, 0)
        }
        return()=>{
            isMount = false
        }
    })
    

    
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
                  socket.on("getMsg", data => {
                    setSocketMassage(data)
                  })
                  socket.on("returnTyping", data => {
                    setSocketTyping(data)
                  })
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
             const channel = pusher.subscribe('private-Chat-development')
            //  const privatechannel = pusher.subscribe('private-Chat-development')
             channel.bind("client-isTyping", function(data){
                setSocketTyping(data.value)
             })
                channel.bind('user-login', function(data) {
                setNewUserFromPush(data.value)
              });
            setLoadingRoute(true)
            setUsers(ChatUsersProps)
            setLoadingRoute(false)
            return() =>{
                isMount = false
                pusher.unsubscribe('private-Chat-development');
                pusher.disconnect();
              }
        }
    },[])

    useEffect(()=>{
        let isMount = true
        if(isMount && pusher !== undefined){
            const channel = pusher.subscribe('private-Chat-development')
            channel.bind('client-chat', function(data) {
                setNewChatFromPush(data.value)
              });
        }
        return() =>{
          isMount = false
        }
    },[newChatFromPush])

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

    useEffect(()=>{
        let isMount = true;
        if (pusher === undefined) {
            if(isMount){
                const socket = io();
                if(ChatValue !== ""){
                    const now = moment().format()
                    const senderId = profile[0]._id
                    const reciverId = reciver._id
                    let isTyping = {
                        name: senderId.name,
                        senderId: senderId,
                        reciverId: reciverId,
                        body: aes256.encrypt(key, "...is Typing"),
                        time: now
                      }
                    socket.emit("typing", isTyping);
                }else{
                    let isTyping =[]
                    socket.emit("typing", isTyping);
                }
            }
        }else{
            if(isMount){
                const channel = pusher.subscribe('private-Chat-development')
                if(ChatValue !== ""){
                    const now = moment().format()
                    const senderId = profile[0]._id
                    const reciverId = reciver._id
                    let isTyping = {
                        name: senderId.name,
                        senderId: senderId,
                        reciverId: reciverId,
                        body: aes256.encrypt(key, "...is Typing"),
                        time: now
                      }
                      channel.trigger('client-isTyping', { value: isTyping })
                }else{
                    let isTyping =[]
                    channel.trigger('client-isTyping', { value: isTyping })
                }
            }
        }
        
        return()=>{
            isMount = false
        }
    },[ChatValue])

    useEffect(()=>{
        let isMount = true;
        if (isMount) {
            if(reciver!== null && socketMassage!== null){
                if(socketMassage.reciverId === profile[0]._id){

            setMsg(oldMsg=>[
                ...oldMsg,socketMassage
            ])
                }
            }
        }
        return()=>{isMount}
    },[socketMassage])

    useEffect(()=>{
        let isMount = true;
        if (isMount) {
            if(reciver!== null && socketTyping!== null){
                if(socketTyping.reciverId === profile[0]._id){
                    setIsTyping(olddata=>[socketTyping])
                }else{
                    setIsTyping(olddata=>[])
                }
            }
        }
        return ()=>{isMount = false}
    },[socketTyping])

    const SendMessage =()=>{
        const now = moment().format()
        const senderId = profile[0]._id
        const reciverId = reciver._id
        const NewMessage = {
        name: profile[0].name,
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
            setPusherMassage(NewMessage)
            socket.on(`sendMsgReturn${profile[0]._id}${reciver._id}`, data =>{
                if(data[reciver._id] === undefined) setMsg(data[profile[0]._id])
                if(data[profile[0]._id] === undefined) setMsg(data[reciver._id])
            })
        } else {
            setChatValue('')
            setMsg(oldMsg=>[
                ...oldMsg,NewMessage
            ])
            setPusherMassage(NewMessage)
            const channel = pusher.subscribe('private-Chat-development')
            channel.trigger('client-chat', { value: NewMessage })
            // channel.bind('chat', function(data) {
            //     setNewChatFromPush(data.value)
            //   });
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
                setChatValue('')
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
                setChatValue('')
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

    const UserMobileClicked = (d)=>{
        if (pusher === undefined) {
            const socket = io();
            if(reciver !==null && reciver._id !==d._id ){
                SetShowToolbar(false)
                setChatBodyLoadingRoute(true)
                setReciver(olddata => d)
                setMsg(olddata => [])
                socket.emit(`room`, profile[0]._id,d._id)
                setReciver(d)
                socket.on(`roomReturn${profile[0]._id}${d._id}`, data =>{
                    setChatBodyLoadingRoute(false)
                    setMsg(data[d._id])
                })
            }else{
                SetShowToolbar(false)
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
                SetShowToolbar(false)
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
                SetShowToolbar(false)
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

    useEffect(()=>{
        let isMount = true;
        if(isMount && newUserFromPush !== null && reciver !== null){
            if(newUserFromPush.online){
                let userIdLogin = newUserFromPush.id;
                if(userIdLogin === reciver._id){
                    setReciver(olddata => ({...olddata, online: newUserFromPush.online}))
                }
            }else{
                let userIdLogout = newUserFromPush.userId
                if(userIdLogout === reciver._id){
                    setReciver(olddata => ({...olddata, online: newUserFromPush.online}))
                }
            }
        }
        return () =>{isMount = false}
    },[newUserFromPush])
    return(
        <div>
            <LoadingOverlay active={LoadingRoute} spinner text='Loading ...' >
                {
                    !isMobile ? 
                    <Grid style={{minHeight: '95vh'}}>
                    <ChatHeaderPage {...props}/>
                    <Grid container component={Paper} className={classes.chatSection}>
                        <ChatLeftPanel users={users} UserClicked={UserClicked} {...props} leftwidth={leftwidth} setLeftwidth={setLeftwidth} />
                        <Grid item xs={9}>
                            {reciver !== null ? <ChatBody 
                            Msg={Msg} reciver={reciver} 
                            profile={profile} 
                            {...props} 
                            ChatBodyLoadingRoute={ChatBodyLoadingRoute}
                            isTyping={isTyping}/> : 
                            <div className={classes.messageAreaReplacement}>
                                {chatText[`${nextI18Next}_users_empty`]}    
                            </div>}
                            <Divider />
                            {reciver !==null && <ChatSendMessage SendMessage={SendMessage} setChatValue={setChatValue} ChatValue={ChatValue} {...props}  leftwidth={leftwidth}/>}
                            <Copyright />
                        </Grid>
                    </Grid>
                </Grid>:
                <Grid >
                    {reciver ===null  ?
                    <>
                    <MobilePanel users={users} UserMobileClicked={UserMobileClicked} {...props} leftwidth={leftwidth} setLeftwidth={setLeftwidth} />
                    </>
                    :
                    
                    <MobileChatBody 
                    Msg={Msg} 
                    reciver={reciver} 
                    profile={profile} 
                    {...props} 
                    setChatValue={setChatValue} 
                    setReciver={setReciver}
                    ChatValue={ChatValue}
                    SendMessage={SendMessage}
                    SetShowToolbar={SetShowToolbar}
                    showToolbar={showToolbar}
                    ChatBodyLoadingRoute={ChatBodyLoadingRoute}/>
                    }
                </Grid>
                }
            </LoadingOverlay>
        </div>
    )
}
ChatPage.propTypes = {
    profile: PropTypes.array.isRequired,
}
export default ChatPage;