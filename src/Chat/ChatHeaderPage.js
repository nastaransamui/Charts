import React, {useEffect, useState, Fragment} from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import { useSession } from 'next-auth/client';
import {useSelector} from 'react-redux';
import {
    Grid,
    Typography
} from '@material-ui/core';
import PropTypes from 'prop-types';

function ChatHeaderPage(props){
  const [countdown, SetCountdown] = useState();
  const {chatText} = props;
  const [session] = useSession();
  const {"next-i18next": nextI18Next }= useSelector(state => state)
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
         SetCountdown(days + chatText[`${nextI18Next}_day`] + hours +chatText[`${nextI18Next}_hours`]+ minutes + chatText[`${nextI18Next}_min`] + seconds + chatText[`${nextI18Next}_second`])
       }
      }
    }, 1000);
     return() =>{
       isMount = false,
       clearInterval(CountDown)
     }
   },[session, nextI18Next])
   return(
    <Fragment>
      {
        (session !== null && session !== undefined) &&
        <Grid item xs={12} style={{display:'flex', justifyContent:'space-between'}}>
          <Typography variant="h6" className="header-message">{session.user.name}</Typography>
          <Typography variant="h6" className="header-message" align="left">{chatText[`${nextI18Next}_expire`]} :<Moment locale={nextI18Next === "cn" && "zh_cn"} format="MMMM Do YYYY, h:mm a">{session.expires}</Moment> </Typography>
          <Typography variant="h6" className="header-message" align="left">{countdown} </Typography>
        </Grid>
      }
    </Fragment>
)
}
ChatHeaderPage.propTypes = {
  chatText: PropTypes.object.isRequired,
}
export default ChatHeaderPage;