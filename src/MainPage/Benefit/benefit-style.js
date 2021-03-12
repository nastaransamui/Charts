import { makeStyles } from '@material-ui/core/styles';
const benefitStyles = makeStyles(theme => ({
    root: {
      position: 'relative',
      background: theme.palette.common.black,
    },
    wrapper: {
      position: 'relative',
      paddingTop: theme.spacing(10),
      [theme.breakpoints.up('lg')]: {
        paddingLeft: theme.spacing(8),
        paddingRight: theme.spacing(8)
      },
      [theme.breakpoints.up('sm')]: {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4)
      }
    },
    desc: {
      padding: 0,
      color: theme.palette.common.white,
      '& h4': {
        fontWeight: theme.typography.fontWeightMedium
      }
    },
    list: {
      display: 'block',
      margin: theme.spacing(3, 0, 5),
      listStyle: 'none',
      paddingLeft: 0,
      fontSize: 18,
      [theme.breakpoints.down('xs')]: {
        fontSize: 16,
      },
      '& li': {
        paddingLeft: theme.spacing(40),
        lineHeight: '38px',
        background: `url(/images/crypto/deco-list.png) no-repeat 0 10px`
      }
    },
    img: {
      margin: theme.spacing(1, 0, 0, 0),
      overflow: 'hidden',
      bottom: -40,
      position: 'relative',
      '& img': {
        maxWidth: '100%',
        display: 'block'
      }
    },
    labptop:{
        margin: theme.spacing(1, 0, 0, 0),
        overflow: 'hidden',
        bottom: -40,
        "& img":{
        zIndex: 1, 
        position:'absolute', 
        display: 'block',
        maxWidth: '100%',
        width:({labtopCurrHeight,labtopTopPosition, labtopCurrWidth,labtopLeftPosition,screenWidth,}) =>labtopCurrWidth -149, 
         height: ({labtopCurrHeight,labtopTopPosition, labtopCurrWidth,labtopLeftPosition,screenWidth,}) =>labtopCurrHeight -108 ,
        left: ({labtopCurrHeight,labtopTopPosition, labtopCurrWidth,labtopLeftPosition,screenWidth,}) =>labtopLeftPosition +76,
        top:  ({labtopCurrHeight,labtopTopPosition, labtopCurrWidth,labtopLeftPosition,screenWidth,}) =>labtopTopPosition +19,
        }
    },
    deco: {
      position: 'absolute',
      top: 10,
      right: 180,
    },
    parallaxWrap: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    },
    parallaxProps: {
      background: `url(/images/crypto/deco-benefit.svg) no-repeat center center`,
      height: 540,
    }
  }));
  


export default benefitStyles;