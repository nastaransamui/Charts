import React, {Fragment,useRef, useEffect} from 'react';
import useStyles from './chat-styles';
import {
    List,
} from '@material-ui/core'
import { useSession } from 'next-auth/client';
import PropTypes from 'prop-types';


function ChatBody(props){
    const classes = useStyles();
    const [session] = useSession();
    const {Messages} = props;
    const messagesEndRef = useRef(null);

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
            let bubbleClass = 'me';
            let bubbleDirection = '';
            if (message.name ===  session.user.name) {
                bubbleClass = 'you';
                bubbleDirection = classes.bubbleDirectionReverse;
            }
            return(
                <Fragment  key={index}>
                <div className={`${classes.bubbleContainer} ${bubbleDirection}`}>
                    <img className={`${classes.imgCircle}`} src={session.user.image} />
                    <div className={`${classes.bubble} ${classes[`${bubbleClass}`]}`}>{message.body}</div>
                </div>
                <br/>
                    <dd style={{float:message.name ===  session.user.name ? 'right' : 'left'}}>{message.time}</dd><br/>
                    </Fragment>
            )
        });
        return listItems;
    }

    return(
        <List className={classes.messageArea}>
            <div className={classes.MainMessages}>
                {getCoversation(Messages)}
            </div>
            <div ref={messagesEndRef} />
        </List>
    )
}

ChatBody.propTypes = {
    Messages: PropTypes.array.isRequired
}


export default ChatBody