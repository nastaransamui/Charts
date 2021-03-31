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
    Paper,
    IconButton,
    Box
} from '@material-ui/core'
import useStyles, { AvatarOnline, AvatarOfline }  from './chat-styles';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import SearchIcon from '@material-ui/icons/Search';
import Copyright from '../Copyright';

function MobilePanel(props){
    const classes = useStyles();
    const Search = (e) =>{}
    const {users, UserMobileClicked,chatText, profile} = props
    const {"next-i18next": nextI18Next }= useSelector(state => state)
    const [showSearch, setShowSearch]   = useState(false);
    const Users =() =>{
        const wholeUsers = users
        // .filter((d)=>{return d.email !== profile[0].email})
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
    return(
        <Fragment>
            <Paper style={{width: "100%"}}>
                <Grid container direction="row" justify={showSearch ? "flex-end" : "space-between"} alignItems="center">
                {!showSearch ? 
                <List component="nav">
                    <ListItem button key={profile[0].name}>
                        <ListItemIcon>
                        <AvatarOnline style={{ float: 'right' }} overlap="circle" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
                            <Avatar alt={profile[0].name} src={profile[0].image} />
                        </AvatarOnline>
                        </ListItemIcon>
                        <ListItemText primary={profile[0].name}></ListItemText>
                    </ListItem>
                </List> :
                <Box style={{padding: 10, width: "90%"}}>
                <TextField   id="outlined-basic-email" label={chatText[`${nextI18Next}_search`]} variant="outlined" fullWidth  onChange={(e)=>Search(e)} />
                </Box>}
                
                <IconButton onClick={()=>{setShowSearch(!showSearch)}} >
                    <SearchIcon />
                </IconButton>
                </Grid>
                <Divider classes={{root: classes.mobileDivider}}/>
            </Paper>
            <Grid container direction="column" >
            <Grid item 
            style={{minHeight: "100%", height: 'auto',width: '100%',height: '80vh',overflowY: 'auto',}}
            >
            <List>
                {Users()}
            </List>
            </Grid>
            </Grid>
            <Copyright />
        </Fragment>
    )
}

MobilePanel.propTypes ={
    users : PropTypes.array.isRequired,
    UserMobileClicked : PropTypes.func.isRequired
}

export default MobilePanel;