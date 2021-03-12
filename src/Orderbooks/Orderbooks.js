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
    const {"next-i18next": nextI18Next } = useSelector(state => state)
    const [alertOpen, setAlertOpen] = useState(false)
    const [ContentHeader, setContentHeader] = useState("")
    const [ContentText, setContentText] = useState("")
    const {pairSymbolData,dashboardText} = props;
    const dispatch = useDispatch();
    const OpenCloseAlert =()=>{
        setAlertOpen(!alertOpen)
    }
    const onCancellDialog =() =>{
        setAlertOpen(false)
    }

    const RowClicked =(value) =>{
        const BaseCurrency =value.rowData[`base-currency`].toUpperCase()
        const QuoteCurrency= value.rowData[`quote-currency`].toUpperCase()

        if(value.rowData.state === 'offline') {
        setAlertOpen(true)
        setContentHeader(`${dashboardText[`${nextI18Next}_orderbooks_offline`]}`)
        setContentText(`${dashboardText[`${nextI18Next}_orderbooks_unfortune`]} ${BaseCurrency} ${dashboardText[`${nextI18Next}_orderbooks_base`]} ${QuoteCurrency} ${dashboardText[`${nextI18Next}_orderbooks_ofline`]} `)
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
        ContentText={ContentText}
        closeButtom="NotAgree"
        cancelButton="Close"
        CancellDialog= {onCancellDialog}/>
            <Paper style={{ height: 840, width: '100%'}}>
                <VirtualizedTable
                theme={theme}
                classes={classes}
                rowCount={pairSymbolData.length}
                Data={pairSymbolData}
                dashboardText={dashboardText}
                onRowClick={(data) => { RowClicked(data) }}
                columns={[
                    {
                        label: dashboardText[`${nextI18Next}_orderbooks_label0`],
                        numeric: false,
                        dataKey: "base-currency"
                    },
                    {
                        label: dashboardText[`${nextI18Next}_orderbooks_label1`],
                        numeric: false,
                        dataKey: "quote-currency"
                    },
                    {
                        label: dashboardText[`${nextI18Next}_orderbooks_label2`],
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
