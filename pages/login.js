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

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
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

export default function SignInSide(props) {
  const classes = useStyles();
  const theme = useTheme();
  const router = useRouter()
  const {csrfToken} = props;
  const onCancellDialog = (e) =>{
    setAlertDialogState({
      ...AlertDialogState,
      open: false
    })
    console.log("hashem")
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
    if(email !== "") signIn('email', { email, callbackUrl: `http://localhost:3000${router.pathname}` })
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

  const [ loading] = useSession();

  const [email, SetEmail] = useState('')
  const {Dialog} = props;
  const [session] = useSession()
  const submit = (e) =>{
    e.preventDefault()
    setAlertDialogState({
      handleClose: onCloseDialog,
      CancellDialog: onCancellDialog,
      open: true,
      ContentText: `Verification Email was sent to ${email} Kindly recheck and click on link.`,
      ContentHeader:`Email Login request`,
      closeButtom: "Agree",
      cancelButton:"Close",
    })
  }
  
  useEffect(()=>{
    let isMount = true;
    if(isMount&& router.query.SendEmail !== undefined){
      if(router.query.SendEmail === "true"){
        setAlertDialogState({
          handleClose: onCloseDialog,
          CancellDialog: onCancellDialog,
          open: true,
          ContentText: `Verification email was sent to ${email} with link kindly recheck your email and click on link to login.`,
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
  useEffect(()=>{
    let isMount = true;
    if(isMount && session !== null){
      if(session !== undefined){
        router.push("/");
      }
    }
    return() =>{
      isMount = false;
    }
  },[session])

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
            Sign in
          </Typography>
            <Grid container direction="row" justify="space-evenly" alignItems="center" style={{padding: 20}}>
          <>{Object.values(props.providers).filter((provide) => {return provide.id !== 'email'}).map(provider => {
            return(
              <div key={provider.name}>
            {provider.id !== 'email' && <Grid container >
            <Fab variant="round" onClick={() =>  signIn(provider.id, { callbackUrl: `http://localhost:3000${router.pathname}` }) }
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
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              validators={['required', 'isEmail']}
              errorMessages={['this field is required', 'email is not valid']}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Box mt={5}>
              <Copyright />
            </Box>
            </ValidatorForm>
        </div>
      </Grid>
    </Grid>
  
        </main>
      </div>
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
  const cookies = getCookies(ctx);
  const session = await getSession(ctx);
  if(ctx.res && session !== null ){
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
    session
  }}
})