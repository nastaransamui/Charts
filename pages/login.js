import React,{Fragment, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from "prop-types";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {  useTheme, makeStyles } from '@material-ui/core/styles';
import Head from 'next/head';
import Header from '../src/Header/Header';
import { wrapper } from '../redux/store';
import { setCookies,getCookies, checkCookies } from 'cookies-next';
import { signIn, signOut, useSession,getSession, providers } from 'next-auth/client'
import { csrfToken } from 'next-auth/client'
import { useState } from 'react';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import AlertDialog from '../src/components/AlertDialog'
import { useRouter } from 'next/router'
import Fab from '@material-ui/core/Fab';
import {  FaFacebookF, FaGoogle,FaTwitter } from  'react-icons/fa';
import header from '../public/locale/header.json'
import loginText from '../public/locale/login.json';
import copyrightText from '../public/locale/copyright.json'
import {useSelector} from 'react-redux';
import LoadingOverlay from 'react-loading-overlay';

import { ownUser } from '../lib/ownUser';
function Copyright(props) {
  const {"next-i18next": nextI18Next }= useSelector(state => state)
  const {copyrightText} = props;
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {`${copyrightText[`${nextI18Next}_copyright`]} © `}
      <Link color="inherit" href={process.env.NEXTAUTH_URL}>
      {`${copyrightText[`${nextI18Next}_website`]}`}
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  containerWrap: {
    minHeight: '100vh'
  },
  mainWrap: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    background: theme.palette.background.paper,
    color: theme.palette.text.primary,
  },
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.background.paper,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '85%', // Fix IE 11 issue.
    margin: theme.spacing(1),
    padding: 10
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  facebook :{
    backgroundColor: '#3b5998',
    color: '#fff',
    disableRipple: true,
    "&:hover": {
        backgroundColor: "#002a81"
      }
},
google: {
    backgroundColor: "#DB4437",
    color:"#fff",
    "&:hover": {
        backgroundColor: "#ff1400"
      }
},
twitter: {
    backgroundColor: "#38A1F3",
    color:"#fff",
    "&:hover": {
        backgroundColor: "#007fe2"
      }
},
font: {
    fontSize: '24px'
}
}));
export function isEmpty(obj) {
  for(var prop in obj) {
    if(obj.hasOwnProperty(prop)) {
      return false;
    }
  }

  return JSON.stringify(obj) === JSON.stringify({});
}
export default function SignInSide(props) {
  const classes = useStyles();
  const theme = useTheme();
  const router = useRouter()
  const {"next-i18next": nextI18Next }= useSelector(state => state)
  const {csrfToken, loginText, profile, Dialog} = props;

  const [email, SetEmail] = useState('')


  const [LoadingRoute, setLoadingRoute] = useState(false)

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
    if(email !== "") signIn('email', { email, callbackUrl: `${process.env.NEXTAUTH_URL}${router.pathname}` })
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


  const submit = (e) =>{
    e.preventDefault();
    setLoadingRoute(!LoadingRoute)
    setAlertDialogState({
      handleClose: onCloseDialog,
      CancellDialog: onCancellDialog,
      open: true,
      ContentText: `${loginText[`${nextI18Next}_verification1`]} ${email} ${loginText[`${nextI18Next}_verification2`]} `,
      ContentHeader:`${loginText[`${nextI18Next}_login_request`]}`,
      closeButtom: `${loginText[`${nextI18Next}_agree`]}`,
      cancelButton:`${loginText[`${nextI18Next}_close`]}`,
    })
  }
  
  useEffect(()=>{
    let isMount = true;
    if (isMount) {
      if (!isEmpty(router.query)) {
        if(router.query.SendEmail === "true" && isMount){
          setAlertDialogState({
            handleClose: onCloseDialog,
            CancellDialog: onCancellDialog,
            open: true,
            ContentText: `${loginText[`${nextI18Next}_verification1`]} ${email} ${loginText[`${nextI18Next}_verification2`]} `,
            ContentHeader:`${loginText[`${nextI18Next}_login_request`]}`,
            closeButtom: `NotAgree`,
            cancelButton:`${loginText[`${nextI18Next}_close`]}`,
          })
        }
        if(router.query.error === "OAuthAccountNotLinked" || router.query.error === "OAuthAccountNotLinked#" && isMount){
          setAlertDialogState({
            handleClose: onCloseDialog,
            CancellDialog: onCancellDialog,
            open: true,
            ContentText: `${loginText[`${nextI18Next}_socialerror`]}`,
            ContentHeader:`${loginText[`${nextI18Next}_error`]} ${router.query.error}`,
            closeButtom: `NotAgree`,
            cancelButton:`${loginText[`${nextI18Next}_close`]}`,
          })
        }
        if(router.query.error === "Callback" && isMount){
          setAlertDialogState({
            handleClose: onCloseDialog,
            CancellDialog: onCancellDialog,
            open: true,
            ContentText: `${loginText[`${nextI18Next}_system`]} ${router.query.error} ${loginText[`${nextI18Next}_adminerror`]}`,
            ContentHeader:`${loginText[`${nextI18Next}_error`]} ${router.query.error}`,
            closeButtom: `NotAgree`,
            cancelButton:`${loginText[`${nextI18Next}_close`]}`,
          })
        }
        if(router.query.error === "OAuthCreateAccount" && isMount){
          setAlertDialogState({
            handleClose: onCloseDialog,
            CancellDialog: onCancellDialog,
            open: true,
            ContentText: `${loginText[`${nextI18Next}_system`]} ${router.query.error} ${loginText[`${nextI18Next}_adminerror`]}`,
            ContentHeader:`${loginText[`${nextI18Next}_error`]} ${router.query.error}`,
            closeButtom: `${loginText[`${nextI18Next}_notagree`]} `,
            cancelButton:`${loginText[`${nextI18Next}_close`]}`,
          })
        }
        if(router.query.error === "Verification" && isMount){
          setAlertDialogState({
            handleClose: onCloseDialog,
            CancellDialog: onCancellDialog,
            open: true,
            ContentText: `${loginText[`${nextI18Next}_expirelink`]}`,
            ContentHeader:`${loginText[`${nextI18Next}_error`]} ${router.query.error}`,
            closeButtom: `NotAgree`,
            cancelButton:`${loginText[`${nextI18Next}_close`]}`,
          })
        }
      }
    }

    return()=>{
      isMount = false;
      router;
      setAlertDialogState
    }
  },[router])

  
  useEffect(()=>{
    let isMount = true;
    if(isMount && profile){
      if(profile){
        router.push("/");
      }
    }
    return() =>{
      isMount = false;
    }
  },[profile])

  const renderSocialIcon = (provider) =>{
    switch (provider.id) {
      case 'facebook':
        return <FaFacebookF />
      case 'google':
       return    <FaGoogle />
      case 'twitter':
        return   <FaTwitter />
      break;
    }
  }
  return (
    <Fragment>
      <Head>
        <title>Login Page</title>
      </Head>
      <LoadingOverlay active={LoadingRoute} spinner text='Loading ...' >
      <CssBaseline />
      <AlertDialog {...AlertDialogState} />
      <div className={classes.mainWrap} style={{marginTop: !Dialog && 68}}>
        {!Dialog && <Header {...props} />}
        <main className={classes.containerWrap}>
        <Grid container component="main" className={classes.root} >
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square className={classes.mainWrap}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {loginText[`${nextI18Next}_login_singIn`]}
          </Typography>
            <Grid container direction="row" justify="space-evenly" alignItems="center" style={{padding: 20}}>
          <>{Object.values(props.providers).filter((provide) => {return provide.id !== 'email'}).map(provider => {
            return(
              <div key={provider.name}>
            {provider.id !== 'email' && <Grid container >
            <Fab variant="round" onClick={() => {
             signIn(provider.id, { callbackUrl: `${process.env.NEXTAUTH_URL}${router.pathname}` }) 
             setLoadingRoute(!LoadingRoute)
            }}
                className={classes[`${provider.id}`]}>
                {renderSocialIcon(provider)}
            </Fab>
        </Grid>}
            </div>
            )
          })}</>
            </Grid>
            <ValidatorForm noValidate onSubmit={(e)=>{submit(e)}} className={classes.form}>
          <input name='csrfToken' type='hidden' defaultValue={csrfToken}/>
            <TextValidator
              variant="outlined"
              margin="normal"
              required
              fullWidth
              value={email}
              onChange={(e)=>SetEmail(e.target.value)}
              id="email"
              label={loginText[`${nextI18Next}_login_email_label`]}
              name="email"
              autoComplete="email"
              autoFocus
              validators={['required', 'isEmail']}
              errorMessages={[`${loginText[`${nextI18Next}_email_error_required`]}`, `${loginText[`${nextI18Next}_email_error_isEmail`]}`]}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              className={classes.submit}
            >
              {loginText[`${nextI18Next}_signin_button`]}
            </Button>
            <Box mt={5}>
              <Copyright {...props}/>
            </Box>
            </ValidatorForm>
        </div>
      </Grid>
    </Grid>
  
        </main>
      </div>
      </LoadingOverlay>
    </Fragment>
  );
}
SignInSide.propTypes={
  Dialog: PropTypes.bool.isRequired
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
  const session = await getSession(ctx);
  const profile = session !== null && await ownUser(session)
  if(profile){
    return{
      redirect:{
        permanent: false,
        destination: '/'
      }
    }
  }
  return {props: 
    {
    cookies,
    providers: await providers(ctx),
    csrfToken: await csrfToken(ctx),
    profile,
    header,
    loginText,
    copyrightText
  }}
})