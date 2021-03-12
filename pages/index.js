import React, {useEffect, useRef, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Head from 'next/head';
import Copyright from '../src/Copyright';
import CssBaseline from '@material-ui/core/CssBaseline';
import { setCookies,getCookies, checkCookies } from 'cookies-next';
import Header from '../src/Header/Header'
import { wrapper } from '../redux/store'
import {  makeStyles } from '@material-ui/core/styles';
import { connectToDatabase } from '../lib/mongodb';
import { getSession, providers } from 'next-auth/client'
import MainPage from '../src/MainPage'
import banner from '../public/locale/banner.json';
import header from '../public/locale/header.json';
import footerText from '../public/locale/footer.json';
import faqText from '../public/locale/faq.json';
import testimocialText from '../public/locale/testimonial.json';
import benefitText from '../public/locale/benefit.json';
import featureText from '../public/locale/feature.json';

const useStyles = makeStyles(theme => ({
  containerWrap: {
    marginTop: theme.spacing(3),
    minHeight: '100vh',
    '& > section': {
      position: 'relative'
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  mainWrap: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    background: theme.palette.background.paper,
    color: theme.palette.text.primary,
  },
  
}));
export default function Index(props) {
  const classes = useStyles();
  
  return (
    <React.Fragment>
      <Head>
        <title>
          Home Page
        </title>
      </Head>
      <CssBaseline />
      <div className={classes.mainWrap}>
        <Header {...props} />
        <main className={classes.containerWrap}>
              <div className={classes.appBarSpacer} />
        <MainPage {...props}/>
        </main>
        </div>
        <Copyright />
        </React.Fragment>
  );
}
export const getServerSideProps = wrapper.getServerSideProps(async (ctx) =>{
  if (!checkCookies(ctx, 'themeType')) {
    setCookies(ctx, 'themeType', 'dark'); 
    ctx.store.dispatch({type: 'themeType', payload: 'dark'});
  } else {
    ctx.store.dispatch({type: 'themeType', payload: getCookies(ctx, 'themeType')})
  }
  if (!checkCookies(ctx, 'themeName')) {
    setCookies(ctx, 'themeName', 'deepBlue'); 
    ctx.store.dispatch({type: 'themeName', payload: 'deepBlue'});
  } else {
    ctx.store.dispatch({type: 'themeName', payload: getCookies(ctx, 'themeName')})
  }
  if (!checkCookies(ctx, `next-i18next`)) {
    setCookies(ctx, `next-i18next`, 'en'); 
    ctx.store.dispatch({type: `next-i18next`, payload: 'en'});
  } else {
    ctx.store.dispatch({type: `next-i18next`, payload: getCookies(ctx, `next-i18next`)})
  }
  const cookies = getCookies(ctx);
  const { client } = await connectToDatabase();
  const isConnected = await client.isConnected();
  const session = await getSession(ctx);
  return {props: {
    cookies,
     isConnected,
     header,
     banner,
    session,
    footerText,
    faqText,
    testimocialText,
    benefitText,
    featureText,
  }}
})
