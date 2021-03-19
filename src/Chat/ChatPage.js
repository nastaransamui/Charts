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
// import io from 'socket.io-client'
import moment from 'moment'
import aes256 from 'aes256'
import {useSelector, useDispatch} from 'react-redux';
import LoadingOverlay from 'react-loading-overlay';

const ChatPage = (props) => {
    const classes = useStyles();
    const {session, profile, chatLiveData, ChatUsersProps} = props
    const [users, setUsers] = useState([])
    const [Msg, setMsg] = useState([])
    const [ChatValue, setChatValue] = useState('')
    const [reciver, setReciver] = useState(null)
    const [leftwidth, setLeftwidth] = useState(null)
    const {chatUsers }= useSelector(state => state)
    // const socket = io();
    const dispatch = useDispatch();
    const [LoadingRoute, setLoadingRoute] = useState(false)
    const [ChatBodyLoadingRoute, setChatBodyLoadingRoute] = useState(true)
    var key = process.env.SECRET;
    useEffect(()=>{
        // let isMount = true;
        // if (isMount) {
        //     axios.get('/api/socketio')
        //     .then((data)=>{
        //         socket.sendBuffer = [];
        //         // subscribe a new user
        //         socket.emit("login", session.user.name);
        //         // list of connected users
        //         socket.on("users", data => {
        //             setUsers(data)
        //         });
        //         socket.on('singOut', (data) => {
        //             socket.emit("logout", session.user.name);
        //             setUsers(data)
        //           });
        //     })
        // }
        // return()=>{
        //     isMount = false;
        //     socket.off('login');
        //     socket.off('users');
        //     socket.off('singOut');
        //     socket.disconnect()
        // }
    },[])

    const UserClicked =(d) =>{
        setChatBodyLoadingRoute(true)
        setReciver(d)
        setMsg([])
        // socket.emit(`room`, profile[0]._id,d._id)
        // setReciver(d)
        // socket.on(`roomReturn${profile[0]._id}${d._id}`, data =>{
        //     setMsg(data[d._id])
        // })
        axios.post('api/chat/getRooms',{
            roomID: profile[0]._id,
            guestID: d._id
        })
        .then((data)=>{
            // console.log(data.data.value[d._id])
            setMsg(data.data.value[d._id])
            setChatBodyLoadingRoute(false)
        })
    }
    useEffect(()=>{
        let  isMount = true;
        setLoadingRoute(true)
        var CountDown = setInterval(() => {
         if(isMount){
             axios.post('api/chat/getUsers',{
                 userId: profile[0]._id
             })
             .then((data)=>{
                setLoadingRoute(false)
                setUsers(data.data)
             })
          }
        }, 1000);
         return() =>{
           isMount = false
           clearInterval(CountDown)
         }
       },[])
       
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
          axios.post('api/chat/sendMsg',{
            NewMessage: NewMessage,
            Sender: profile[0]._id,
            Reciver: reciver._id
        })
        .then((data)=>{
            if(data.data.value[reciver._id] === undefined) setMsg(data.data.value[profile[0]._id])
            if(data.data.value[profile[0]._id] === undefined) setMsg(data.data.value[reciver._id])
            
        })

        // socket.emit("sendMsg",NewMessage,profile[0]._id,reciver._id)
        setChatValue('')
        // socket.on(`sendMsgReturn${profile[0]._id}${reciver._id}`, data =>{
        //     if(data[reciver._id] === undefined) setMsg(data[profile[0]._id])
        //     if(data[profile[0]._id] === undefined) setMsg(data[reciver._id])
        // })
    }


    useEffect(()=>{
        let  isMount = true;
        var CountDown = setInterval(() => {
         if(isMount && reciver !== null){
             axios.post('api/chat/getMsg',{
                Sender: profile[0]._id,
                Reciver: reciver._id,
                Msg: Msg
             })
             .then((data)=>{
                //  console.log(data.data)
                setMsg(data.data)
             })
          }
        }, 1000);
         return() =>{
           isMount = false
           clearInterval(CountDown)
         }
    },[])

    return(
        <div>
            <LoadingOverlay active={LoadingRoute} spinner text='Loading ...' >
            <Grid container>
                <ChatHeaderPage {...props}/>
                <Grid container component={Paper} className={classes.chatSection}>
                    <ChatLeftPanel users={users} UserClicked={UserClicked} {...props} leftwidth={leftwidth} setLeftwidth={setLeftwidth} />
                    <Grid item xs={9}>
                        {reciver !== null && <ChatBody Msg={Msg} reciver={reciver} profile={profile} {...props} ChatBodyLoadingRoute={ChatBodyLoadingRoute}/>}
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