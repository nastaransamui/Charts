import React, { useEffect, useState } from 'react';
import {Grid,  TextField, Fab, InputAdornment,Tooltip, Dialog, DialogContent, DialogActions, Paper} from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send';
import useStyles from './chat-styles';
import PropTypes from 'prop-types';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import {useTheme} from '@material-ui/core/styles'
import EmojiSymbolsIcon from '@material-ui/icons/EmojiSymbols';
import {useSelector} from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import { Fragment } from 'react';

function MobileChatSendMessage(props){
    const {SendMessage, ChatValue, setChatValue, chatText} = props;
    const classes = useStyles();
    const theme = useTheme();
    const [keysPressed, setKeysPressed] = useState({})
    const [ShowEmoji, SetShowEmoji] = useState(false)
    const {"next-i18next": nextI18Next }= useSelector(state => state)
    const handleKeyUp = (e) =>{
        if (e.key !== undefined && ChatValue !== "") {
            if(keysPressed.Control && keysPressed.Enter){
                SendMessage(e)
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
    return(
        <Fragment>
           <Grid style={{background: theme.palette.secondary.dark,position: 'fixed',  width: "100%", zIndex: 150, bottom: 0, padding: 3}}>
           {ShowEmoji &&
                <Dialog 
                open={ShowEmoji} 
                onBackdropClick={()=>{SetShowEmoji(false)}} 
                BackdropProps={{style: {backgroundColor: 'transparent'}}}
                classes={{
                    // paper: classes.dialog,
                    // root: classes.dialogRoot,
                  }}>
                    <DialogActions>
                        <CloseIcon onClick={()=>{SetShowEmoji(false)}} style={{cursor: "pointer"}}/>
                    </DialogActions>
                    
                 <Picker  
                 set='google' 
                 className={classes.emojiPicker}
                 theme={theme.palette.type}
                 showPreview={false}
                 showSkinTones={false}
                 emojiTooltip
                 onClick={(emoji,event)=>{EmojiClicked(emoji,event)}}
                  />
                </Dialog>
                }
           <TextField
                autoComplete="off"
                variant="standard"
                multiline
                id="chat" 
                label={chatText[`${nextI18Next}_type`]} 
                fullWidth
                value={ChatValue} 
                onChange={(e)=>setChatValue(e.target.value)}
                onKeyUp={handleKeyUp}
                InputProps={{
                    endAdornment:
                    <Fragment>
                        {ChatValue !== "" && 
                       <InputAdornment position="start" onClick={(e)=>{SendMessage(),SetShowEmoji(false)}} style={{cursor: 'pointer'}}>
                       <SendIcon />
                       </InputAdornment>
                        
                        }
                    <Tooltip arrow title={ShowEmoji ? chatText[`${nextI18Next}_hide_emoji`]: chatText[`${nextI18Next}_show_emoji`] } placement="top-end" >
                          <InputAdornment position="start" onClick={()=>openEmoji()} style={{cursor: 'pointer'}}>
                            <EmojiSymbolsIcon />
                        </InputAdornment>
                    </Tooltip>
                    </Fragment>
                  }} />
           </Grid>
        </Fragment>
    )
}

MobileChatSendMessage.propTypes = {
    SendMessage: PropTypes.func.isRequired,
    ChatValue: PropTypes.string.isRequired,
    setChatValue: PropTypes.func.isRequired,
    chatText: PropTypes.object.isRequired
  }

export default MobileChatSendMessage;