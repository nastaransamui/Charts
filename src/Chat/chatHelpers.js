import { Fragment, useEffect, useState } from 'react';
import { AvatarOnline, AvatarOfline }  from './chat-styles';
import axios from 'axios';
import io from 'socket.io-client'
import moment from 'moment'
import aes256 from 'aes256'
import {
    ListItem,
    ListItemIcon,
    Avatar,
    ListItemText,
    Divider
} from "@material-ui/core"
var key = process.env.SECRET;
export function useChatEntrance({pusher, profile, reciver, ChatUsersProps,setMsg}){
    const [users, setUsers] = useState([])
    const [socketMassage, setSocketMassage] = useState(null)
    const [socketTyping, setSocketTyping] = useState(null)
    const [newUserFromPush, setNewUserFromPush] = useState(null)
    const [LoadingRoute, setLoadingRoute] = useState(false)
    const [isTyping, setIsTyping] = useState([])
    useEffect(()=>{
        let isMount = true;
        if (pusher === undefined) {
            const socket = io();
            if(isMount){
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
    return {users, LoadingRoute, isTyping}
}

export function useChatFromPusher({pusher, reciver, profile, setMsg}){
    const [newChatFromPush, setNewChatFromPush] = useState(null)
   
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
    return {newChatFromPush}
}

export function useChatValue({pusher, ChatValue, profile, reciver}){
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
}

export const MobileUsers = ({users, profile,UserMobileClicked,chatText, nextI18Next, classes})=>{
    const wholeUsers = users
    .filter((d)=>{return d.email !== profile[0].email})
    .map((d,i)=>{
        return(
            <Fragment key={`${d._id}${i}`}>
            <ListItem button  onClick={()=>{UserMobileClicked(d)}}>
                <ListItemIcon>
                {d.online ?
                <AvatarOnline style={{float: 'right'}} overlap="circle" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
                    <Avatar alt={d.name} src={d.image} />
                </AvatarOnline>:
                <AvatarOfline style={{ float: 'right' }} overlap="circle" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
                    <Avatar alt={d.name} src={d.image} />
                </AvatarOfline>
                }
                </ListItemIcon>
                <ListItemText primary={d.name}>{d.name}</ListItemText>
                {d.online ? 
                <ListItemText secondary={chatText[`${nextI18Next}_online`]} align="right"></ListItemText> : <ListItemText secondary={chatText[`${nextI18Next}_offline`]} align="right"></ListItemText>}
            </ListItem>
            <Divider classes={{root: classes.mobileDividerList}}/>
            </Fragment>
        )
    })
    return wholeUsers
}