import React, { Fragment, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import SearchIcon from '@material-ui/icons/Search';
import Autorenew from '@material-ui/icons/Autorenew'
import Tooltip from '@material-ui/core/Tooltip';
import { Button } from '@material-ui/core';
import {connect} from "react-redux";
import {wrapper} from '../../redux/store';
import { setCookies } from 'cookies-next';
import { useSelector, useDispatch } from 'react-redux';
import CoinData from '../../public/data/coins'
import Tabs from '../components/Tabs'
import getExchangeData from '../../lib/exchange'
import ExchangeTable from './ExchangeTable';
import getCandleChartData from '../../lib/candleChartData'
const useStyles = makeStyles((theme) => ({
    depositContext: {
      flex: 1,
    },
    margin: {
      margin: theme.spacing(1),
      marginTop:  theme.spacing(5),
    },
    group: {
      height: '24px',
      display: 'inline-flex',
      borderRadius: '2px',
      border: '1px solid',
      marginTop:  theme.spacing(5),
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignContent: 'space-around'
    },
    buttonRoot:{
      display: 'inline-block',
      padding:0,
      minWidth: '11%',
      borderRadius: '0px',
    },
    buttonRootSelect:{
      display: 'inline-block',
      padding:0,
      minWidth: '13%',
      borderRadius: '0px',
      background: theme.palette.primary.main,
    }
  }));

function Exchange(props){
    const classes = useStyles();
    const {cryptoCompareTsym, coingeckoSymbol, PeriodicDataUpdate,Exchange} = useSelector(state => state);
    const [buttonValue, setButtonValue] = useState(null)
  const dispatch = useDispatch();
  const FavbuttonClicked = (text) =>{
    if (text.symbol !== 'Fav') {
    setButtonValue(text.symbol)
    setCookies(null, 'coingeckoSymbol', text.symbol)
    dispatch({type: 'coingeckoSymbol', payload: text.symbol});
    getExchangeData(text.symbol).then((data)=>{dispatch({type: 'Exchange', payload: data})})
    if (text.symbol === cryptoCompareTsym  && text.symbol !== 'usd') {
        setCookies(null, 'cryptoCompareTsym', 'usd')
        dispatch({type: 'cryptoCompareTsym', payload: 'usd'});
        
    }
      if (text.symbol === cryptoCompareTsym && text.symbol === 'usd') {
        setCookies(null, 'cryptoCompareTsym', 'btc')
        dispatch({type: 'cryptoCompareTsym', payload: 'btc'});
        
      }
        getCandleChartData(PeriodicDataUpdate, coingeckoSymbol,cryptoCompareTsym).then((data)=>{
          dispatch({type: 'candleChartData', payload: data});
        })
    }
  }

  useEffect(()=>{
      setButtonValue(coingeckoSymbol)
  },[buttonValue])
  
  return(
      <Fragment>
          <FormControl size="small" className={classes.margin} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-amount">Search</InputLabel>
          <OutlinedInput
            value=""
            endAdornment={<InputAdornment position="start"><SearchIcon /></InputAdornment>}
            labelWidth={60}
          />
        </FormControl>
          <div className={classes.group}>
        {CoinData.map((text,index)=>{
          return(
            <Button color="secondary" key={index} classes={{ root: buttonValue === text.symbol ? `${classes.buttonRootSelect}`: `${classes.buttonRoot}`}} onClick={()=>FavbuttonClicked(text)}>
              {text.symbol}
            </Button>
          )
        })}
        <Tooltip title="Show last price in USD">
        <Autorenew />
        </Tooltip>
      </div>
      <div>
      {buttonValue === 'usd' ? <Tabs />: <ExchangeTable />}
      </div>
      </Fragment>
  )
}
export default connect((state)=> state)(Exchange);