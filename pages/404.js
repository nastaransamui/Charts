import Head from 'next/head'
import React, { Fragment, useEffect} from "react";
import { wrapper } from '../redux/store'
import copyrightText from '../public/locale/copyright.json'
import { useSelector, useDispatch } from 'react-redux';
import { setCookies,getCookies, checkCookies } from 'cookies-next';
import { getSession } from 'next-auth/client';
import Header from '../src/Header/Header'
import header from '../public/locale/header.json';
import { CssBaseline } from '@material-ui/core';
import {useStyles} from './index'
import ErrorText from '../public/locale/error.json'
import ErrorPage from '../src/Error'
import Footer from '../src/MainPage/Footer/Footer';
import footerText from '../public/locale/footer.json'

function Error(props){
    const classes = useStyles();
    const {"next-i18next": nextI18Next }= useSelector(state => state)
    const dispatch = useDispatch();
    const {ErrorText} = props;
    useEffect(()=>{
        dispatch({type: `next-i18next`, payload: getCookies()['next-i18next']})
        dispatch({type: 'themeType', payload: getCookies(null, 'themeType')})
        dispatch({type: 'themeName', payload: getCookies(null, 'themeName')})
    }, [])

    return(
        <Fragment>
            <Head>
                <title>
                    Error page
                </title>
            </Head>
            <CssBaseline />
            <div className={classes.mainWrap}>
                <Header {...props} />
                <main >
                <div className={classes.appBarSpacer} />
                <ErrorPage {...props} nextI18Next={nextI18Next} />
                </main>
                <Footer {...props} />
            </div>
        </Fragment>
    )
}

Error.defaultProps = {
  statusCode: '404',
  header: header,
  ErrorText: ErrorText,
  footerText: footerText
};

// export const getServerSideProps = wrapper.getServerSideProps(async (ctx) =>{
//     if (!checkCookies(ctx, 'themeType')) {
//         setCookies(ctx, 'themeType', 'dark'); 
//         ctx.store.dispatch({type: 'themeType', payload: 'dark'});
//       } else {
//         ctx.store.dispatch({type: 'themeType', payload: getCookies(ctx, 'themeType')})
//       }
//       if (!checkCookies(ctx, 'themeName')) {
//         setCookies(ctx, 'themeName', 'deepBlue'); 
//         ctx.store.dispatch({type: 'themeName', payload: 'deepBlue'});
//       } else {
//         ctx.store.dispatch({type: 'themeName', payload: getCookies(ctx, 'themeName')})
//       }
//       if (!checkCookies(ctx, `next-i18next`)) {
//         setCookies(ctx, `next-i18next`, 'en'); 
//         ctx.store.dispatch({type: `next-i18next`, payload: 'en'});
//       } else {
//         ctx.store.dispatch({type: `next-i18next`, payload: getCookies(ctx, `next-i18next`)})
//       }
//     const cookies = getCookies(ctx);
//     const session = await getSession(ctx);
//     const statusCode = ctx.res.statusCode;
//     return {
//         props: {
//             copyrightText,
//             cookies,
//             session,
//             header,
//             ErrorText,
//             statusCode,
//             footerText
//         }
//     }
// })
export default Error