import { makeStyles } from '@material-ui/core/styles';
import { lighten } from '@material-ui/core/styles'
    const c1 = "#203075"
    const c2 = lighten(c1,  0.03)
const useStyles = makeStyles(theme =>({
    errorWrap: {
        width: '100%',
        minHeight: 680,
        display: 'flex',
        alignItems: 'center',
        paddingTop: theme.spacing(0),
        [theme.breakpoints.down('xs')]: {
          
        },
    },
    flex: {
      display: 'flex',
      justifyContent: 'flex-end',
      justifyContent: 'center',
      paddingRight:40,
    },
    deco:{
        position: 'relative',
        '& svg':{
            fill: theme.palette.primary.light,
            position: 'relative',
            width: 212,
            height: 240,
        },
        '& h3':{
            color: theme.palette.primary.dark,
            fontSize: 96,
            textTransform: 'capitalize',
            fontWeight: 700,
            zIndex: 1,
            position: 'absolute',
            width: '100%',
            textAlign: 'center',
            top: 70,
            left: 0
        },
        "&: before":{
            content: '""',
            width: 320,
            height: 230,
            position: 'absolute',
            top: theme.spacing(-30),
            left: theme.spacing(-50),
        }
    },
    text:{
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'column',
            display: 'flex',
            paddingLeft: theme.spacing(50),
            height: 230,
            borderLeft: `1px solid ${theme.palette.primary.dark}`,
          },
          [theme.breakpoints.down('xs')]: {
            textAlign: 'center',
            margin: theme.spacing(5, 0, 20),
          },
          '& h4': {
            fontWeight: theme.typography.fontWeightBold,
            marginBottom: theme.spacing(40),
            marginTop: theme.spacing(20),
          },
    },
    button: {
      marginTop: theme.spacing(40),
      width: "25%"
    }
}))

export default useStyles;