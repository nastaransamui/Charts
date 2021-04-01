import { makeStyles,withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 650,
    },
    divider: {
      background: theme.palette.primary.main,
  },
  mobileDivider:{
    background: theme.palette.primary.main,

  },
    chatSection: {
      width: '100%',
      height: '80vh'
    },
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    borderRight500: {
        border: `1px solid ${theme.palette.primary.main}`,
        maxHeight: '110%',height:'auto', overflow: 'auto'
    },
    messageArea: {
      height: '77vh',
      overflowY: 'auto',
      border: `1px solid ${theme.palette.primary.main}`,
    },
    MobilmessageArea:{
      height: 'clac(100% - 3rem)',
      overflowY: 'scroll',
      padding: '1rem',
      paddingBottom: '0.5rem',
      border: `1px solid ${theme.palette.primary.main}`,
      // borderLeft: `1px solid ${theme.palette.primary.main}`,
    },
    messageAreaReplacement: {
      height: '80vh',
      overflowY: 'auto',
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      fontWeight: 500,
      fontSize: 25,
      textTransform: 'capitalize',
      border: `1px solid ${theme.palette.primary.main}`,
    },
    SendMain:{
        border: `1px solid ${theme.palette.primary.main}`,
    },
    MainMessages: {
        height: 'clac(100% - 3rem)',
        overflowY: 'scroll',
         padding: '1rem',
        paddingBottom: '0.5rem'
    },
    bubble:{
        backgroundColor:'green',
        borderRadius: 5,
        boxShadow: '0 0 6px #B2B2B2',
        display: 'block',
        padding: '10px 18px',
        position: 'relative',
        verticalAlign: 'top',
        color: 'white',
        wordWrap: 'break-word',
        "&::before":{
            backgroundColor: theme.palette.primary.main,
            content:'""',
            display: 'block',
            height: 16,
            position: 'absolute',
            top: '50%',
            transform: 'rotate( 29deg ) skew( -35deg )',
            '-moz-transform':    'rotate( 29deg ) skew( -35deg )',
            '-ms-transform':     'rotate( 29deg ) skew( -35deg )',
            '-o-transform':      'rotate( 29deg ) skew( -35deg )',
            '-webkit-transform': 'rotate( 29deg ) skew( -35deg )',
            width: 20
        }
    },
    you:{
        backgroundColor: theme.palette.primary.main,
        color: ({themeName}) => themeName === "oceanBlue" && 'black',
        whiteSpace: 'pre-wrap',
        marginLeft: 18,
        marginRight: 60,
        "&::before":{
            boxShadow: '-2px 2px 2px 0 rgba( 178, 178, 178, .4 )',
            left: -8,
            backgroundColor:theme.palette.primary.main
        }
    },
    me:{
        backgroundColor: theme.palette.secondary.main,
        color: ({themeName}) => themeName === "oceanBlue" && 'black',
        whiteSpace: 'pre-wrap',
        marginLeft: 60,
        marginRight: 18,
        "&::before":{
            boxShadow: '2px -2px 2px 0 rgba( 178, 178, 178, .4 )',
            right: -8,
            backgroundColor:theme.palette.secondary.main
        }
    },
    bubbleDirectionReverse:{
        flexDirection: 'row-reverse'
    },
    bubbleContainer:{
        marginTop: 8,
        marginBottom: 8,
        display: 'flex',
        fontSize: 14,
        alignItems: 'center'
    },
    imgCircle:{
        borderRadius: '50%',
        height: 42,
        width: 42
    },
    // emojiPicker:{
    //   position: 'absolute', bottom: 1000, left: 300,
    // },
    dialog:{
      position: 'absolute',
      left: leftwidth=> leftwidth,
      // top: theme.spacing(390),
    },
    dialogRoot:{
      
    },
  }));
export default useStyles;  

  //Online status
  export const AvatarOnline = withStyles(theme => ({
    badge: {
      backgroundColor: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: '$ripple 1.2s infinite ease-in-out',
        border: '1px solid #44b700',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }))(Badge);
  
  //Ofline status
  export const AvatarOfline = withStyles(theme => ({
  badge: {
    backgroundColor: '#f50000',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      border: '1px solid #f50000',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
  }))(Badge);