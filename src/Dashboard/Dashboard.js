import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Head from 'next/head';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import { wrapper } from '../../redux/store';
import { setCookies } from 'cookies-next';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Grid, Paper } from '@material-ui/core';
import Exchange from '../Exchange/Exchange'
import Link from '@material-ui/core/Link';
import CandleChart from '../CandleChart'
import UserPurchase from '../UserPurchase';
import Orderbooks from '../Orderbooks';
import MarketTrades from '../MarketTrades'
import OrderReport from '../OrderReport'
import Copyright from '../Copyright'

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      marginTop: theme.spacing(10),
      minHeight: '100vh',
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: 'none',
    },
    title: {
      flexGrow: 1,
    },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 900,
    },
    fixedMiddleHeight: {
      height: '100%',
    },
  }));

  export default function Dashboard(props){
      const classes = useStyles();
      const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
      const fixedMiddleHeightPaper = clsx(classes.paper, classes.fixedMiddleHeight);
      return(
          <div className={classes.root}>
              <CssBaseline />
              <main className={classes.content}>
              <div className={classes.appBarSpacer} />
                <Container maxWidth={false} >
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={2}>
                      <Paper className={fixedHeightPaper}>
                          <Exchange {...props}/>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                      <div >
                        <Paper >
                          <CandleChart {...props}/>
                        </Paper>
                      </div>
                      <div >
                        <Paper style={{minHeight: 410}}>
                          <UserPurchase {...props}/>
                        </Paper>
                      </div>
                    </Grid>
                    <Grid item xs={12} md={6} lg={2}>
                      <Paper className={fixedHeightPaper}>
                        <Orderbooks {...props}/>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={6} lg={2}>
                      <Paper className={fixedHeightPaper}>
                        <MarketTrades {...props}/>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                      <Paper className={classes.paper}>
                        <OrderReport {...props}/>
                      </Paper>
                    </Grid>
                  </Grid>
                  <Box pt={4}>
                    <Copyright />
                  </Box>
                </Container>
              </main>
          </div>
      )
  }
