import React, {Fragment,useRef, useEffect} from 'react';
import useStyles, { AvatarOnline, AvatarOfline }  from './chat-styles';
import {
    Grid, 
    Paper,
    List,
    ListItem,
    ListItemIcon,
    Avatar,
    ListItemText,
    IconButton,
    Divider,} from '@material-ui/core'
import PropTypes from 'prop-types';
import moment from 'moment'
import aes256 from 'aes256'
import LoadingOverlay from 'react-loading-overlay';
import {useSelector} from 'react-redux';
import ChatSendMessage from './ChatSendMessage'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
function MobileChatBody(props){
    const {themeName }= useSelector(state => state)
    const classes = useStyles({themeName});
    const {Msg, profile, reciver,setReciver, ChatBodyLoadingRoute, setChatValue, ChatValue, SendMessage} = props
    const messagesEndRef = useRef(null);
    var key = process.env.SECRET;
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
    useEffect(()=>{
        let isMount = true;
        if(isMount){
            scrollToBottom()
        }
        return()=>{
            isMount = false
        }
    },[Msg])
    const getCoversation =(Messages) =>{
        const listItems = Messages.map((message, index)=>{
        const profilePicture = message.senderId === profile[0]._id ? profile[0].image : reciver.image
        let bubbleClass = 'you';
        let bubbleDirection = '';
        if (message.senderId === profile[0]._id) {
            bubbleClass = 'me';
            bubbleDirection = classes.bubbleDirectionReverse;
        }
        return(
            <Fragment  key={index}>
                <div className={`${classes.bubbleContainer} ${bubbleDirection}`}>
                    <img className={`${classes.imgCircle}`} src={profilePicture} />
                    <div className={`${classes.bubble} ${classes[`${bubbleClass}`]}`}>
                        {aes256.decrypt(key, message.body)}
                        
                    </div>
                </div>
                <br/>
                <dd style={{float:message.senderId === profile[0]._id ? 'right' : 'left'}}>
                    {moment(message.time).format('HH:mm')}
                </dd>
                <br/>
            </Fragment>
        )
    });
    return listItems;
}

  return(
    <LoadingOverlay active={ChatBodyLoadingRoute} spinner text='Loading ...' >
         <Paper style={{width: "100%"}}>
         <Grid container direction="row-reverse" justify="space-between" alignItems="center">
                     <List component="nav">
                    <ListItem button key={reciver.name}>
                        <ListItemIcon>
                        {reciver.online ?
                    <AvatarOnline style={{float: 'right'}} overlap="circle" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
                        <Avatar alt={reciver.name} src={reciver.image} />
                    </AvatarOnline>:
                    <AvatarOfline style={{ float: 'right' }} overlap="circle" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
                        <Avatar alt={reciver.name} src={reciver.image} />
                    </AvatarOfline>
                    }
                        </ListItemIcon>
                        <ListItemText primary={reciver.name}></ListItemText>
                    </ListItem>
                </List>
                <IconButton onClick={()=>{setReciver(null)}} >
                    <ArrowBackIcon />
                </IconButton>
                </Grid>
                <Divider classes={{root: classes.mobileDivider}}/>
                </Paper>
        <Grid container direction="column" >
            <Grid item 
            style={{minHeight: "80%", height: 'auto',width: '100%',height: '70vh',overflowY: 'auto',}}
            >
            <List >
        <div className={classes.MobilmessageArea}>
            {Msg !== undefined && getCoversation(Msg)}
        </div>
        <div ref={messagesEndRef} />
    </List>
            </Grid>
            <Grid item 
            style={{minHeight: "10%", height: 'auto',width: '100%',height: '10vh',}}
            >
            <ChatSendMessage SendMessage={SendMessage} setChatValue={setChatValue} ChatValue={ChatValue} {...props} /> 
            </Grid>
        </Grid>
        </LoadingOverlay>
)
}

MobileChatBody.propTypes = {
    Msg: PropTypes.array.isRequired,
    reciver: PropTypes.object.isRequired,
    profile: PropTypes.array.isRequired,
    ChatBodyLoadingRoute: PropTypes.bool.isRequired,
}

export default MobileChatBody