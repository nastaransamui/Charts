import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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
      toolTip: {
          backgroundColor: theme.palette.background.default,
          fontWeight: 600,
          fontSize: 12,
          color: theme.palette.primary.main,
          whiteSpace: 'pre-wrap',
          paddingRight: 20,
          borderRadius: 14,
          borderColor: theme.palette.secondary.main,
          border: 'solid 0.5px'
      },
      toolTipArrow:{
        color: theme.palette.background.default
      },
      tooltipPlacementLeft:{
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center'
      },
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
      buttonRoots: {
        height: 24,
        color: theme.palette.primary.main,
      },
}))

export default useStyles;