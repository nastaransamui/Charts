import React, { Fragment, useEffect } from 'react';
import { setCookies,getCookies, checkCookies } from 'cookies-next';
import { wrapper } from '../redux/store'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from '../src/Header/Header'
import Head from 'next/head';
import { getSession } from 'next-auth/client';
import { useRouter } from 'next/router'
import ChatPage from '../src/Chat/ChatPage';
import { ownUser } from '../lib/ownUser';
import header from '../public/locale/header.json';
import chatText from '../public/locale/chat.json'
import {getUsersLive} from '../lib/chat/getUsers'

const useStyles = makeStyles(theme => ({
  containerWrap: {
    marginTop: theme.spacing(10),
    // minHeight: '100vh'
  },
  mainWrap: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    background: theme.palette.background.paper,
    color: theme.palette.text.primary,
  },
  appBarSpacer: theme.mixins.toolbar,
}));

export default function Chat(props) {
  const classes = useStyles();
  // const [session] = useSession()
  const router = useRouter()
  // useEffect(()=>{
  //   let isMount = true;
  //   if(isMount){
  //     if(session === null){
  //       router.push("/");
  //     }
  //   }
  //   return() =>{
  //     isMount = false;
  //   }
  // },[session])
  return (
    <Fragment>
      <Head>
        <title>Chat Page</title>
      </Head>
      <CssBaseline />
      <div className={classes.mainWrap}>
        <Header {...props} />
        <main className={classes.containerWrap}>
          <div className={classes.appBarSpacer} />
          <ChatPage {...props} />
        </main>
      </div>
    </Fragment>
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
  const session = await getSession(ctx);

  const profile = session !== null && await ownUser(session)
  let ChatUsersProps = session !== null && await getUsersLive(profile[0]._id)
  if(ctx.res && session === null ){
    return{
      redirect:{
        permanent: false,
        destination: '/'
      }
    }
  }

  return {props: {
    ChatUsersProps,
    profile,
    header,
    chatText
  }}
})
