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
    Divider,
    useTheme
} from '@material-ui/core'
import PropTypes from 'prop-types';
import moment from 'moment'
import aes256 from 'aes256'
import LoadingOverlay from 'react-loading-overlay';
import {useSelector} from 'react-redux';
import MobileChatSendMessage from './MobileChatSendMessage'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
function MobileChatBody(props){
    const {themeName }= useSelector(state => state)
    const theme = useTheme();
    const classes = useStyles({themeName});
    const {
        Msg,
        profile,
        reciver,
        setReciver,
        ChatBodyLoadingRoute,
        setChatValue,
        ChatValue,
        SendMessage,
        SetShowToolbar, 
        isTyping
    } = props
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
    },[Msg, isTyping])
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
      <LoadingOverlay active={ChatBodyLoadingRoute} spinner text="Loading ...">
          <Paper style={{width: "100%"}}>
              <Grid container direction="row-reverse" justify="space-between" alignItems="center"
              style={{background: theme.palette.secondary.light,marginTop:-10,  position: 'fixed',  width: '100%', zIndex: 100}}>
                  <List component="nav">
                      <ListItem button key={reciver.name}>
                          <ListItemIcon>
                              {
                                  reciver.online 
                                  ?
                                  <AvatarOnline style={{float: 'right'}} overlap="circle" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
                                      <Avatar alt={reciver.name} src={reciver.image} />
                                  </AvatarOnline>
                                  :
                                  <AvatarOfline style={{ float: 'right' }} overlap="circle" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
                                      <Avatar alt={reciver.name} src={reciver.image} />
                                  </AvatarOfline>
                              }
                          </ListItemIcon>
                          <ListItemText primary={reciver.name}></ListItemText>
                      </ListItem>
                  </List>
                  <IconButton onClick={()=>{setReciver(null);SetShowToolbar(true)}}>
                      <ArrowBackIcon />
                  </IconButton>
              </Grid>
              <Divider classes={{root: classes.mobileDivider}}/>
          </Paper>
          <Grid container direction="column" style={{marginTop: 50}}>
              <Grid item style={{ height: "100%",width: '100%' }}>
                  <List>
                      <div className={classes.MobilmessageArea}>
                          {Msg !== undefined && getCoversation(Msg)}
                          {getCoversation(isTyping)}
                      </div>
                      <div ref={messagesEndRef} style={{marginBottom: 40}} />
                  </List>
              </Grid>
              <MobileChatSendMessage SendMessage={SendMessage} setChatValue={setChatValue} ChatValue={ChatValue} {...props} />
          </Grid>
      </LoadingOverlay>
  )
}
MobileChatBody.propTypes = {
    Msg: PropTypes.array.isRequired,
    reciver: PropTypes.object.isRequired,
    profile: PropTypes.array.isRequired,
    ChatBodyLoadingRoute: PropTypes.bool.isRequired,
    setReciver: PropTypes.func.isRequired,
    setChatValue: PropTypes.func.isRequired,
    ChatValue: PropTypes.string.isRequired,
    SendMessage: PropTypes.func.isRequired,
    SetShowToolbar: PropTypes.func.isRequired,
    isTyping: PropTypes.array.isRequired
}

export default MobileChatBody