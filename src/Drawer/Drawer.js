import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {useSelector, useDispatch} from 'react-redux';
import Button from '@material-ui/core/Button';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    background: theme.palette.secondary.main
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function ClippedDrawer(props) {
  const classes = useStyles();
  const {openDrawer} = props
  const router = useRouter()
  const dispatch = useDispatch();
  const {pairSymbol} = useSelector(state => state)
  return (
    <div className={classes.root}>
      <CssBaseline />
      
      <Drawer
        className={classes.drawer}
        variant={openDrawer ? "permanent" : 'temporary'}
        open={openDrawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {['Home', 'About', 'Dashboard'].map((text, index) => {
              const url = text === "Home" ? '/' : `/${text.toLowerCase()}`
              return(
                <ListItem button component="a" href={url}  key={text}>
                  <ListItemIcon >{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              )
            })}
          </List>
          <Divider />
          <List></List>
        </div>
      </Drawer>
    </div>
  );
}