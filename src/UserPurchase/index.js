import React, {useState,  Fragment} from 'react';
import {connect} from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import useStyles from './userPerchace-style'
import {a11yProps, TabPanel} from '../components/Tabs'
import PurchaseForms from './PurchaseForms';
const TabsValue =[
  'exchange',
]
const TabsValueMargin =[
  'Automatic Loan',
  'Automatic repayment',
  'Ordinary Mode'
]
function UserPurchase(props){
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [MarginClicked, SetMarginClicked]= useState(false)
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

  const TabClicked = (event, newValue) => {
    setValue(0)
    SetMarginClicked(!MarginClicked)
  };

    return(
        <Fragment>
            {MarginClicked ? 
            <div className={classes.container}>
              <div className={classes.chartActions} >
                <AppBar position="static" className={classes.appbar}>
                  <Tabs value={value} onChange={handleChange} aria-label="Perchase-tab-margin1" classes={{ root: classes.tabsRoot }}>
                    {TabsValue.map((t,i)=>{
                      return(<Tab label={t} key={i} {...a11yProps(i)} classes={{root: classes.tabsRoot }}  />)
                    })}
                  </Tabs>
                  <div>
                    <Button classes={{root: classes.buttonRoots }}>Credit Card</Button>
                    <Button  classes={{root: classes.buttonRoots }} onClick={()=>{SetMarginClicked(!MarginClicked)}}>
                      4 X Margin
                    </Button>
                  </div>
                </AppBar>
              </div>
                  {TabsValue.map((t,i)=>(<TabPanel key={i} value={value} index={i}>
                    <PurchaseForms {...props}/>
                  </TabPanel>))}
            </div>
             : 
             <div className={classes.container}>
               <div className={classes.chartActions} >
                 <AppBar position="static" className={classes.appbar}>
                 <Tabs value={value} onChange={handleChange} aria-label="Perchase-tab-margin2" classes={{ root: classes.tabsRoot }}>
                    {TabsValueMargin.map((t,i)=>(<Tab label={t} key={i} {...a11yProps(i)} classes={{root: classes.tabsRoot}} />))}
                 </Tabs>
                 <div><Button classes={{root: classes.buttonRoots}} onClick={TabClicked}>Transfer</Button> </div>
                 </AppBar>
               </div>
               {TabsValueMargin.map((t,i)=>(<TabPanel key={i} value={value} index={i}>
                 <PurchaseForms {...props}/>
               </TabPanel>))}
             </div>
             }
        </Fragment>
    )
}

export default connect((state)=> state)(UserPurchase);