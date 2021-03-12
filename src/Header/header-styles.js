import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>({
    grow: {
      flexGrow: 1,
    },
    headerContent: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      '& nav': {
        alignItems: 'center',
        padding: theme.spacing(2),
        display: 'flex',
        [theme.breakpoints.down('md')]: {
          padding: theme.spacing(2, 0),
        },
      }
    },
    bar: {},
    invert: {},
    logo: {
      '& a': {
        textDecoration: 'none',
        display: 'flex',
        color: theme.palette.text.primary,
        alignItems: 'center',
        fontWeight: 100,
        [theme.breakpoints.down('sm')]: {
          color: theme.palette.common.white
        }
      },
      '& img': {
        transition: 'all 0.3s ease-out',
        width: 48,
        height: 48,
        marginLeft: theme.spacing(),
        [theme.breakpoints.only('md')]: {
          marginLeft: theme.spacing(2)
        },
      },
      '& svg':{
        transition: 'all 0.3s ease-out',
        width: 48,
        height: 48,
        cursor: 'pointer',
        marginLeft: theme.spacing(),
        [theme.breakpoints.only('md')]: {
          marginLeft: theme.spacing(2)
        },
      }
    },
    mobileMenu: {
      margin: theme.spacing(0, 1),
      [theme.breakpoints.down('sm')]: {
        display: 'none'
      },
      '& $bar': {
        backgroundColor: theme.palette.common.white,
        '&:after, &:before': {
          backgroundColor: theme.palette.common.white
        },
      },
      '&[class*="is-active"]': {
        '& $bar': {
          backgroundColor: theme.palette.text.secondary,
          '&:after, &:before': {
            backgroundColor: theme.palette.text.secondary
          }
        }
      }
    },
    menuItemMobile:{
      [theme.breakpoints.up('xs')]: { 
      marginTop: 42, 
      marginLeft: -10
      }, 
      [theme.breakpoints.up('sm')]: { 
      marginTop: 48, 
      marginLeft: 0
      },
    },
    popover: {
      backgroundColor: theme.palette.secondary.main,
      maxWidth: 200,
      paddingLeft: 16
    },
    headerButtons:{
      color: theme.palette.type === 'light' ? '#131625' : '#fafafa'
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    flag:{
      width: 20, height: 20
    },
    menuItemText:{
      margin: 'auto', width: '50%', padding:10
    }
  }))

  export default useStyles;