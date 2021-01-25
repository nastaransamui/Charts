import React, { Fragment, useEffect, useState } from "react";
import { getCookies } from 'cookies-next';
import {connect} from "react-redux";
import useStyles from './candleChart-style';
import {useSelector, useDispatch} from 'react-redux';
import MainChart from './MainChart'
import  getCandleChartData  from "../../lib/candleChartData"
import { element } from "prop-types";

function ChartNormalize(props){
    const [data, setData] = useState(null);
    const classes = useStyles();
    const {
        TraidingView, 
        PeriodicDataUpdate,
        coingeckoSymbol, 
        cryptoCompareTsym,
        candleChartData
    } = useSelector(state => state)
    const [intervalTimer, SetIntervalTimer] = useState(PeriodicDataUpdate === "day" ? 86400000 : PeriodicDataUpdate === "hour" ? 3600000 : 60000)
    // Update interval timer base on PeriodicDataUpdate
    useEffect(()=>{
        
            switch (PeriodicDataUpdate) {
                case "day":
                    SetIntervalTimer(86400000)
                break;
                case "hour":
                    SetIntervalTimer(3600000)
                break;
                case "minute":
                    SetIntervalTimer(60000)   
                break;
                default:
                    break;
            }
    },[intervalTimer,PeriodicDataUpdate])

    //format data and fix time and date
    useEffect(()=>{
        let FixData = []
        candleChartData.forEach((element) =>{
            FixData.push({
				close: element.close,
				conversionSymbol: element.conversionSymbol,
				conversionType: element.conversionType,
				high: element.high,
				low: element.low,
				open: element.open,
				date: new Date(element.time *1000), //Change Epoch format
				volumefrom: element.volumefrom,
				volumeto: element.volumeto
            })
        })
        setData(FixData)
    },[candleChartData])

    //intervals update MainChart Data
    useEffect(()=>{
        let isMount = true;
        let FixData = []
        const candleChartDataInterval = setInterval(() => {
            if(isMount){
                getCandleChartData(
                    PeriodicDataUpdate,
                    coingeckoSymbol,
                    cryptoCompareTsym
                ).then((data)=>{
                    data.forEach((element) =>{
                        FixData.push({
                            close: element.close,
                            conversionSymbol: element.conversionSymbol,
                            conversionType: element.conversionType,
                            high: element.high,
                            low: element.low,
                            open: element.open,
                            date: new Date(element.time *1000), //Change Epoch format
                            volumefrom: element.volumefrom,
                            volumeto: element.volumeto
                        })
                    })
                    setData(FixData)
                })
            }
        }, intervalTimer);
        return()=>{
            isMount = false;
            clearInterval(candleChartDataInterval)
        }
    },[intervalTimer, data])
    
    return(
        <Fragment>
            {data !== null && <MainChart 
            data={data} 
            height={450} 
            TraidingView={TraidingView}
            PeriodicDataUpdate={PeriodicDataUpdate}/>}
        </Fragment>
    )
}

export default connect((state)=> state)(ChartNormalize);