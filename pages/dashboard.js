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
import { getSession, providers } from 'next-auth/client'
import { csrfToken } from 'next-auth/client'
import AlertDialog from '../src/components/AlertDialog'
import { useRouter } from 'next/router'
import { route } from 'next/dist/next-server/server/router';
import header from '../public/locale/header.json'
import dashboardText from '../public/locale/dashbord.json';
import loginText from '../public/locale/login.json';
import copyrightText from '../public/locale/copyright.json'
import { ownUser } from '../lib/ownUser';

export default function MainDashboard(props){
  const router = useRouter()
  const onCancellDialog = (e) =>{
    setAlertDialogState({
      ...AlertDialogState,
      open: false
    })
    router.replace(router.pathname)
  }

  const onCloseDialog = (e) =>{
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
      }
    }
    if(isMount&& router.query.error !== undefined){
      if(router.query.error === "OAuthAccountNotLinked" || router.query.error === "OAuthAccountNotLinked#"){
        setAlertDialogState({
          handleClose: onCloseDialog,
          CancellDialog: onCancellDialog,
          open: true,
          ContentText: `This Social Platform "email" has registerd account with us please try another platform.`,
          ContentHeader:`Error: ${router.query.error}`,
          closeButtom: "NotAgree",
          cancelButton:"Close",
        })
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
    marketTrade,
    isLoading
  } = ctx.store.getState()
    if (!checkCookies(ctx, 'themeType')) {
        setCookies(ctx, 'themeType', 'dark')
        ctx.store.dispatch({type: 'themeType', payload: 'dark'});
        ctx.store.dispatch( {type: 'isLoading', payload: 10})
    } else {
      ctx.store.dispatch({type: 'themeType', payload: getCookies(ctx, 'themeType')})
      ctx.store.dispatch( {type: 'isLoading', payload:  10})
    }
    if (!checkCookies(ctx, 'themeName')) {
      setCookies(ctx, 'themeName', 'joker'); 
      ctx.store.dispatch({type: 'themeName', payload: 'joker'});
        ctx.store.dispatch( {type: 'isLoading', payload: 20})
    } else {
      ctx.store.dispatch({type: 'themeName', payload: getCookies(ctx, 'themeName')})
      ctx.store.dispatch( {type: 'isLoading', payload:  20})
    }
    if (!checkCookies(ctx, 'coingeckoSymbol')) {
        setCookies(ctx, 'coingeckoSymbol', 'usd')
        ctx.store.dispatch({type: 'coingeckoSymbol', payload: 'usd'});
        ctx.store.dispatch( {type: 'isLoading', payload: 40})
    } else {
      ctx.store.dispatch({type: 'coingeckoSymbol', payload: getCookies(ctx, 'coingeckoSymbol')})
      ctx.store.dispatch( {type: 'isLoading', payload:  40})
    }
    if (!checkCookies(ctx, 'cryptoCompareTsym')) {
        setCookies(ctx, 'cryptoCompareTsym',coingeckoSymbol !== 'usd' ? 'usd' : 'btc')
        ctx.store.dispatch({type: 'cryptoCompareTsym', payload: coingeckoSymbol !== 'usd' ? 'usd' : 'btc'});
        ctx.store.dispatch( {type: 'isLoading', payload: 50})
    } else {
      ctx.store.dispatch({type: 'cryptoCompareTsym', payload: getCookies(ctx, 'cryptoCompareTsym')})
      ctx.store.dispatch( {type: 'isLoading', payload:  50})
    }
    if (!checkCookies(ctx, 'PeriodicDataUpdate')) {
        setCookies(ctx, 'PeriodicDataUpdate', 'day')
        ctx.store.dispatch({type: 'PeriodicDataUpdate', payload: 'day'});
        ctx.store.dispatch( {type: 'isLoading', payload: 70})
    } else {
      ctx.store.dispatch({type: 'PeriodicDataUpdate', payload: getCookies(ctx, 'PeriodicDataUpdate')})
      ctx.store.dispatch( {type: 'isLoading', payload:  70})
    }
    if(!checkCookies(ctx, 'TraidingView')) {
      setCookies(ctx, 'TraidingView', false) ;ctx.store.dispatch({type: 'TraidingView', payload:  false});
        ctx.store.dispatch( {type: 'isLoading', payload: 80})
    }else{
      ctx.store.dispatch({type: 'TraidingView', payload:  getCookies(ctx, 'TraidingView')});
      ctx.store.dispatch( {type: 'isLoading', payload:  80})
    }
    if(!checkCookies(ctx, 'marketTradeSymbol')) {
      setCookies(ctx, 'marketTradeSymbol', 'btcusdt') ;ctx.store.dispatch({type: 'marketTradeSymbol', payload:  'btcusdt'});
        ctx.store.dispatch( {type: 'isLoading', payload: 90})
    }else{
      ctx.store.dispatch({type: 'marketTradeSymbol', payload:  getCookies(ctx, 'marketTradeSymbol')});
      ctx.store.dispatch( {type: 'isLoading', payload:  90})
    }
    if(!checkCookies(ctx, 'marketTradeSymbolTitle')) {
      setCookies(ctx, 'marketTradeSymbolTitle', 'BTC-USDT') ;ctx.store.dispatch({type: 'marketTradeSymbolTitle', payload:  'BTC-USDT'});
        ctx.store.dispatch( {type: 'isLoading', payload: 100})
    }else{
      ctx.store.dispatch({type: 'marketTradeSymbolTitle', payload:  getCookies(ctx, 'marketTradeSymbolTitle')});
      ctx.store.dispatch( {type: 'isLoading', payload:  100})
    }
    if (!checkCookies(ctx, `next-i18next`)) {
      setCookies(ctx, `next-i18next`, 'en'); 
      ctx.store.dispatch({type: `next-i18next`, payload: 'en'});
    } else {
      ctx.store.dispatch({type: `next-i18next`, payload: getCookies(ctx, `next-i18next`)})
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
    const profile = session !== null && await ownUser(session)
    return {props: {
      cookies,
    providers: await providers(ctx),
    csrfToken: await csrfToken(ctx),
    isLoading,
    header,
    dashboardText,
    loginText,
    copyrightText,
    profile}}
})