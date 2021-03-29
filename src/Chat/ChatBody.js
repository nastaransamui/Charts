import React, {Fragment,useRef, useEffect, useState} from 'react';
import useStyles from './chat-styles';
import {List} from '@material-ui/core'
import { useSession } from 'next-auth/client';
import PropTypes from 'prop-types';
import moment from 'moment'
import aes256 from 'aes256'
import LoadingOverlay from 'react-loading-overlay';
import {useSelector} from 'react-redux';
function ChatBody(props){
    const {themeName }= useSelector(state => state)
    const classes = useStyles({themeName});
    const [session] = useSession();
    const {Msg, profile, reciver, ChatBodyLoadingRoute} = props
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
            const profilePicture = message.senderId === profile[0].name ? session.user.image : reciver.image
            let bubbleClass = 'you';
            let bubbleDirection = '';
            if (message.senderId === profile[0].name) {
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
                    <dd style={{float:message.senderId === profile[0].name ? 'right' : 'left'}}>
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
        <List className={classes.messageArea}>
            <div className={classes.MainMessages}>
                {Msg !== undefined && getCoversation(Msg)}
            </div>
            <div ref={messagesEndRef} />
        </List>
        </LoadingOverlay>
    )
}

ChatBody.propTypes = {
    Msg: PropTypes.array.isRequired,
    reciver: PropTypes.object.isRequired,
    profile: PropTypes.array.isRequired,
    ChatBodyLoadingRoute: PropTypes.bool.isRequired,
}

export default ChatBody