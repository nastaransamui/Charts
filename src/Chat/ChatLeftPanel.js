import React, { Fragment, useEffect, useRef, useState } from 'react';
import {
    Grid,
    List,
    ListItem,
    ListItemIcon,
    Avatar,
    ListItemText,
    Divider,
    TextField,
    Paper
} from '@material-ui/core'
import useStyles, { AvatarOnline, AvatarOfline }  from './chat-styles';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';

function ChatLeftPanel(props){
    const classes = useStyles();
    // const [session] = useSession();
    const Search = (e) =>{}
    const {users, UserClicked, profile, chatText, setLeftwidth} = props
    const {"next-i18next": nextI18Next }= useSelector(state => state)
    
    const widthofLeft = useRef()
    const [screenWidth, setWidth]   = useState(window.innerWidth);
 
    const Users =() =>{
        const wholeUsers = users
        .filter((d)=>{return d.email !== profile[0].email})
        .map((d,i)=>{
            return(
                <ListItem button key={`${d._id}${i}`} onClick={()=>{UserClicked(d)}}>
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
                    {d.online ? <ListItemText secondary={chatText[`${nextI18Next}_online`]} align="right"></ListItemText> : <ListItemText secondary={chatText[`${nextI18Next}_offline`]} align="right"></ListItemText>}
                </ListItem>
            )
        })
        return wholeUsers
    }
    const updateDimensions = () => {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);
    useEffect(()=>{
        let isMount = true;
        // if(session !== null && session !== undefined)
        setLeftwidth(widthofLeft.current.clientWidth)
        const sizeInterval = setInterval(() => {
            if(isMount && widthofLeft.current !== undefined){
                setLeftwidth(widthofLeft.current.clientWidth)
            }
        }, 300);
        return()=>{isMount =false; clearInterval(sizeInterval)}
    },[screenWidth])
    
    return(
        <Fragment>
            {/* {(session !== null && session !== undefined) && */}
            <Grid item xs={3} className={classes.borderRight500} ref={widthofLeft}>
                <Paper>
                    <List component="nav">
                        <ListItem button key={profile[0].name}>
                            <ListItemIcon>
                                <AvatarOnline style={{ float: 'right' }} overlap="circle" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
                                    <Avatar alt={profile[0].name} src={profile[0].image} />
                                </AvatarOnline>
                            </ListItemIcon>
                            <ListItemText primary={profile[0].name}></ListItemText>
                        </ListItem>
                    </List>
                    <Divider classes={{root: classes.divider}}/>
                    <Grid item xs={12} style={{padding: '10px'}}>
                        <TextField id="outlined-basic-email" label={chatText[`${nextI18Next}_search`]} variant="outlined" fullWidth onChange={(e)=>Search(e)} />
                    </Grid>
                    <Divider classes={{root: classes.divider}}/>
                </Paper>
                <List>
                    {Users()}
                </List>
            </Grid>
            {/* } */}
        </Fragment>
    )
}

ChatLeftPanel.propTypes ={
    users : PropTypes.array.isRequired,
    UserClicked : PropTypes.func.isRequired
}

export default ChatLeftPanel;