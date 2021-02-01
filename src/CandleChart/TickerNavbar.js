import React, {useState, useEffect, Fragment} from 'react';
import useStyles from './candleChart-style'
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';
import { useTheme } from '@material-ui/core/styles';
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import { setCookies} from 'cookies-next';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Button } from '@material-ui/core';
import ChartNormalize from './ChartNormalize';
import getCandleChartData from '../../lib/candleChartData'
const TabsValue =[
    {
      value: 'Daily',
      id: 'day'
    },
    {
      value: 'Hourly',
      id: 'hour'
    },
    {
      value: 'Minutely',
      id: 'minute'
    },
  ]
 export function a11yProps(index) {
    return {
      id: `TickerNavbar-${index}`,
      'aria-controls': `TickerNavbar-tabpanel-${index}`,
    };
  }
function TickerNavbar(props){
    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();
    const {SinglePareData, tabCoin, QouteCoin} = props
    const {
        Exchange, 
        coingeckoSymbol, 
        cryptoCompareTsym, 
        PeriodicDataUpdate,
        TraidingView
    } = useSelector(state => state)
    const [Color, setColor] = useState('')
    const [value, setValue] = React.useState(0);


    useEffect(()=>{
        let isMount = true
        if(isMount){
            setColor(SinglePareData.price_change_percentage_24h < 0 ?  `${theme.palette.info.light}` : `${theme.palette.info.dark}` )
        }
        return()=>{
            isMount = false;
        }
    },[SinglePareData, theme.palette.type])


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleClickTab = (t)=>{
        dispatch({type: 'PeriodicDataUpdate', payload: t.id})
        setCookies(null, 'PeriodicDataUpdate', t.id)
        getCandleChartData(t.id, coingeckoSymbol,cryptoCompareTsym).then((data)=>{
            dispatch({type: 'candleChartData', payload: data});
        })
    }
    // Fix the selected Tab Peridic
    useEffect(()=>{
        setValue(TabsValue.findIndex(x => x.id ===PeriodicDataUpdate))
    }, [PeriodicDataUpdate])
    return(
        <Fragment>
            <div className={classes.ticker}>
                <span className={classes.symbolName}>
                    {tabCoin.toUpperCase()} / {QouteCoin.toUpperCase()}
                </span>
                <div className={classes.priceContainer}>
                    <span className={classes.containerSpan} style={{color: Color}}>
                        {(SinglePareData.current_price).toLocaleString()}
                    </span>
                    <span className={classes.Estimate}>
                        ≈ {(SinglePareData.current_price).toLocaleString()} {coingeckoSymbol.toUpperCase()}
                    </span>
                </div>
                <dl className={classes.change}>
                    <dt className={classes.dtClass}>24H High</dt>
                    <dd>{(SinglePareData.high_24h).toLocaleString()}</dd>
                </dl>
                <dl className={classes.change}>
                    <dt className={classes.dtClass}>24H Low</dt>
                    <dd>{(SinglePareData.low_24h).toLocaleString()}</dd>
                </dl>
                <dl className={classes.change}>
                    <dt className={classes.dtClass}>Total Volume</dt>
                    <dd>{(SinglePareData.total_volume).toLocaleString()}</dd>
                </dl>
                <div className={classes.globalTheme}>
                    <StarBorderRoundedIcon onClick={()=>console.log('star')} style={{cursor: 'pointer', marginRight: 10}}/>
                </div>
            </div>
            <div className={classes.container}>
                <div className={classes.chartActions}>
                    <AppBar position="static" className={classes.appbar}>
                        <Tabs value={value} onChange={handleChange} 
                        aria-label="TickerNavbar" 
                        classes={{ root: classes.tabsRoot }} >
                            {
                                TabsValue.map((t,i)=>(
                                    <Tab label={t.value} key={i} {...a11yProps(i)} classes={{root: classes.tabsRoot }} onClick={()=>handleClickTab(t)}/>
                                ))
                            }
                        </Tabs>
                        <div >
                            <Button disabled={!TraidingView} variant="outlined" classes={{root: classes.buttonRoots }} onClick={()=>{dispatch({type: 'TraidingView', payload: false});setCookies(null, 'TraidingView', false)}}>
                                Normal View
                            </Button>
                            <Button disabled={TraidingView} variant="outlined" classes={{root: classes.buttonRoots }} onClick={()=>{dispatch({type: 'TraidingView', payload: true});setCookies(null, 'TraidingView', true)}}>
                                Traiding View
                            </Button>
                        </div>
                    </AppBar>
                </div>
                <ChartNormalize />
            </div>
        </Fragment>
    )
}

TickerNavbar.propTypes ={
    SinglePareData: PropTypes.object.isRequired,
    tabCoin: PropTypes.string.isRequired,
    QouteCoin: PropTypes.string.isRequired
}

export default TickerNavbar;