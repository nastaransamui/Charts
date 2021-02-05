import React, { useEffect, useState } from 'react';
import {
    Grid,
    List,
    ListItem,
    ListItemIcon,
    Avatar,
    ListItemText,
    Divider,
    TextField
} from '@material-ui/core'
import useStyles from './chat-styles';
import { useSession } from 'next-auth/client';


export default function ChatLeftPanel(props){
    const classes = useStyles();
    const [session] = useSession();
    const [users, setUsers] = useState(null)
    useEffect(()=>{
        let isMount = true;
        if (isMount) {
            fetch('http://localhost:3000/api/examples/users')
            .then(response => response.json())
            .then(data => {setUsers(data)})
        }
        return()=>{
            isMount = false
        }
    },[])

    const Search = (e) =>{

    }

    return(
        <Grid item xs={3} className={classes.borderRight500}>
                  <List>
                      <ListItem button key={session.user.name}>
                          <ListItemIcon>
                          <Avatar alt={session.user.name} src={session.user.image} />
                          </ListItemIcon>
                          <ListItemText primary={session.user.name}></ListItemText>
                      </ListItem>
                  </List>
                  <Divider />
                  <Grid item xs={12} style={{padding: '10px'}}>
                      <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth onChange={(e)=>Search(e)} />
                  </Grid>
                  <Divider />
                  {
                      users !== null &&
                      <List>
                      {users.filter((d)=> {return d.email !== session.user.email}).map((d,i) =>{
                          console.log(d)
                          return(
                              <ListItem button key={d._id}>
                                  <ListItemIcon>
                                      <Avatar alt={d.name} src={d.image} />
                                  </ListItemIcon>
                                  <ListItemText primary={d.name}>{d.name}</ListItemText>
                                    <ListItemText secondary="online" align="right"></ListItemText>
                              </ListItem>
                          )
                      })}
                    </List>
                  }
              </Grid>
              
    )
}