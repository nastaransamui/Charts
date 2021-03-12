import React, {useState, useEffect, Fragment} from 'react';
import {connect} from "react-redux";
import {useSelector} from 'react-redux';
import TickerNavbar from './TickerNavbar'


function Index(props){
    const {Exchange, coingeckoSymbol, cryptoCompareTsym} = useSelector(state => state)
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
                {...props}
                tabCoin={tabCoin} 
                QouteCoin={QouteCoin} 
                SinglePareData={SinglePareData}/>
                </>
            }
        </Fragment>
        
    )
}

export default connect((state)=> state)(Index);