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
import {useSelector} from 'react-redux';
import LoadingOverlay from 'react-loading-overlay';
import Pusher from 'pusher-js';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MobilePanel from './MobilePanel';
import MobileChatBody from './MobileChatBody'
import Copyright from '../Copyright';
import { useChatEntrance, useChatFromPusher, useChatValue } from './chatHelpers'
let pusher ;
if(process.env.NEXTAUTH_URL.includes("vercel")){
 pusher = new Pusher(process.env.PUSHER_APP_KEY, {
     cluster: process.env.PUSHER_APP_CLUSTER,
     encrypted: true,
     activityTimeout: 50000,
     authEndpoint: '/api/pusher/auth',
    });
}
const ChatPage = (props) => {
    const classes = useStyles();
    const {profile, ChatUsersProps, chatText, SetShowToolbar, showToolbar} = props

    const [Msg, setMsg] = useState([])
    const [ChatValue, setChatValue] = useState('')
    const [reciver, setReciver] = useState(null)
    const [leftwidth, setLeftwidth] = useState(null)
    const {"next-i18next": nextI18Next }= useSelector(state => state)
    const [ChatBodyLoadingRoute, setChatBodyLoadingRoute] = useState(true)
    var key = process.env.SECRET;
    useEffect(()=>{
        let isMount = true;
        if(isMount && isMobile && reciver===null){
            window.scrollTo(0, 0)
        }
        return()=>{
            isMount = false
        }
    })
    const isMobile = useMediaQuery('(max-width:800px)');
    const {users, LoadingRoute, isTyping} =useChatEntrance({pusher, profile, reciver, ChatUsersProps, setMsg})
    useChatFromPusher({pusher, reciver, profile, setMsg})
    useChatValue({pusher, ChatValue, profile, reciver})


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
            socket.on(`sendMsgReturn${profile[0]._id}${reciver._id}`, data =>{
                if(data[reciver._id] === undefined) setMsg(data[profile[0]._id])
                if(data[profile[0]._id] === undefined) setMsg(data[reciver._id])
            })
        } else {
            setChatValue('')
            setMsg(oldMsg=>[
                ...oldMsg,NewMessage
            ])
            // setPusherMassage(NewMessage)
            const channel = pusher.subscribe('private-Chat-development')
            channel.trigger('client-chat', { value: NewMessage })
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
                    ChatBodyLoadingRoute={ChatBodyLoadingRoute}
                    isTyping={isTyping}/>
                    }
                </Grid>
                }
            </LoadingOverlay>
        </div>
    )
}

ChatPage.propTypes = {
    profile: PropTypes.array.isRequired,
    ChatUsersProps: PropTypes.array.isRequired,
    chatText: PropTypes.object.isRequired,
    SetShowToolbar: PropTypes.func.isRequired,
    showToolbar: PropTypes.bool.isRequired,
}
export default ChatPage;