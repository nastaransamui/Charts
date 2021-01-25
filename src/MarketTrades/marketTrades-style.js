import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme)=>({
    appbar:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: theme.palette.background.paper,
      },
      tabsRoot: {
        minHeight: 24,
        height: 24,
        minWidth: 24,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.primary.main,
      },
      flexContainer: {
          display: 'flex',
          alignItems: 'center',
          boxSizing: 'border-box',
        },
        tableCell: {
          flex: 1,
        },
        tableRowHoverOnline: {
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: theme.palette.background.level1,
          },
        },
        tableRowHoverOffline: {
          '&:hover': {
            backgroundColor: theme.palette.background.default,
          },
        },
        TableCell:{
            background: 'red',
            maxWidth: 10
        }
}))

export default useStyles;