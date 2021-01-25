import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from "prop-types";
import {useSelector, useDispatch, connect} from 'react-redux';
import { useTheme } from '@material-ui/core/styles';
import useStyles from './orderBooks-style';
import Paper from '@material-ui/core/Paper';
import VirtualizedTable from './OrderBookTable'
import AlertDialog from '../components/AlertDialog'
import { setCookies } from 'cookies-next';
import { getMarketTradeHuobi } from '../../lib/marketTrades';
function Orderbooks(props){
    const classes = useStyles();
    const theme = useTheme();
    const {coingeckoSymbol, cryptoCompareTsym, marketTradeSymbol,marketTrade} = useSelector(state => state)
    const [alertOpen, setAlertOpen] = useState(false)
    const [ContentHeader, setContentHeader] = useState("")
    const [ContentText, setContentText] = useState("")
    const {pairSymbolData} = props;
    const dispatch = useDispatch();
    const OpenCloseAlert =()=>{
        setAlertOpen(!alertOpen)
    }

    const RowClicked =(value) =>{
        const BaseCurrency =value.rowData[`base-currency`].toUpperCase()
        const QuoteCurrency= value.rowData[`quote-currency`].toUpperCase()

        if(value.rowData.state === 'offline') {
        setAlertOpen(true)
        setContentHeader(`Offline Traiding Pair`)
        setContentText(`Unfortunatley ${BaseCurrency} as base coin Traiding with ${QuoteCurrency} is ofline for now. `)
        }else{
            setCookies(null, 'marketTradeSymbol', value.rowData.symbol)
            dispatch({type: 'marketTradeSymbol', payload: value.rowData.symbol});
            setCookies(null, 'marketTradeSymbolTitle', `${BaseCurrency}-${QuoteCurrency}`)
            dispatch({type: 'marketTradeSymbolTitle', payload:  `${BaseCurrency}-${QuoteCurrency}`});
            getMarketTradeHuobi(value.rowData.symbol).then((data) => {dispatch({type: 'marketTrade', payload: data})})
        }
    }
    return(
        <Fragment>
        <AlertDialog 
        open={alertOpen} 
        handleClose={OpenCloseAlert}
        ContentHeader={ContentHeader}
        ContentText={ContentText}/>
            <Paper style={{ height: 840, width: '100%'}}>
                <VirtualizedTable
                theme={theme}
                classes={classes}
                rowCount={pairSymbolData.length}
                Data={pairSymbolData}
                onRowClick={(data) => { RowClicked(data) }}
                columns={[
                    {
                        label: "Base",
                        numeric: false,
                        dataKey: "base-currency"
                    },
                    {
                        label: "Quote",
                        numeric: false,
                        dataKey: "quote-currency"
                    },
                    {
                        label: "Status",
                        numeric: false,
                        dataKey: "state"
                    },
                ]} />
            </Paper>
        </Fragment>
    )
}

Orderbooks.propTypes ={
    pairSymbolData: PropTypes.array.isRequired,
}

export default connect((state)=> state)(Orderbooks);
