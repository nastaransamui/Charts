import React, { Fragment, useState,useEffect } from 'react';
import Dashboard from '../src/Dashboard/Dashboard'
import { setCookies, getCookies,checkCookies, removeCookies } from 'cookies-next';
import {useSelector} from 'react-redux';
import {wrapper} from '../redux/store';
import Header from '../src/Header/Header'
import getExchangeData from '../lib/exchange'
import getCandleChartData from '../lib/candleChartData'
import { getPairSymbolHuobi } from '../lib/orderBook';
import { getMarketTradeHuobi } from '../lib/marketTrades';
import { signIn, signOut, useSession,getSession, providers } from 'next-auth/client'
import { csrfToken } from 'next-auth/client'
import AlertDialog from '../src/components/AlertDialog'
import { useRouter } from 'next/router'
export default function MainDashboard(props){
  const router = useRouter()
  const onCancellDialog = (e) =>{
    setAlertDialogState({
      ...AlertDialogState,
      open: false
    })
  }
  const onCloseDialog = (e) =>{
    console.log('Onclose');
    e.preventDefault();
    setAlertDialogState({
      open: false,
  ContentText: "",
  ContentHeader: "",
  closeButtom: "",
  cancelButton:"Close",
  handleClose: onCloseDialog,
  CancellDialog: onCancellDialog
    })
  }
  const [AlertDialogState, setAlertDialogState] =useState({
    open: false,
  ContentText: "",
  ContentHeader: "",
  closeButtom: "",
  cancelButton:"Close",
  handleClose: onCloseDialog,
  CancellDialog: onCancellDialog
  })
  useEffect(()=>{
    let isMount = true;
    if(isMount&& router.query.SendEmail !== undefined){
      if(router.query.SendEmail === "true"){
        setAlertDialogState({
          handleClose: onCloseDialog,
          CancellDialog: onCancellDialog,
          open: true,
          ContentText: `Verification email was sent to  with link kindly recheck your email and click on link to login.`,
          ContentHeader:`Email sends`,
          closeButtom: "NotAgree",
          cancelButton:"Close",
        })
        router.push(router.pathname);
      }
    }
    if(isMount&& router.query.error !== undefined){
      if(router.query.error === "OAuthAccountNotLinked"){
        setAlertDialogState({
          handleClose: onCloseDialog,
          CancellDialog: onCancellDialog,
          open: true,
          ContentText: `This Social Platform "email" has registerd account with us please try another platform.`,
          ContentHeader:`Error: ${router.query.error}`,
          closeButtom: "NotAgree",
          cancelButton:"Close",
        })
        router.push(router.pathname);
      }
    }
    return()=>{
      isMount = false;
    }
  },[router])
    return(
        <Fragment>
            <Header {...props}/>
            <AlertDialog {...AlertDialogState} />
        <Dashboard {...props}/>
        </Fragment>
    )
}


export const getServerSideProps = wrapper.getServerSideProps(async (ctx)=>{
  const cookies = getCookies(ctx);
  const {
    coingeckoSymbol, 
    cryptoCompareTsym, 
    PeriodicDataUpdate,
    marketTradeSymbol,
    marketTrade
  } = ctx.store.getState()

    if (!checkCookies(ctx, 'themeType')) {
        setCookies(ctx, 'themeType', 'dark')
        ctx.store.dispatch({type: 'themeType', payload: 'dark'});
    } else {
      ctx.store.dispatch({type: 'themeType', payload: getCookies(ctx, 'themeType')})
    }
    if (!checkCookies(ctx, 'themeName')) {
      setCookies(ctx, 'themeName', 'joker'); 
      ctx.store.dispatch({type: 'themeName', payload: 'joker'});
    } else {
      ctx.store.dispatch({type: 'themeName', payload: getCookies(ctx, 'themeName')})
    }
    if (!checkCookies(ctx, 'coingeckoSymbol')) {
        setCookies(ctx, 'coingeckoSymbol', 'usd')
        ctx.store.dispatch({type: 'coingeckoSymbol', payload: 'usd'});
    } else {
      ctx.store.dispatch({type: 'coingeckoSymbol', payload: getCookies(ctx, 'coingeckoSymbol')})
    }
    if (!checkCookies(ctx, 'cryptoCompareTsym')) {
        setCookies(ctx, 'cryptoCompareTsym',coingeckoSymbol !== 'usd' ? 'usd' : 'btc')
        ctx.store.dispatch({type: 'cryptoCompareTsym', payload: coingeckoSymbol !== 'usd' ? 'usd' : 'btc'});
    } else {
      ctx.store.dispatch({type: 'cryptoCompareTsym', payload: getCookies(ctx, 'cryptoCompareTsym')})
    }
    if (!checkCookies(ctx, 'PeriodicDataUpdate')) {
        setCookies(ctx, 'PeriodicDataUpdate', 'day')
        ctx.store.dispatch({type: 'PeriodicDataUpdate', payload: 'day'});
    } else {
      ctx.store.dispatch({type: 'PeriodicDataUpdate', payload: getCookies(ctx, 'PeriodicDataUpdate')})
    }
    if(!checkCookies(ctx, 'TraidingView')) {
      setCookies(ctx, 'TraidingView', false) ;ctx.store.dispatch({type: 'TraidingView', payload:  false});
    }else{
      ctx.store.dispatch({type: 'TraidingView', payload:  getCookies(ctx, 'TraidingView')});
    }
    if(!checkCookies(ctx, 'marketTradeSymbol')) {
      setCookies(ctx, 'marketTradeSymbol', 'btcusdt') ;ctx.store.dispatch({type: 'marketTradeSymbol', payload:  'btcusdt'});
    }else{
      ctx.store.dispatch({type: 'marketTradeSymbol', payload:  getCookies(ctx, 'marketTradeSymbol')});
    }
    if(!checkCookies(ctx, 'marketTradeSymbolTitle')) {
      setCookies(ctx, 'marketTradeSymbolTitle', 'BTC-USDT') ;ctx.store.dispatch({type: 'marketTradeSymbolTitle', payload:  'BTC-USDT'});
    }else{
      ctx.store.dispatch({type: 'marketTradeSymbolTitle', payload:  getCookies(ctx, 'marketTradeSymbolTitle')});
    }

    const Exchange = await getExchangeData(coingeckoSymbol)
    ctx.store.dispatch({type: 'Exchange', payload: Exchange});
    //Use cookies to fix XAxis format
    const candleChartData = await getCandleChartData(getCookies(ctx, 'PeriodicDataUpdate'), coingeckoSymbol,cryptoCompareTsym)
    ctx.store.dispatch({type: 'candleChartData', payload: candleChartData});
    const pairSymbol = await getPairSymbolHuobi();
    ctx.store.dispatch({type: 'pairSymbol', payload: pairSymbol})
    const getMarketTrade = await getMarketTradeHuobi(marketTradeSymbol)
    ctx.store.dispatch({type: 'marketTrade', payload: getMarketTrade})
    const session = await getSession(ctx);
    return {props: {
      cookies,
    providers: await providers(ctx),
    csrfToken: await csrfToken(ctx),
    session}}
})