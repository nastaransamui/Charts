import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {useSelector} from 'react-redux';
import Icon from '@material-ui/core/Icon';
import pageLinks from '../../public/text/pageLinks'
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
  const {openDrawer, header} = props
  const {"next-i18next": nextI18Next }= useSelector(state => state)
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
                <ListItem button component="a" href='/' >
                  <ListItemIcon ><Icon>homeIcon</Icon></ListItemIcon>
                  <ListItemText primary={header[`${nextI18Next}_Home`]}  />
                </ListItem>
                  {
                    pageLinks.map((t,i)=>{
                      return(
                        <ListItem button component="a" href={t.url} key={i.toString()}>
                          <ListItemIcon><Icon>{t.Icon}</Icon></ListItemIcon>
                          <ListItemText primary={header[`${nextI18Next}_${t.title}`]}  />
                        </ListItem>
                      )
                    })
                  }
          </List>
          <Divider />
          <List></List>
        </div>
      </Drawer>
    </div>
  );
}