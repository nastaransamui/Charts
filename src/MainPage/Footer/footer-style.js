import {makeStyles} from '@material-ui/core/styles';
import { fade, lighten, darken } from '@material-ui/core/styles/colorManipulator';

const footerStyles = makeStyles(theme =>({
    link: {
      margin: theme.spacing(1, 1.5),
    },
    invert: {},
    category: {},
    footer: {
        position: 'relative',
        padding: theme.spacing(10, 0),
        '& p': {
          color: theme.palette.text.primary,
          [theme.breakpoints.down('xs')]: {
            textAlign: 'center'
          },
        },
        '& ul': {
          margin: 0,
          padding: 0,
        },
        '& li': {
          listStyle: 'none',
          marginBottom: theme.spacing(),
          display: 'inline-block',
          width: '30%',
          marginRight: '3%',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          color: theme.palette.text.primary,
          [theme.breakpoints.down('xs')]: {
            width: '47%'
          },
          '& a': {
            fontSize: 14,
            textTransform: 'capitalize',
            textDecoration: 'none !important',
            color: theme.palette.text.primary,
            '&:hover': {
              color: theme.palette.secondary.light
            }
          }
        },
        '&$invert': {
          '& p': {
            color: theme.palette.text.primary
          },
          '& li a': {
            color: theme.palette.text.primary
          },
          '& $logo': {
            '& h6': {
              color: theme.palette.primary.dark
            }
          },
          '& $title': {
            color: theme.palette.secondary.main
          },
          '& $blogItem': {
            '& $category': {
              color: theme.palette.secondary.main
            }
          },
          '& $selectLang': {
            color: theme.palette.text.primary,
            '& svg': {
              color: theme.palette.text.primary,
            },
          },
        }
      },
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
        },
      },
      footerCounter: {
        position: 'relative',
        background: `linear-gradient(-130deg, ${theme.palette.type === 'dark' ? theme.palette.secondary.dark : theme.palette.secondary.main} -20%, ${theme.palette.type === 'dark' ? theme.palette.primary.dark : theme.palette.primary.main} 70%)`,
        paddingTop: theme.spacing(10),
        marginTop: theme.spacing(-240),
        [theme.breakpoints.up('md')]: {
          paddingTop: theme.spacing(25),
        },
        [theme.breakpoints.up('xl')]: {
          paddingTop: theme.spacing(15),
        }
      },
      decoTop: {
        position: 'absolute',
        top: -60,
        left: 0,
        width: 1280,
        height: 400,
        [theme.breakpoints.up('lg')]: {
          transform: 'scale(1.2)',
        },
        [theme.breakpoints.up(1400)]: {
          transform: 'scale(2, 1)'
        },
        [theme.breakpoints.down('xs')]: {
            transform: 'scale(2, 1)',
        },
        [theme.breakpoints.down('md')]: {
          transform: 'scale(1.4, 1)',
          left: 100,
        },
        [theme.breakpoints.down('sm')]: {
            transform: 'scale(1.4, 1)',
            left: -400,
        },
        '& svg': {
          width: '100%',
          height: '100%',
          fill: theme.palette.type === 'dark' ? darken(theme.palette.background.paper, 0.6) : lighten(theme.palette.background.default, 0.84),
          
        }
      },
      selectMenu: {
        background: 'none !important',
        marginLeft: 5,
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
          }
      },
      selectLang: {
        display: 'inherit',
        width: '40%',
        [theme.breakpoints.between('md','lg')]:{
            width: '90%'
        },
        margin: theme.spacing(20, 40, 40),
        color: theme.palette.text.primary,
        '& span $icon': {
          top: 29,
          color: theme.palette.primary.light,
          position: 'relative',
        },
        '& svg': {
          color: theme.palette.secondary.light,
          [theme.breakpoints.up('md')]:{
            left: 150,
          }
        },
        '& fieldset': {
          borderRadius: 10,
          boxShadow: '0 1.5px 12px 2px rgba(0, 0, 0, 0.06)',
          border: `1px solid ${fade(theme.palette.primary.light, 0.5)} !important`,
          '& legend': {
            top: 5,
            position: 'relative',
            borderTop: `1px solid ${fade(theme.palette.primary.light, 0.5)}`
          },
          '& + div + div': {
            background: 'none !important',
            padding: theme.spacing(1.5, 1.5, 1.5, 4),
            width: 'calc(100% - 32px)',
          }
        }
      },
      footerDesc: {
        display: 'block',
        fontSize: 14,
        marginBottom: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
          textAlign: 'center'
        },
      },
      icon: {},
      listText: {},
      quickLinks: {
        marginTop: theme.spacing(50)
      },  
      
      title: {
        color: theme.palette.secondary.light,
        fontSize: 14,
        textTransform: 'uppercase',
        marginBottom: theme.spacing(2),
        fontWeight: theme.typography.fontWeightBold,
      },
      blogItem: {
        display: 'flex',
        alignItems: 'center',
        margin: theme.spacing(2, 0),
        textAlign: 'left',
        justifyContent: 'flex-start',
        '& $category': {
          marginBottom: theme.spacing(),
          display: 'block',
          color: theme.palette.secondary.light
        },
        '& $listText': {
          flex: 1,
          color: theme.palette.primary.light
        },
        '& figure': {
          borderRadius: 4,
          overflow: 'hidden',
          margin: theme.spacing(1, 2, 0, 0),
          width: 80,
          height: 56,
          '& img': {
            display: 'block',
            minHeight: '100%',
            width: '100%',
          }
        },
        '& p': {
          fontSize: 13,
        }
      },
      socmed: {
        display: 'flex',
        justifyContent: 'space-around',
        marginBottom: theme.spacing(4),
        '& button': {
          margin: theme.spacing(),
          color: 'theme.palette.primary.dark',
          background: theme.palette.primary.main,
          width: 36,
          height: 36,
          '& i': {
            color: theme.palette.type === 'light' ? '#131625' : '#fafafa',
          }
        },
        '& i': {
          fontSize: 24
        }
      },
      newsSubtittle:{
          color:  theme.palette.type === 'light' ? '#131625' : '#fafafa',
      },
      selectSpan:{
        display: 'flex',
        justifyContent: 'center'
      },
      flag:{
        width: 20, height: 20
      },
      menuItemText:{
        margin: 'auto', width: '50%', padding:10
      }
}))

export default footerStyles;