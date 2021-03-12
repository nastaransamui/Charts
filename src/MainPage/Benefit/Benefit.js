import React, { useEffect, useRef, useState } from 'react';
import {Container,Typography, useMediaQuery, useTheme, Grid} from '@material-ui/core';
import useStyles from './benefit-style'
import { Parallax } from 'react-parallax';
import { useSelector } from 'react-redux'


function Benefit(props){
    const theme = useTheme();
    const {benefitText} = props;
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const [screenWidth, setWidth]   = useState(window.innerWidth);
  const {"next-i18next": nextI18Next }= useSelector(state => state)
  const updateDimensions = () => {
    setWidth(window.innerWidth);
}
useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
}, []);
const labtopRef = useRef()
const [labtopLeftPosition, setLabtopLeftPosition]   = useState(0);
const [labtopTopPosition, setLabtopTopPosition]   = useState(0);
const [labtopCurrHeight, setLabtopCurrHeight]   = useState(0);
const [labtopCurrWidth, setLabtopCurrWidth]   = useState(0);

useEffect(() =>{
    let isMount = true;
    if(isMount){
        setLabtopLeftPosition(labtopRef.current.offsetLeft)
        setLabtopTopPosition(labtopRef.current.offsetTop)
        var myImg = document.querySelector("#sky");
        var currWidth = myImg.clientWidth;
        var currHeight = myImg.clientHeight;
        setLabtopCurrHeight(currHeight),
        setLabtopCurrWidth(currWidth)
    }
    const ImageInterval = setInterval(() => {
        if(isMount){
            setLabtopLeftPosition(labtopRef.current.offsetLeft)
            setLabtopTopPosition(labtopRef.current.offsetTop)
            var myImg = document.querySelector("#sky");
            var currWidth = myImg.clientWidth;
            var currHeight = myImg.clientHeight;
            setLabtopCurrHeight(currHeight),
            setLabtopCurrWidth(currWidth)
        }
    }, 300);
    return()=>{isMount =false; clearInterval(ImageInterval)}
},[screenWidth])

const classes = useStyles({labtopCurrHeight,labtopTopPosition, labtopCurrWidth,labtopLeftPosition,screenWidth})

    return(
        <div className={classes.root}>
            <div className={classes.parallaxWrap} >
                <Parallax 
                bgImage={`https://fakeimg.pl/1280x677/${(theme.palette.primary.main).replace('#','')}/${(theme.palette.secondary.main).replace('#','')}/?retina=1&text=${benefitText[`${nextI18Next}_benefit`]}`}
                // bgImage={`https://via.placeholder.com/1280x677/${(theme.palette.primary.main).replace('#','')}/${(theme.palette.secondary.main).replace('#','')}/?text=Benefit`}
                bgImageAlt="benefit"
                strength={0}>
                    <div className={classes.parallaxProps} />
                </Parallax>
            </div>
            <Container fixed={isDesktop} >
                <div className={classes.wrapper}>
                    <Grid container>
                        <Grid item md={5}>
                            <div className={classes.desc}>
                                <Typography variant="h3" align={isMobile ? 'center' : 'left'}>
                                {benefitText[`${nextI18Next}_title`]}
                                </Typography>
                                <ul className={classes.list}>
                                <li>{benefitText[`${nextI18Next}_subtitle0`]}</li>
                                <li>{benefitText[`${nextI18Next}_subtitle1`]}</li>
                                <li>{benefitText[`${nextI18Next}_subtitle2`]}</li>
                                <li>{benefitText[`${nextI18Next}_subtitle3`]}</li>
                                <li>{benefitText[`${nextI18Next}_subtitle4`]}</li>
                                <li>{benefitText[`${nextI18Next}_subtitle5`]}</li>
                                <li>{benefitText[`${nextI18Next}_subtitle6`]}</li>
                                <li>{benefitText[`${nextI18Next}_subtitle7`]}</li>
                                </ul>
                            </div>
                        </Grid>
                        <Grid item md={7}>
                            <div >
                                <figure className={classes.labptop}>
                                    <img src="https://source.unsplash.com/random" alt="new"  />
                                </figure>
                                <figure className={classes.img}  ref={labtopRef}>
                                    <img src='/images/crypto/crypto_laptop.png' alt="benefit" id="sky" />
                                </figure>
                            </div>
                            <div className={classes.deco} style={{zIndex: 2}}>
                            <svg width="585px" height="151px" viewBox="0 0 585 151" version="1.1">
                                <defs>
                                <linearGradient x1="66.8412844%" y1="30.62426%" x2="-21.0581447%" y2="100%" id="benefitLinearGradient-2">
                                    <stop stopColor={theme.palette.secondary.main} offset="0%" />
                                    <stop stopColor={theme.palette.secondary.light} offset="100%" />
                                </linearGradient>
                                <linearGradient x1="66.8412844%" y1="30.62426%" x2="-21.0581447%" y2="100%" id="benefitLinearGradient-3">
                                    <stop stopColor={theme.palette.secondary.main} offset="0%" />
                                    <stop stopColor={theme.palette.secondary.light} offset="100%" />
                                </linearGradient>
                                </defs>
                                <g id="Benefit-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                <g id="Benefit-2" transform="translate(-143.000000, -88.000000)">
                                    <g id="Benefit-3" transform="translate(132.623862, 70.912032)">
                                    <path d="M15,67.3628158 C15,70.2420142 16.5400613,72.9026456 19.0401691,74.3422448 L45.8435518,89.7767212 C48.3436597,91.2163204 51.4237822,91.2163204 53.9238901,89.7767212 L80.7272727,74.3422448 C83.2273806,72.9026456 84.7674419,70.2420142 84.7674419,67.3628158 L84.7674419,36.4937339 C84.7674419,33.6144064 83.2273806,30.9539041 80.7272727,29.5141758 L53.9238901,14.0796994 C51.4237822,12.6401002 48.3436597,12.6401002 45.8435518,14.0796994 L19.0401691,29.5141758 C16.5400613,30.9539041 15,33.6144064 15,36.4937339 L15,67.3628158 Z" 
                                    id="BenefitFill-1" 
                                    fill="url(#benefitLinearGradient-3)" 
                                    transform="translate(49.883721, 51.928210) rotate(-330.000000) translate(-49.883721, -51.928210)" />
                                    <path d="M520.561173,148.252603 C520.561173,151.131802 522.101234,153.792433 524.601342,155.232033 L551.404725,170.666509 C553.904833,172.106108 556.984955,172.106108 559.485063,170.666509 L586.288446,155.232033 C588.788553,153.792433 590.328615,151.131802 590.328615,148.252603 L590.328615,117.383522 C590.328615,114.504194 588.788553,111.843692 586.288446,110.403963 L559.485063,94.9694871 C556.984955,93.5298879 553.904833,93.5298879 551.404725,94.9694871 L524.601342,110.403963 C522.101234,111.843692 520.561173,114.504194 520.561173,117.383522 L520.561173,148.252603 Z" 
                                    id="BenefitFill-2" 
                                    fill="url(#benefitLinearGradient-2)" 
                                    transform="translate(555.444894, 132.817998) rotate(-330.000000) translate(-555.444894, -132.817998)" 
                                    />
                                    </g>
                                </g>
                                </g>
                            </svg>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </div>
    )
}

export default Benefit;