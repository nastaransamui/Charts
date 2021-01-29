import React from 'react';
import Typography from '@material-ui/core/Typography';
import Head from 'next/head';
import Copyright from '../src/Copyright';
import CssBaseline from '@material-ui/core/CssBaseline';
import { setCookies,getCookies, checkCookies } from 'cookies-next';
import Header from '../src/Header/Header'
import { wrapper } from '../redux/store'
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { connectToDatabase } from '../lib/mongodb';
import { signIn, signOut, useSession,getSession, providers } from 'next-auth/client'

import { csrfToken } from 'next-auth/client'
const useStyles = makeStyles(theme => ({
  containerWrap: {
    marginTop: theme.spacing(10),
    minHeight: '100vh'
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
  const theme = useTheme();
  const [ session, loading] = useSession()
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
        <Typography variant="h4" component="h1" gutterBottom>Main Page will come here</Typography>
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
  const cookies = getCookies(ctx);
  const { client } = await connectToDatabase();
  const isConnected = await client.isConnected();
  const session = await getSession(ctx);
  return {props: {
    cookies, isConnected,
    providers: await providers(ctx),
    csrfToken: await csrfToken(ctx),
    session
  }}
})
