import React, {useState,  Fragment, useEffect} from 'react';
import {connect, useSelector} from "react-redux";
import useStyles from './orderBooks-style';
import Orderbooks from './Orderbooks'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {a11yProps} from '../CandleChart/TickerNavbar'
const TabsValue =[
    {
      value: 'Pair coins',
      id: 1
    },
  ]
function index(props){
    const {pairSymbol} = useSelector(state => state)
    const [pairSymbolData, setpairSymbolData] = useState(pairSymbol.data);
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    useEffect(()=>{
        let isMount = true;
        if(isMount){
            setpairSymbolData(pairSymbol.data)
        }
        return()=>{
            isMount = false;
        }
    }, [pairSymbolData])
    return (
        <Fragment>
            <AppBar position="static" className={classes.appbar}>
                        <Tabs value={value} onChange={handleChange} 
                        aria-label="TickerNavbar" 
                        classes={{ root: classes.tabsRoot }} >
                            {
                                TabsValue.map((t,i)=>(
                                    <Tab label={t.value} key={i} {...a11yProps(i)} classes={{root: classes.tabsRoot }} />
                                ))
                            }
                        </Tabs>
                    </AppBar>
            <Orderbooks pairSymbolData={pairSymbolData}/>
        </Fragment>
    )
}

export default connect((state)=> state)(index);