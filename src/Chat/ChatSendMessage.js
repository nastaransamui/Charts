import React, { useEffect, useState } from 'react';
import {
    Grid, 
    TextField, 
    Fab,
    InputAdornment,
    Tooltip
} from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send';
import useStyles from './chat-styles';
import PropTypes from 'prop-types';
import { useSession } from 'next-auth/client';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import {useTheme} from '@material-ui/core/styles'
import EmojiSymbolsIcon from '@material-ui/icons/EmojiSymbols';

function ChatSendMessage(props){
    const classes = useStyles();
    const theme = useTheme();
    const [session] = useSession();
    const {SendClicked, ChatValue, setChatValue, profile, reciver} = props
    const [keysPressed, setKeysPressed] = useState({})
    const [ShowEmoji, SetShowEmoji] = useState(false)
    const handleKeyUp = (e) =>{
        if (e.key !== undefined && ChatValue !== "") {
            if(keysPressed.Control && keysPressed.Enter){
                SendClicked(e)
            }
        }  
    }
    useEffect(()=>{
        let isMount = true;
        const handleControlEnterAdd = addEventListener('keydown', (e) =>{
            if(isMount){
                setKeysPressed({
                    ...keysPressed,
                    [`${e.key}`]: true
                })
            }
        })
        const handleControlEnterRemove = addEventListener('keyup', (e)=>{
            if(isMount){
                setKeysPressed({})
            }
        })
        return()=>{
            isMount = false;
            removeEventListener('keydown', handleControlEnterAdd)
            removeEventListener('keyup', handleControlEnterRemove)
        }
    })

    const openEmoji = () =>{
        SetShowEmoji(!ShowEmoji)
    }
    const EmojiClicked = (emoji,event)=>{
        setChatValue(ChatValue.concat(`${emoji.native}`))
    }


    const SendMessage =(e)=>{
        SendClicked(e)
        SetShowEmoji(false)
    }
    return(
        <Grid container style={{padding: '20px'}} className={classes.SendMain}>
            <Grid item xs={11}>
                {ShowEmoji &&
            <Picker set='google' 
            style={{ position: 'absolute', bottom: '19%', left: '26.2%'}} 
            theme={theme.palette.type}
            showPreview={false}
            showSkinTones={false}
            emojiTooltip
            onClick={(emoji,event)=>{EmojiClicked(emoji,event)}}/>}
            {profile !== undefined &&
                <TextField 
                autoComplete="off"
                variant="outlined"
                multiline
                id="chat" 
                label="Type Something" 
                fullWidth 
                value={ChatValue} 
                onChange={(e)=>setChatValue(e.target.value)}
                onKeyUp={handleKeyUp}
                InputProps={{
                    endAdornment:
                    <Tooltip arrow title={ShowEmoji ? "Hide Emoji": "Show Emoji"} placement="top-end" >
                        <InputAdornment position="start" onClick={()=>openEmoji()} style={{cursor: 'pointer'}}>
                        <EmojiSymbolsIcon />
                    </InputAdornment>
                    </Tooltip>
                }}
                />}
            </Grid>
            <Grid item xs={1} align="right">
                <Fab color="primary" aria-label="add" disabled={ChatValue === ""} 
                onClick={(e)=>SendMessage(e)}><SendIcon /></Fab>
            </Grid>
        </Grid>
    )
}

ChatSendMessage.propTypes ={
    SendClicked: PropTypes.func.isRequired,
    ChatValue: PropTypes.string.isRequired,
    setChatValue: PropTypes.func.isRequired
}

export default ChatSendMessage;