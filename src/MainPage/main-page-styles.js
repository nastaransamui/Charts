import { makeStyles } from '@material-ui/core/styles';

const sectionMargin = margin => (margin * 20);
const mainPageStyles = makeStyles(theme => ({ 
    mainWrap: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    background: theme.palette.type === 'dark' ? theme.palette.background.default : theme.palette.background.paper,
  },
  spaceBottom: {
    marginBottom: sectionMargin(theme.spacing()),
    [theme.breakpoints.down('md')]: {
      marginBottom: sectionMargin(6),
    }
  },
  spaceTop: {
    marginTop: sectionMargin(theme.spacing(7)),
    [theme.breakpoints.down('md')]: {
      marginTop: sectionMargin(6),
    }
  },
  spaceBottomShort: {
    marginBottom: sectionMargin(theme.spacing() / 2),
  },
  spaceTopShort: {
    marginTop: sectionMargin(theme.spacing() / 2),
  },
  containerWrap: {
    marginTop: -40,
    '& > section': {
      position: 'relative'
    }
  }
}))

export default mainPageStyles;