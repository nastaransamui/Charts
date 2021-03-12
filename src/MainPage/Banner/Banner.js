import React from 'react';
import useStyles,{ParticlesOptions} from './banner-style';
import { useTheme } from '@material-ui/core/styles';
import {Container,Grid,Typography, Button, useMediaQuery} from '@material-ui/core'
import Particles from 'react-particles-js';
import {useSelector} from 'react-redux';
function Banner(props){
    const classes = useStyles();
    const theme = useTheme();
    const isTablet = useMediaQuery(theme.breakpoints.down('sm'));
    const {banner} = props
    const {"next-i18next": nextI18Next }= useSelector(state => state)

    return(
        <div className={classes.root} >
        <div className={classes.canvasWrap}>
            <div className={classes.overlay}>
                <div className={classes.decoInner}>
                <Particles  style={{background: theme.palette.type === 'dark' ? `linear-gradient(-45deg, ${theme.palette.secondary.dark} 30%, ${theme.palette.primary.dark} 80%)` : `linear-gradient(-45deg, ${theme.palette.secondary.main} 30%, ${theme.palette.primary.main} 80%)`}} params={ParticlesOptions(theme, isTablet)}/>
                </div>
            </div>
        </div>
            <Container fixed >
           <div className={classes.bannerWrap}>
               <Grid container alignItems="center" spacing={6}>
                    <Grid item xs={12} md={8}>
                        <div className={classes.text}>
                            <Typography variant="h4">
                            {banner[`${nextI18Next}_banner_title`]}
                            </Typography>
                            <Typography component="p">
                            {banner[`${nextI18Next}_banner_subtitle`]}
                            </Typography>
                        </div>
                        <div className={classes.btnArea}>
                        <Button variant="contained" color="secondary" size="large">
                        {banner[`${nextI18Next}_banner_button1`]}
                        </Button>
                        <Button variant="contained" color="primary" size="large" >
                        {banner[`${nextI18Next}_banner_button2`]}
                        </Button>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <figure className={classes.objectArt}>
                            <img src="/images/crypto/banner-art.png" alt="illustration" />
                        </figure>
                    </Grid>
               </Grid>
           </div>
       </Container>
       <div className={classes.decoBottom}>
           <svg>
               <use xlinkHref="/images/crypto/deco-banner.svg#main" />
           </svg>
       </div>
       </div>
    )
}

export default Banner;