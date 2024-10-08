import { makeStyles } from '@material-ui/core/styles';
import { lighten, darken, fade } from '@material-ui/core/styles/colorManipulator';
const bannerStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    [theme.breakpoints.up('md')]: {
      height: 700,
    },
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(5)
    }
  },
  canvasWrap: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    background: theme.palette.type === 'dark' ? `linear-gradient(-45deg, ${theme.palette.secondary.dark} 30%, ${theme.palette.primary.dark} 80%)` : `linear-gradient(-45deg, ${theme.palette.secondary.main} 30%, ${theme.palette.primary.main} 80%)`,
    '&:after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.2)'
    }
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.type === 'dark' ? fade(theme.palette.primary.dark, 0.7) : fade(theme.palette.primary.main, 0.7),
  },
  particleBackground: {
    position: 'absolute',
    width: '100%',
    height: 600,
    '& canvas': {
      [theme.breakpoints.down('md')]: {
        display: 'none'
      }
    }
  },
  bannerWrap: {
    position: 'relative',
    zIndex: 1
  },
  objectArt: {
    '& img': {
      position: 'relative',
      zIndex: 1,
      left: -130,
      maxWidth: 560,
      [theme.breakpoints.down('md')]: {
        top: 120
      }
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  text: {
    color: theme.palette.text.primary,
    [theme.breakpoints.up('lg')]: {
      marginTop: theme.spacing(20),
    },
    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing(12),
    },
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
      marginTop: theme.spacing(20),
    },
    '& h4': {
      marginBottom: theme.spacing(2),
    }
  },
  btnArea: {
    marginTop: theme.spacing(5),
    position: 'relative',
    zIndex: 2,
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center'
    },
    '& button': {
      marginRight: theme.spacing(3),
      [theme.breakpoints.down('xs')]: {
        marginBottom: theme.spacing(3),
        height: 50
      }
    }
  },
  decoBottom: {
    position: 'absolute',
    bottom: -50,
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
    '& svg': {
      width: 1400,
      height: 380,
      fill: theme.palette.type === 'dark' ? darken(theme.palette.primary.dark, 0.6) : lighten(theme.palette.primary.main, 0.84),
      [theme.breakpoints.up(1400)]: {
        transform: 'scale(2, 1)'
      },
      [theme.breakpoints.up('xl')]: {
        display: 'none'
      },
    }
  },
  decoInner: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  },
  hide: {
    visibility: 'hidden'
  }
}));
export default bannerStyles;
const fixMobileNumber = (isTablet)=> {return isTablet ? 80: 180}
export const ParticlesOptions = ((theme,isTablet) => {return {
  
    particles:{
      number:{
        value: fixMobileNumber(isTablet),
        denisty:{
          enable: true,
          value_area: 800
        },
      },
      color:{
        value: "#FFFFFF"
      },
      shape:{
        type: "circle",
        stroke:{
          width: 1,
          color: "#FFFFFF"
        },
        polygon:{
          nb_sides: 5
        }
      },
      opacity:{
        value: 0.5,
        random: false,
        anime:{
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false
        }
      },
      size:{
        value:3,
        random: true,
        anim:{
          enable: false,
          speed: 40,
          size_min: 0.1,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#FFFFFF',
        opacity: 0.4,
        width: 1
      },
      move:{
        enable: true,
        speed:2,
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'out',
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity:{
      detect_on: 'canvas',
      events: {
        onclick: {
          enable: true,
          mode: 'push'
        },
        resize: true
      },
      mode:{
        grab: {
          distance: 400,
          line_linked: {
            opacity: 1
          }
        },
      }
    },
    retina_detect: true
  }})