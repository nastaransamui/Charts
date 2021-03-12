import React, {useState,  Fragment, useEffect} from 'react';
import {connect, useSelector} from "react-redux";
import useStyles from './marketTrades-style';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {a11yProps} from '../CandleChart/TickerNavbar';
import MarketTrade from './MarketTrade'
const TabsValue =[
    {
      value: 'Market Trades',
      id: 1
    },
  ]

  function index(props){
    
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const {marketTradeSymbolTitle} = useSelector(state => state)
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return(
        <Fragment>
            <AppBar position="static" className={classes.appbar}>
            <Tabs value={value} onChange={handleChange}  aria-label="TickerNavbar"  classes={{ root: classes.tabsRoot }} >
            {TabsValue.map((t,i)=>( <Tab label={marketTradeSymbolTitle} key={i} {...a11yProps(i)} classes={{root: classes.tabsRoot }} />))}
            </Tabs>
            </AppBar> 
            <MarketTrade  {...props}/>
        </Fragment>
    )
  }

export default connect((state)=> state)(index);