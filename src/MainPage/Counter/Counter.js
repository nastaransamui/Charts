import React, { useState } from 'react';
import CountUp from 'react-countup';
import ReactWOW from 'react-wow';
import { Typography, Button, Container } from "@material-ui/core";
import useStyles from './counter-style';
import {  useRouter } from 'next/router'
import {useSelector} from 'react-redux';


function Counter(props){
    const classes = useStyles();
    const [play, setPlay] = useState(false);
    const router = useRouter()
    const {"next-i18next": nextI18Next }= useSelector(state => state)
    const {footerText, setLoadingRoute, LoadingRoute} = props;


    const countup = (val, isPlay) =>{
        return(
            <span>{isPlay ? <CountUp end={val} /> : 0}</span>
        )
    }
    const handlePlay = () =>{
        setTimeout(() => {
            setPlay(true);
        }, 200);
    }
    const LoginClicked = ()=>{
        setLoadingRoute(!LoadingRoute)
        router.push('/login')
      }
    return(
        <div className={classes.counterWrap}>
            <Container >
                <ReactWOW animation="fadeIn" offset={200} callback={handlePlay}>
                    <Typography variant="h2" variant="h2">
                        {countup(2, play)}
                        &nbsp;
                        {countup(234, play)}
                        &nbsp;
                        {countup(567, play)}
                    </Typography>
                    <Typography component="p" variant="h2">
                        {footerText[`${nextI18Next}_usercount`]}
                    </Typography>
                </ReactWOW>
                <div className={classes.callAction}>
                    <Typography variant="h2" gutterBottom variant="h2">
                        {footerText[`${nextI18Next}_waiting`]}
                    </Typography>
                    <Button variant="contained" onClick={LoginClicked} color="secondary" size="large" className={classes.button}>
                    {footerText[`${nextI18Next}_button`]}
                    </Button>
                </div>
            </Container>
        </div>
    )
}
export default Counter