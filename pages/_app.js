import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import appTheme from '../theme/appTheme';
import { wrapper } from '../redux/store';
import { setCookies } from 'cookies-next';
import {useSelector, useDispatch} from 'react-redux';
import '../styles/app.css'
import "../styles/loading.css"
import '../styles/hamburger-menu.css'
import { Provider } from 'next-auth/client'
import { useRouter } from 'next/router'
import Router from 'next/router'
import Loading from '../theme/Loding';
function MyApp(props) {
  const { Component, pageProps} = props;
  const {themeType, themeName, isLoading}= useSelector(state => state)
  const dispatch = useDispatch();
  const [theme, setTheme] = useState(appTheme(themeType,themeName))
  const [Preloading, SetPreloading] = useState(false)
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  useEffect(()=>{
    setTheme(appTheme(themeType,themeName))
  },[themeName])

  const toggleDarkTheme = () =>{
    const newPaletteType = theme.palette.type === 'light' ? 'dark' : 'light';
    setCookies(null, 'themeType', theme.palette.type === 'light' ? 'dark' : 'light');
    dispatch({type: 'themeType', payload: theme.palette.type === 'light' ? 'dark' : 'light'})
    setTheme(appTheme(newPaletteType,themeName))
  }
  //Fixed login with facebook redirect
  useEffect(() => {
    if (router.asPath.endsWith("#_=_")) {
      router.push({
        pathname: router.pathname,
        query: router.query
      })
    };
  });
  
  //Remove preloader
  useEffect(()=>{
    const preloader = document.getElementById('preloader');
    if (preloader !== null || undefined) {
      preloader.remove();
    }
  },[])

  const router = useRouter()

  useEffect(() => {
    Router.routeChangeComplete = (url) => {
      dispatch( {type: 'isLoading', payload:  100})
      SetPreloading(true)
    };
    
    Router.routeChangeComplete()
    const handleRouteChange = (url) => {
      dispatch( {type: 'isLoading', payload:  0})
      SetPreloading(false)
    }
    const handleRouteChangeComplete = (url )=>{
      dispatch( {type: 'isLoading', payload:  100})
      SetPreloading(true)
    }
    Router.events.on('routeChangeStart', handleRouteChange)
    Router.events.on('routeChangeComplete', handleRouteChangeComplete)
    return () => {
      Router.events.off('routeChangeStart', handleRouteChange)
      Router.events.off('routeChangeComplete', handleRouteChangeComplete)
    }
}, [])


  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <Provider options={{clientMaxAge:0, keepAlive: 0}}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {
          !Preloading ? <Loading /> :
        <Component {...pageProps}
        toggleDarkTheme={toggleDarkTheme}
        key={router.route} 
        Dialog={false} />
          // <span>Majid</span>
      
      }
      </ThemeProvider>
      </Provider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
export default wrapper.withRedux(MyApp);