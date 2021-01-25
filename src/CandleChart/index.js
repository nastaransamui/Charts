import React, {useState, useEffect, Fragment} from 'react';
import { useTheme } from '@material-ui/core/styles';
import {connect} from "react-redux";
import { getCookies, setCookies } from 'cookies-next';
import {useSelector, useDispatch} from 'react-redux';
import PropTypes, { element } from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TabPanel from '../components/Tabs'
import useStyles from './candleChart-style'
import TickerNavbar from './TickerNavbar'


function Index(){
    const theme = useTheme();
    const classes = useStyles();
    const {Exchange, coingeckoSymbol, cryptoCompareTsym, PeriodicDataUpdate} = useSelector(state => state)
    const [tabCoin, setTabCoin] = useState(null)
    const [QouteCoin, setQouteCoin] = useState(null)
    const [SinglePareData, setSinglePareData] = useState(null)
    useEffect(()=>{
        let isMount = true;
        if (isMount) {
            setTabCoin(coingeckoSymbol)
            setQouteCoin(cryptoCompareTsym)
        }
        return()=>{
            isMount = false
        }
    })
    useEffect(()=>{
        let isMount = true;
        if (isMount && Exchange !== null) {
            Exchange.forEach(element =>{
                if(element.symbol === QouteCoin)  setSinglePareData(element)
            })
        }
    },[Exchange,QouteCoin])
    return(
        <Fragment>
            {
                SinglePareData !== null &&
                <>
                <TickerNavbar 
                tabCoin={tabCoin} 
                QouteCoin={QouteCoin} 
                SinglePareData={SinglePareData}/>
                </>
            }
        </Fragment>
        
    )
}

export default connect((state)=> state)(Index);