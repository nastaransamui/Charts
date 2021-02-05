import React, {useEffect, useState} from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import { useSession } from 'next-auth/client';
import {
    Grid,
    Typography
} from '@material-ui/core';

export default function ChatHeaderPage (props){
    const [countdown, SetCountdown] = useState();
    const [session] = useSession();
  // count Down
  useEffect(()=>{
    let  isMount = true;
    var CountDown = setInterval(() => {
     if(isMount){
       if(session !== undefined){
        const ExpireDate = moment(session.expires).valueOf();
         const now = moment().valueOf();
         const distance = ExpireDate - now;
         const days = Math.floor(distance / (1000 * 60 * 60 * 24));
         const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
         const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
         const seconds = Math.floor((distance % (1000 * 60)) / 1000);
         SetCountdown(days + "d " + hours + "h "+ minutes + "m " + seconds + "s ")
       }
      }
    }, 1000);
     return() =>{
       isMount = false,
       clearInterval(CountDown)
     }
   },[session])
   
    return(
        <Grid item xs={12} style={{display:'flex', justifyContent:'space-between'}}>
        <Typography variant="h6" className="header-message">{session.user.name}</Typography>
        <Typography variant="h6" className="header-message" align="left">Expire :<Moment format="MMMM Do YYYY, h:mm a">{session.expires}</Moment> </Typography>
        <Typography variant="h6" className="header-message" align="left">{countdown} </Typography>
    </Grid>
    )
}