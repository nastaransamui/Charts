import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider, jssPreset, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import appTheme from '../theme/appTheme';
import { wrapper } from '../redux/store';
import { setCookies,getCookies, checkCookies } from 'cookies-next';
import {useSelector, useDispatch} from 'react-redux';
import '../styles/app.css'
import '../styles/hamburger-menu.css'
import { create } from 'jss';
import { Provider } from 'next-auth/client'

function MyApp(props) {
  const { Component, pageProps, router } = props;
  const {themeType, themeName}= useSelector(state => state)
  const dispatch = useDispatch();
  const [theme, setTheme] = useState(appTheme(themeType,themeName))
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
  
  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <Provider options={{clientMaxAge:0, keepAlive: 0}}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps}
        toggleDarkTheme={toggleDarkTheme}
        key={router.route} 
        Dialog={false} />
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