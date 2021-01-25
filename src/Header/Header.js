import React,{Fragment, useState} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { useTheme } from '@material-ui/core/styles';
import {useSelector, useDispatch} from 'react-redux';
import { CssBaseline,Slide, Typography } from '@material-ui/core';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
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
import { useRouter } from 'next/router'
import useStyles from './header-styles';
import LeftDrawer from '../Drawer/Drawer'
function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <div>{children}</div>
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};


function Header(props){
  const classes = useStyles();
  const {toggleDarkTheme} = props;
  const router = useRouter()
  const {themeType, themeName}= useSelector(state => state)
  const dispatch = useDispatch();
  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElTheme, setAnchorElTheme] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isThemeOpen = Boolean(anchorElTheme);
  const ThemeId = isThemeOpen ? 'theme-popover' : undefined;
  const menuId = 'account-menu';
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
  const handleMenuClose = () => {
    setAnchorEl(null);
    router.push('/login')
  };

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
      <MenuItem onClick={handleMenuClose} >Login</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  return(
    <div className={classes.grow}>
      <CssBaseline />
      <LeftDrawer openDrawer={openDrawer}/>
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

              <Button href='/about'><Typography  className={classes.headerButtons}>About</Typography></Button>
              <Button href='/dashboard' ><Typography  className={classes.headerButtons}>Dashboard</Typography></Button>
                </span>
              </div>
              <div className={classes.grow} />
              <div 
            className={classes.headerButtons}>
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
              color="inherit"
            >
              <AccountCircle />
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