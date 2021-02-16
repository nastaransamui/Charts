import React, {Fragment,useRef, useEffect} from 'react';
import useStyles from './chat-styles';
import {
    List,
} from '@material-ui/core'
import { useSession } from 'next-auth/client';
import PropTypes from 'prop-types';
import moment from 'moment'

function ChatBody(props){
    const classes = useStyles();
    const [session] = useSession();
    const {Messages} = props;
    const messagesEndRef = useRef(null);
    const {profile, reciver} = props

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }

      useEffect(()=>{
          let isMount = true;
          if (isMount) {
              scrollToBottom()
          }
          return() =>{
              isMount = false
          }
      },[Messages])
    const getCoversation =(Messages) =>{
        const listItems = Messages.map((message, index)=>{
            const profilePicture = message.sender === profile._id ? session.user.image : reciver.image
            let bubbleClass = 'you';
            let bubbleDirection = '';
            if (message.sender === profile._id) {
                bubbleClass = 'me';
                bubbleDirection = classes.bubbleDirectionReverse;
            }
            return(
                <Fragment  key={index}>
                <div className={`${classes.bubbleContainer} ${bubbleDirection}`}>
                    <img className={`${classes.imgCircle}`} src={profilePicture} />
                    <div className={`${classes.bubble} ${classes[`${bubbleClass}`]}`}>{message.body}</div>
                </div>
                <br/>
                    <dd style={{float:message.sender === profile._id ? 'right' : 'left'}}>{moment(message.time).format('HH:mm')}</dd><br/>
                    </Fragment>
            )
        });
        return listItems;
    }

    return(
        <List className={classes.messageArea}>
            <div className={classes.MainMessages}>
                {Messages.length > 0 && getCoversation(Messages)}
            </div>
            <div ref={messagesEndRef} />
        </List>
    )
}

ChatBody.propTypes = {
    Messages: PropTypes.array.isRequired
}


export default ChatBody