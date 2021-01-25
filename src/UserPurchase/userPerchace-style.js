import { makeStyles } from '@material-ui/core/styles';
const tabHeight = '44px'
const tabWidth = '44px'
const useStyles = makeStyles((theme) => ({
    container:{
        width: '100%',
        webkitBoxFlex: 1,
        flex: 1,
        flexDirection: 'colum',
    },
    chartActions:{
        height: 44,
        display: 'flex',
        fontSize: 12,
    },
    appbar:{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: theme.palette.background.paper,
    },
    tabsRoot: {
      minHeight: tabHeight,
      height: tabHeight,
      minWidth: tabWidth,
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.primary.main,
    },
    tabRoot: {
      minHeight: tabHeight,
      height: tabHeight,
      minWidth: tabWidth,
    },
    MainStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 220,
    padding: 5,
    overflow: 'hidden'
    },
    SpanSale:{
        minHeight: '100%',
        paddingLeft: 5,
        '& > *': {
          margin: theme.spacing(6),
        },
    },
    SpanBuy:{
        minHeight: '100%',
        paddingRight: 5,
        '& > *': {
          margin: theme.spacing(6),
        },
    },
    buttonRoots: {
      height: 22,
      color: theme.palette.primary.main,
    },
    marginFormSale: {
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(9),
    },
    marginFormBuy: {
    paddingLeft: theme.spacing(9),
    paddingRight: theme.spacing(18),
    },
    total: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dt: {
        height: '16px', 
        lineHeight: '16px', 
        textAlign: 'right', 
        color:'#61688a'
    },
    SliderBuy:{
      width: "95%",
      color: theme.palette.secondary.main,
    },
    SliderSale:{
      width: "95%",
      color: theme.palette.primary.main,
    },
    Login: {
      paddingRight: theme.spacing(70),
      fontWeight:800,
      color: 'black',
      cursor: 'pointer',
      "&:nth-child(2)": {
        paddingLeft: theme.spacing(70),
      },
    },
    Singup: {
      paddingRight: theme.spacing(70),
      fontWeight:800,
      color: 'black',
      cursor: 'pointer',
      "&:nth-child(2)": {
        paddingLeft: theme.spacing(60),
      },
    },
    LoginButton: {
      border: '1px solid #dfdfdf', 
      borderRadius: 4, 
      backgroundColor: theme.palette.primary.main,
      padding: 12,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    LoginedButtonBuy: {
      border: '1px solid #dfdfdf', 
      borderRadius: 4, 
      padding: 12,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: theme.palette.secondary.main,
      color: 'black'
    },
    LoginedButtonSell: {
      border: '1px solid #dfdfdf', 
      borderRadius: 4, 
      padding: 12,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: theme.palette.secondary.main,
      color: 'black'
    },
    Logedin:{
      cursor: 'pointer'
    },
    divider: {
      background: theme.palette.primary.main,
  },
}))

export default useStyles;