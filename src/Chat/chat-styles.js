import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 650,
    },
    chatSection: {
      width: '100%',
      height: '80vh'
    },
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    borderRight500: {
        border: '1px solid #e0e0e0'
    },
    messageArea: {
      height: '70vh',
      overflowY: 'auto',
      border: '1px solid #e0e0e0',
    },
    SendMain:{
        border: '1px solid #e0e0e0',
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
    me:{
        backgroundColor: theme.palette.primary.main,
        whiteSpace: 'pre-wrap',
        marginLeft: 18,
        marginRight: 60,
        "&::before":{
            boxShadow: '-2px 2px 2px 0 rgba( 178, 178, 178, .4 )',
            left: -8,
            backgroundColor:theme.palette.primary.main
        }
    },
    you:{
        backgroundColor: theme.palette.secondary.main,
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
    }
  }));
export default useStyles;  