import React,{Fragment, useState, useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { useTheme } from '@material-ui/core/styles';
import {useSelector, useDispatch} from 'react-redux';
import { CssBaseline, Typography } from '@material-ui/core';
import Link from 'next/link';
import clsx from 'clsx';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import Button from '@material-ui/core/Button';
import { setCookies} from 'cookies-next';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Popover from '@material-ui/core/Popover';
import palette from '../../theme/palette'
import PaletteIcon from '@material-ui/icons/Palette';
import LogoSvg  from './logo';
import {  useRouter } from 'next/router'
import pageLinks from '../../public/text/pageLinks'
import useStyles from './header-styles';
import LeftDrawer from '../Drawer/Drawer';
import { signOut, useSession} from 'next-auth/client'
import AlertDialog from '../components/AlertDialog'
import LoadingBar from 'react-top-loading-bar'
import LangIcon from '@material-ui/icons/Language';
import {langName} from '../../public/locale/langName'

function Header(props){
  const classes = useStyles();
  const {toggleDarkTheme,header, profile} = props;
  const [loading] = useSession()
  const router = useRouter()
  const {themeType, themeName, isLoading, "next-i18next": nextI18Next }= useSelector(state => state)
  const dispatch = useDispatch();
  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElTheme, setAnchorElTheme] = useState(null);
  const [anchorElLang, setAnchorElLang] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isThemeOpen = Boolean(anchorElTheme);
  const isLangOpen = Boolean(anchorElLang);
  const ThemeId = isThemeOpen ? 'theme-popover' : undefined;
  const menuId = 'account-menu';
  const langId = 'lang-menu';
  const [Progress, SetProgress] = useState(isLoading)

  useEffect(()=>{
    let isMount = true
    if (isMount) {
      if(loading) SetProgress(100)
    }
    return() =>{
      loading,
      isMount = false
    }
  },[loading])
  const onCancellDialog = (e) =>{
    setAlertDialogState({
      ...AlertDialogState,
      open: false,
    })
  }
  const onCloseDialog = () =>{
    setAlertDialogState({
      open: false,
  ContentText: "",
  ContentHeader: "",
  closeButtom: "",
  cancelButton:"",
  handleClose: onCloseDialog,
  CancellDialog: onCancellDialog
    })
    signOut() 
  }
  const [AlertDialogState, setAlertDialogState] =useState({
    open: false,
  ContentText: "",
  ContentHeader: "",
  closeButtom: "",
  cancelButton:"",
  handleClose: onCloseDialog,
  CancellDialog: onCancellDialog
  })
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleOpenDrawer = () => {
    setOpenDrawer(!openDrawer);
  };
  const handleTheme = ()=>{
    toggleDarkTheme()
  }
  
  const handleThemeName =(pallet) => {
    setCookies(null, 'themeName',pallet);
    dispatch({type: 'themeName', payload: pallet})
  }
  const openThemeName = (event)=>{
    setAnchorElTheme(event.currentTarget)
  }
  const closeThemeName = () => {
    setAnchorElTheme(null);
  };
  const closeLang = () => {
    setAnchorElLang(null);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const LoginClicked = ()=>{
    setAnchorEl(null);
    router.push('/login')
  }

  const ChatClicked = ()=>{
    setAnchorEl(null);
    router.push('/chat', undefined, { shallow: true })

  }

  const ChangeLang = (event) =>{
    setAnchorElLang(event.currentTarget)
  }

  const LanguageClicked = (lang)=>{
    setCookies(null, `next-i18next`,lang.LangCode);
    dispatch({type: `next-i18next`, payload: lang.LangCode})
    setAnchorElLang(null)
  }

function SingOut() {
    
      setAnchorEl(null);
      setAlertDialogState({
        handleClose: onCloseDialog,
        open: true,
        ContentText: `${header[`${nextI18Next}_signout_text`]}`,
        ContentHeader: `${header[`${nextI18Next}_signout_header`]}`,
        closeButtom: `${header[`${nextI18Next}_agree`]}`,
        cancelButton: `${header[`${nextI18Next}_close`]}`,
        CancellDialog: onCancellDialog
      })
  }
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      className={classes.menuItemMobile}
    >
      {!profile ? 
      <MenuItem onClick={LoginClicked} >{header[`${nextI18Next}_login`]}</MenuItem> :
        <span>
        <MenuItem onClick={ChatClicked}>{header[`${nextI18Next}_chat`]}</MenuItem>
      <MenuItem onClick={handleMenuClose}>{header[`${nextI18Next}_account`]}</MenuItem>
      <MenuItem component="a" 
      onClick={() => {SingOut() }}>{header[`${nextI18Next}_singout`]}</MenuItem>
      </span>}
    </Menu>
  );
  const renderLanguage = (
    <Menu
    anchorEl={anchorElLang}
    anchorOrigin={{ vertical: 'top', horizontal: 'right'}}
    id={langId}
    keepMounted
    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    open={isLangOpen}
    onClose={closeLang}
    className={classes.menuItemMobile}>
      {
        langName.map((d,i)=>{
          return(
            <MenuItem 
            key={i.toString()} 
            onClick={()=>{LanguageClicked(d)}}>
              <img src={`/lang/${d.Flag}`} alt={d.Lang} className={classes.flag} /> &nbsp;
              <span className={classes.menuItemText}>{header[`${nextI18Next}_${d.title}`]}</span>
            </MenuItem>
          )
        })
      }
    </Menu>
  )

  return(
    <div className={classes.grow}>
      <CssBaseline />
      <LoadingBar 
      color={theme.palette.secondary.main} 
      onLoaderFinished={() => SetProgress(0)}
      progress={Progress} />
      <AlertDialog {...AlertDialogState} />
      <LeftDrawer openDrawer={openDrawer} {...props}/>
        <>
          <AppBar  position="fixed" className={classes.appBar}>
            <Toolbar>
              <div className={classes.headerContent}>
              <IconButton
                  onClick={handleOpenDrawer}
                  style={{padding: 0, margin: 0}}
                  className={clsx('hamburger hamburger--spin', openDrawer && 'is-active')}
                >
                  <span className="hamburger-box">
                    <span className='hamburger-inner' />
                  </span>
                </IconButton>
                <div className={classes.logo} >
                  <Link href='/'>
                      <a>
                      <LogoSvg downColor={theme.palette.secondary.dark} 
                  MainColor={theme.palette.secondary.main} 
                  alphabet={theme.typography.overline.color}/>
                        
                      </a>
                    </Link>
                </div>
                <span className={classes.mobileMenu}>
                  {
                    pageLinks.map((t,i)=>{
                      return(
                        <Button key={i.toString()} component="a" href={t.url} onClick={()=>router.push(`${t.url}`, undefined, {shallow: t.shallow})}>
                            <Typography  className={classes.headerButtons}>{header[`${nextI18Next}_${t.title}`]}</Typography>
                        </Button>
                      )
                    })
                  }
                   </span>
              </div>
              <div className={classes.grow} />
              <div 
            className={classes.headerButtons}>
              <IconButton
              aria-label="show more"
              aria-haspopup="true"
              onClick={ChangeLang}
              color="inherit"
            >
            <LangIcon />
            </IconButton>
              <IconButton
              aria-label="show more"
              aria-haspopup="true"
              onClick={handleTheme}
              color="inherit"
            >
            {themeType === 'dark' ?<Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <IconButton
              edge="end"
              aria-controls={menuId}
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              disableFocusRipple
              disableRipple
              color="inherit"
            >{
              !profile  ? 
              <AccountCircle />
              :
              <>
                {
                  profile[0].image !== null ? <img alt="image" src={profile[0].image} style={{width:30, height:30, borderRadius: '50%'}} /> : <AccountCircle />
                }
              </>
            }
            </IconButton>
            <IconButton 
            edge="end"
            aria-label="Theme Control"
            aria-haspopup="true"
            aria-describedby={ThemeId}
            onClick={openThemeName}
            color="inherit">
              <InvertColorsIcon />
            </IconButton>
              </div>
            </Toolbar>
          </AppBar>
      {renderMenu}
      {renderLanguage}
        <Popover 
          anchorReference="anchorPosition"
          id={ThemeId}
          open={isThemeOpen}
          onClose={closeThemeName}
          anchorPosition={{ top: 67, left: 1900 }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
        <div 
        className={classes.popover}>
        {Object.keys(palette).map(function(key, index) {
         return(
           <Fragment key={index}>
           { theme.palette.primary.main !== palette[key].palette.primary.main &&
          <IconButton onClick={()=>{handleThemeName(key)}} >
          <PaletteIcon style={{ color: palette[key].palette.secondary.dark }}/>
        </IconButton> }
        </Fragment>
         )
        })}
        </div>
      </Popover>
        </>
    </div>
  )
}

export default Header;