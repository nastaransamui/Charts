import React, { Fragment, useState } from 'react';
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
    Box,
    useTheme
} from '@material-ui/core'
import useStyles, { AvatarOnline }  from './chat-styles';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import SearchIcon from '@material-ui/icons/Search';
import Copyright from '../Copyright';
import {MobileUsers} from './chatHelpers'

function MobilePanel(props){
    const classes = useStyles();
    const Search = (e) =>{}
    const theme = useTheme();
    const {users, UserMobileClicked,chatText, profile} = props
    const {"next-i18next": nextI18Next }= useSelector(state => state)
    const [showSearch, setShowSearch]   = useState(false);

    return(
        <Fragment>
            <Paper style={{width: '100%'}}>
                <Grid container direction="row" justify={showSearch ? "flex-end" : "space-between"} alignItems="center"
                style={{background: theme.palette.secondary.light,marginTop:-10,  position: 'fixed',  width: '100%', zIndex: 100}}>
                    {
                        !showSearch 
                        ?
                        <List component="nav" >
                            <ListItem button key={profile[0].name}>
                                <ListItemIcon>
                                <AvatarOnline style={{ float: 'right' }} overlap="circle" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
                                    <Avatar alt={profile[0].name} src={profile[0].image} />
                                </AvatarOnline>
                                </ListItemIcon>
                                <ListItemText primary={profile[0].name} style={{color: 'black'}}></ListItemText>
                            </ListItem>
                        </List>
                        :
                        <Box style={{padding: 10, width: "80%"}} >
                            <TextField   id="outlined-basic-email" label={chatText[`${nextI18Next}_search`]} variant="outlined" fullWidth  onChange={(e)=>Search(e)} />
                        </Box>
                    }
                    <IconButton onClick={()=>{setShowSearch(!showSearch)}} >
                        <SearchIcon />
                    </IconButton>
                </Grid>
                <Divider classes={{root: classes.mobileDivider}}/>
            </Paper>
            <Grid container direction="column" style={{marginTop: 50}}>
                <Grid item style={{ minHeight: "100%", height: 'auto',width: '100%',height: '80vh',overflowY: 'auto' }}>
                    <List>
                        {MobileUsers({users, profile, UserMobileClicked, chatText, nextI18Next, classes})}
                    </List>
                </Grid>
            </Grid>
        </Fragment>
    )
}

MobilePanel.propTypes ={
    users : PropTypes.array.isRequired,
    UserMobileClicked : PropTypes.func.isRequired,
    profile : PropTypes.array.isRequired,
    chatText : PropTypes.object.isRequired,
}

export default MobilePanel;