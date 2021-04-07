import { useEffect, useState, Fragment } from 'react'
import { Menu, MenuItem, Popover, IconButton, AppBar, Toolbar, Button, Typography } from '@material-ui/core';
import PaletteIcon from '@material-ui/icons/Palette';
import LangIcon from '@material-ui/icons/Language';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import { signOut} from 'next-auth/client'
import {  useRouter } from 'next/router'
import { setCookies} from 'cookies-next';
import { useDispatch, useSelector} from 'react-redux';
import { useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import Link from 'next/link';
import LogoSvg  from './logo';
import pageLinks from '../../public/text/pageLinks'
import { AccountCircle } from '@material-ui/icons';
export function useProgress({loading, showToolbar}){
    const [Progress, SetProgress] = useState(isLoading)
    const { isLoading }= useSelector(state => state)
    useEffect(()=>{
      let isMount = true
      if (isMount && showToolbar === undefined) {
        if(loading) SetProgress(100)
      }
      return() =>{
        loading,
        isMount = false
      }
    },[loading])
    return {Progress, SetProgress}
}

export function RenderMenu({AlertDialogState,setAlertDialogState,profile, anchorEl, setAnchorEl, header, nextI18Next, classes}){
  const router = useRouter()
  const isMenuOpen = Boolean(anchorEl);
  const menuId = 'account-menu';
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
  
    return(
        <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={()=>{setAnchorEl(null)}}
        className={classes.menuItemMobile}
      >
        {!profile ? 
        <MenuItem onClick={()=>{setAnchorEl(null);router.push('/login')}} >{header[`${nextI18Next}_login`]}</MenuItem> :
          <span>
          <MenuItem onClick={()=>{setAnchorEl(null);  router.push('/chat', undefined, { shallow: true })}}>{header[`${nextI18Next}_chat`]}</MenuItem>
        <MenuItem onClick={()=>{setAnchorEl(null)}}>{header[`${nextI18Next}_account`]}</MenuItem>
        <MenuItem component="a" 
        onClick={() => {SingOut() }}>{header[`${nextI18Next}_singout`]}</MenuItem>
        </span>}
      </Menu>
    )
}

export function RenderLanguage({anchorElLang, setAnchorElLang, classes, langName,header,nextI18Next }){
    const isLangOpen = Boolean(anchorElLang);
    const langId = 'lang-menu';
    const dispatch = useDispatch();
    const LanguageClicked = (lang)=>{
        setCookies(null, `next-i18next`,lang.LangCode);
        dispatch({type: `next-i18next`, payload: lang.LangCode})
        setAnchorElLang(null)
      }
    return(
        <Menu
        anchorEl={anchorElLang}
        anchorOrigin={{ vertical: 'top', horizontal: 'right'}}
        id={langId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isLangOpen}
        onClose={()=>{setAnchorElLang(null)}}
        className={classes.menuItemMobile}>
          {
            langName.map((d,i)=>{
              return(
                <MenuItem 
                key={i.toString()} 
                onClick={()=>{LanguageClicked(d)}}
                >
                  <img src={`/lang/${d.Flag}`} alt={d.Lang} className={classes.flag} /> &nbsp;
                  <span className={classes.menuItemText}>{header[`${nextI18Next}_${d.title}`]}</span>
                </MenuItem>
              )
            })
          }
        </Menu>
    )
}

export function RenderThemePalette({classes,palette, anchorElTheme, setAnchorElTheme }){
    const isThemeOpen = Boolean(anchorElTheme);
    const ThemeId = isThemeOpen ? 'theme-popover' : undefined;
    const dispatch = useDispatch();
    const theme = useTheme();
    const handleThemeName =(pallet) => {
        setCookies(null, 'themeName',pallet);
        dispatch({type: 'themeName', payload: pallet})
      }
    return(
        <Popover anchorReference="anchorPosition"  id={ThemeId} open={isThemeOpen} anchorPosition={{ top: 67, left: 1900 }} anchorOrigin={{vertical: 'bottom',horizontal: 'left' }} transformOrigin={{vertical: 'top',horizontal: 'right'}}>
            <div  className={classes.popover}>
                {
                    Object.keys(palette).map(function(key,index){
                        return(
                            <Fragment key={index}>
                                {
                                    theme.palette.primary.main !== palette[key].palette.primary.main &&
                                    <IconButton onClick={()=>{handleThemeName(key);setAnchorElTheme(null)}} >
                                        <PaletteIcon style={{ color: palette[key].palette.secondary.dark }}/>
                                    </IconButton>
                                }
                            </Fragment>
                        )
                    })
                }
            </div>
        </Popover>
    )
}

export function RenderAppBar({setAnchorElTheme,header,openDrawer, setOpenDrawer,classes,setAnchorElLang, toggleDarkTheme, setAnchorEl, profile}){
    const theme = useTheme();
    const router = useRouter()
    const { themeType, "next-i18next": nextI18Next }= useSelector(state => state)
    return(
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <div className={classes.headerContent}>
                    <IconButton onClick={()=>{setOpenDrawer(!openDrawer)}} style={{padding: 0, margin: 0}} className={clsx('hamburger hamburger--spin', openDrawer && 'is-active')}>
                        <span className="hamburger-box">
                            <span className='hamburger-inner' />
                        </span>
                    </IconButton>
                    <div className={classes.logo} >
                        <Link href='/'>
                            <a><LogoSvg downColor={theme.palette.secondary.dark} MainColor={theme.palette.secondary.main} alphabet={theme.typography.overline.color}/>  </a>
                        </Link>
                    </div>
                    <span className={classes.mobileMenu}>
                        {pageLinks.map((t,i)=>(<Button key={i.toString()} component="a" href={t.url} onClick={()=>router.push(`${t.url}`, undefined, {shallow: t.shallow})}><Typography className={classes.headerButtons}>{header[`${nextI18Next}_${t.title}`]}</Typography></Button>))}
                    </span>
                </div>
                <div className={classes.grow} />
                <div className={classes.headerButtons}>
                    <IconButton aria-label="show more" aria-haspopup="true" onClick={(e)=>{setAnchorElLang(e.currentTarget)}} color="inherit">
                        <LangIcon />
                    </IconButton>
                    <IconButton aria-label="show more" aria-haspopup="true"  onClick={()=>{ toggleDarkTheme()}} color="inherit">
                        {themeType === 'dark' ?<Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                    <IconButton edge="end" aria-label="account of current user"  aria-haspopup="true" onClick={(e)=>{setAnchorEl(e.currentTarget)}} disableFocusRipple  disableRipple color="inherit">
                        {!profile ? <AccountCircle /> : <img alt="image" src={profile[0].image} style={{width:30, height:30, borderRadius: '50%'}} />  }
                    </IconButton>
                    <IconButton  edge="end"  aria-label="Theme Control" aria-haspopup="true" onClick={(e)=>{setAnchorElTheme(e.currentTarget)}} color="inherit">
                        <InvertColorsIcon />
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
    )
}