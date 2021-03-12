import { makeStyles } from '@material-ui/core/styles'

const counterStyles = makeStyles(theme =>({
    counterWrap: {
      marginTop: theme.spacing(150),
        position: 'relative',
        textAlign: 'center',
        '& h2': {
          color: theme.palette.type === 'light' ? '#131625' : '#fafafa',
        },
        '& p': {
          marginTop: theme.spacing(1.5),
          color: theme.palette.type === 'light' ? '#131625' : '#fafafa'
        }
      },
      callAction: {
        marginTop: theme.spacing(10),
        position: 'relative',
        textAlign: 'center',
        color: theme.palette.common.white,
      },
      button: {
        margin: theme.spacing(40),
        width: theme.spacing(340),
        height: theme.spacing(40),
        color: theme.palette.type === 'light' ? '#131625' : theme.palette.primary.light
      }
}))

export default counterStyles;