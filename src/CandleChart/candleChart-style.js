import { makeStyles } from '@material-ui/core/styles';
const tabHeight = '24px'
const tabWidth = '24px'
const useStyles = makeStyles((theme) => ({
  ticker:{
    position: 'relative',
    height: '44px!important',
    borderBottom: '1px solid',
    display: 'flex',
    '-webkit-box-orient': 'horizontal',
    '-webkit-box-direction': 'normal',
    flexDirection: 'row',
    borderRadius: '2px 2px 0 0',
  },
  symbolName: {
    fontSize: 16,
    fontWeight: 400,
  },
  priceContainer: {
    fontSize: 16,
    marginLeft: 8,
    padding: '5px 0',
    display: 'inline-block',
    verticalAlign: 'middle',
    textAlign: 'left',
  },
  containerSpan:{
    display: 'block!important',
    fontSize: 16,
    lineHeight: 1.25,
    fontWeight: 400
  },
  Estimate: {
    display: 'inline-block',
    verticalAlign: 'middle',
  },
  change: {
    marginRight: 1,
    display: 'inline-block',
    verticalAlign: 'middle',
    fontSize: 12,
    marginRight: 10
  },
  dtClass:{
      height: '16px', 
      lineHeight: '16px', 
      textAlign: 'right', 
      color: theme.palette.secondary.main
    },
    globalTheme: {
      float: 'right',
      display: '-webkit-box',
      display: '-ms-flexbox',
      display: 'flex',
      webkitBoxAlign: 'center',
      '-ms-flex-align': 'center',
      alignItems: 'center',
      position: 'absolute',
      right: 8,
      top: 10,
    },
    container: {
      width: '100%',
      webkitBoxFlex: 1,
      flex: 1,
      flexDirection: 'colum',
    },
    chartActions: {
      height: 24,
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
    buttonRoots: {
      height: tabHeight,
      color: theme.palette.primary.main,
    },
    root: {
		height: 370,
		overflowY: 'hidden',
		overflow: 'hidden',
		overflowX: 'hidden',
		display: 'flex'
	},
}))

export default useStyles