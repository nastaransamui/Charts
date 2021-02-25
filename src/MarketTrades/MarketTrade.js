import React, { Fragment, useEffect, useState } from 'react';
import useStyles from './marketTrades-style';
import PropTypes from "prop-types";
import {useSelector, useDispatch, connect} from 'react-redux';
import { useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { getMarketTradeHuobi } from '../../lib/marketTrades';
import MarketTradeTable from './MarketTradeTabel'
function MarketTrade(props){
    const {marketTrade, marketTradeSymbol} = useSelector(state => state)
    const [marketTradeData, setMarketTradeData] = useState([...marketTrade.tick.data]);
    useEffect(()=>{
        let isMount = marketTradeSymbol;
        if (isMount) {
            setMarketTradeData([...marketTrade.tick.data])
        }
        return ()=>{
            isMount = false;
        }
    },[marketTradeSymbol, marketTrade])
    
    useEffect(()=>{
        let isMount = true;
            let marketTradeDataInterval = setInterval(() => {
                if(isMount){
                    getMarketTradeHuobi(marketTradeSymbol).then((data)=>{
                        const oldTradeIds = marketTradeData.map((t,i)=> t[`trade-id`])
                        const newTradeIds =  data.tick.data.map((t,i)=> t[`trade-id`]) 
                        let NewTrade = true
                            oldTradeIds.map((t) => {
                                if ( newTradeIds.indexOf(t) < 0) {
                                    return NewTrade = true
                                } else {
                                    return NewTrade = false
                                }
                            })
                            if(NewTrade){
                        setMarketTradeData(prevState=>[...prevState, ...data.tick.data])
                            }
                    })
                }
            }, 3000);
        return() =>{
            clearInterval(marketTradeDataInterval)
            isMount = false
        }
    },[marketTradeSymbol,marketTradeData])
    
    useEffect(()=>{
        let isMount = true;
        if(isMount){
            if(marketTradeData.length > 100){
                let FilterData = marketTradeData.slice(-100)
                setMarketTradeData(FilterData)
            }
        }
        return()=>{
            isMount = false;
            marketTradeData
        }
    },[marketTradeData])
    
    return(
        <Fragment>
            <Paper style={{ height: 840, width: '100%'}}>
                <MarketTradeTable marketTradeData={marketTradeData}/>
            </Paper>
        </Fragment>
    )
}


export default connect((state) => state)(MarketTrade)