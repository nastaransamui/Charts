import React, { Fragment } from 'react';
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
import { useSession } from 'next-auth/client';
import PropTypes from 'prop-types';


function ChatLeftPanel(props){
    const classes = useStyles();
    const [session] = useSession();
    const Search = (e) =>{}
    const {users, UserClicked} = props

    const Users =() =>{
        const wholeUsers = users.filter((d)=>{return d.email !== session.user.email}).map((d,i)=>{
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
                    {d.online ? <ListItemText secondary="online" align="right"></ListItemText> : <ListItemText secondary="ofline" align="right"></ListItemText>}
                </ListItem>
            )
        })
        return wholeUsers
    }

    return(
        <Fragment>
            {(session !== null && session !== undefined) &&
            <Grid item xs={3} className={classes.borderRight500}>
                <Paper>
                    <List component="nav">
                        <ListItem button key={session.user.name}>
                            <ListItemIcon>
                                <AvatarOnline style={{ float: 'right' }} overlap="circle" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
                                    <Avatar alt={session.user.name} src={session.user.image} />
                                </AvatarOnline>
                            </ListItemIcon>
                            <ListItemText primary={session.user.name}></ListItemText>
                        </ListItem>
                    </List>
                    <Divider classes={{root: classes.divider}}/>
                    <Grid item xs={12} style={{padding: '10px'}}>
                        <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth onChange={(e)=>Search(e)} />
                    </Grid>
                    <Divider classes={{root: classes.divider}}/>
                </Paper>
                <List>
                    {Users()}
                </List>
            </Grid>
            }
        </Fragment>
    )
}

ChatLeftPanel.propTypes ={
    users : PropTypes.array.isRequired,
    UserClicked : PropTypes.func.isRequired
}

export default ChatLeftPanel;