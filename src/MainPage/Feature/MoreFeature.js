import React, { useState } from 'react';
import useStyles from './feature-style';
import clsx from 'clsx';
import { ThemeProvider, createMuiTheme, useTheme } from '@material-ui/core/styles';
import {Container, Typography, Grid, Avatar, LinearProgress, useMediaQuery} from '@material-ui/core';
import ReactWOW from 'react-wow';
import Title from '../../components/Title'
import {useSelector} from 'react-redux';

const coinData = [
    {
      name: 'BTC',
      logo: '/images/crypto/btc.png',
      progress: 75,
      color: '#FBA630'
    },
    {
      name: 'DASH',
      logo: '/images/crypto/dash.png',
      progress: 40,
      color: '#21D3D7'
    },
    {
      name: 'NAN',
      logo: '/images/crypto/nan.png',
      progress: 90,
      color: '#548CCC'
    },
    {
      name: 'MNR',
      logo: '/images/crypto/mnr.png',
      progress: 35,
      color: '#FF6602'
    },
    {
      name: 'IOT',
      logo: '/images/crypto/iot.png',
      progress: 80,
      color: '#CE07D4'
    }
  ];
function MoreFeature(props) {
    const classes = useStyles();
    const [play, setPlay] = useState(false);
    const theme = useTheme();
    const {"next-i18next": nextI18Next }= useSelector(state => state)
    const {featureText} = props;
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const themeProgress = color => createMuiTheme({
    palette: {
      primary: {
        main: color
      }
    }
  });
  const handlePlay = () => {
    setTimeout(() => { setPlay(true); }, 200);
  };
    return(
        <div className={classes.moreFeature}>
            <Container fixed={isDesktop}>
                <div className={classes.item}>
                    <Grid container spacing={6} alignItems="center">
                        <Grid item md={6} xs={12}>
                            <div className={clsx(classes.text, isMobile && classes.center)}>
                                <span className="ion-ios-locked-outline" style={{top:-7}}/>
                                <Title text={featureText[`${nextI18Next}_more_title0`]} align={isMobile ? 'center' : 'left'} />
                                <Typography variant="subtitle1" display="block" gutterBottom align={isMobile ? 'center' : 'left'} >
                                {featureText[`${nextI18Next}_more_subtitle0`]}
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <ReactWOW animation="fadeInLeftBig" delay="0.3s" duration="1.3s">
                            <figure className={classes.illustration}>
                                <img src="/images/crypto/illustration1.png" alt="feature" />
                            </figure>
                            </ReactWOW>
                        </Grid>
                    </Grid>
                </div>
                <div className={classes.item}>
                    <Grid container direction={isMobile ? 'column-reverse' : 'row'} spacing={6} alignItems="center">
                        <Grid item md={6} xs={12}>
                        <ReactWOW animation="fadeInRightBig" offset={-100} delay="0.3s" duration="1.3s">
                        <figure className={classes.illustration}>
                        <img src="/images/crypto/illustration2.png" alt="feature" />
                        </figure>
                        </ReactWOW>
                        </Grid>
                        <Grid item md={6} xs={12}>
                        <div className={clsx(classes.text, isMobile && classes.center)}>
                            <span className="ion-ios-analytics-outline" style={{top: -4,left: 2}}/>
                            <Title text={featureText[`${nextI18Next}_more_title1`]} align={isMobile ? 'center' : 'left'} />
                            <Typography variant="h6" display="block" gutterBottom align={isMobile ? 'center' : 'left'} >
                            {featureText[`${nextI18Next}_more_subtitle1`]}
                            </Typography>
                        </div>
                        </Grid>
                    </Grid>
                </div>
                <div className={classes.item}>
                    <Grid container>
                        <Grid item sm={12}>
                            <div className={clsx(classes.text, classes.center)}>
                                <span className="ion-ios-bolt-outline" style={{top: -4}}/>
                                <Title  text={featureText[`${nextI18Next}_more_title2`]} align="center" />
                            <Typography variant="h6" display="block" gutterBottom align="center" >
                            {featureText[`${nextI18Next}_more_subtitle2`]}
                            </Typography>
                            </div>
                            <Container maxWidth="md">
                                <ReactWOW animation="fadeIn" offset={-100} duration="0s" callback={handlePlay}>
                                    <ul className={classes.progressWrap}>
                                    {coinData.map((item, index) => {
                                        return(
                                            <li key={index.toString()}>
                                                <div className={classes.coin}>
                                                <Avatar className={classes.logo} src={item.logo} alt={item.name} />
                                                <Typography variant="h5">
                                                    {item.name}
                                                </Typography>
                                                </div>
                                                <div className={classes.progress}>
                                                    <div className={classes.unit}>
                                                        <Typography variant="h6">
                                                            <span>USD</span>
                                                            &nbsp;5.000
                                                        </Typography>
                                                        <Typography variant="h6">
                                                            <span>USD</span>
                                                            &nbsp;15.000
                                                        </Typography>
                                                    </div>
                                                    <ThemeProvider theme={themeProgress(item.color)}>
                                                        <LinearProgress
                                                        variant="determinate"
                                                        value={play ? item.progress : 0}
                                                        classes={{root: classes.track, bar: classes.bar}} />
                                                    </ThemeProvider>
                                                </div>
                                            </li>
                                        )
                                    })}
                                    </ul>
                                </ReactWOW>
                            </Container>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </div>
    )
}

export default MoreFeature;