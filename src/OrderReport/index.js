import React, { Fragment, useEffect,useState } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import {useSelector, useDispatch} from 'react-redux';
import { getCookies, setCookies, removeCookies } from 'cookies-next';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
const tabHeight = '34px'
const tabWidth = '34px'
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
// Generate Order Data
function createData(id, time, pair, type, side, price, amount, total, trigger, status, action) {
  return { id, time, pair, type, side, price, amount, total, trigger, status, action };
}

const rows = [
  createData(0, '2020-12-20T20:42:21.676Z', 'USD/BTC', 'Tupelo, MS', '3719', 312.44, 1.3444, 12, 'trigger', 'status', 'action'),
  createData(1, '2020-12-20T20:42:21.676Z', 'USD/LTC', 'London, UK', '2574', 866.99, 1.3444, 12, 'trigger', 'status', 'action'),
  createData(2, '2020-12-20T20:42:21.676Z', 'ETH/ADA', 'Boston, MA', '1253', 100.81, 1.3444, 12, 'trigger', 'status', 'action'),
  createData(3, '2020-12-20T20:42:21.676Z', 'BCH/BSV', 'Gary, IN', '2000', 654.39, 1.3444, 12, 'trigger', 'status', 'action'),
  createData(4, '2020-12-20T20:42:21.676Z', 'BNB/XMR', 'Long Branch, NJ', '5919', 212.79, 1.3444, 12, 'trigger', 'status', 'action'),
];

function preventDefault(event) {
  event.preventDefault();
}
const TabsValue =[
  'Open Orders',
  'Order History',
]
const ButtonValue = [
  'Ordinary',
  'Stop-Limit',
  'TriggerOrder'
]
const useStyles = makeStyles((theme) => ({
  MainStyle: {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: 5,
  overflow: 'hidden'
  },
  Span:{
      minHeight: '100%',
      '& > *': {
        margin: theme.spacing(6),
      },
  },
  seeMore: {
    marginTop: theme.spacing(3),
  },
  container: {
    width: '100%',
    webkitBoxFlex: 1,
    flex: 1,
    flexDirection: 'colum',
  },
  chartActions: {
    height: 44,
    display: 'flex',
    fontSize: 12,
  },
  appbar:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.background.paper,
  },
  tabsRoot: {
    minHeight: tabHeight,
    height: tabHeight,
    minWidth: tabWidth,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary.main,
  },
  tabRoot: {
    minHeight: tabHeight,
    height: tabHeight,
    minWidth: tabWidth,
  },
  buttonRoots: {
    height: tabHeight,
    color: theme.palette.primary.main,
  },
  tablecell: {
    height: '16px', lineHeight: '10px',color:'#61688a'
  },
  MainTable:{
    minHeight: 500
  },
  tableHead: {
    height: 4,
  },
}));

function OrderReport(props){
    const classes = useStyles();
    const theme = useTheme();
    const cookies = getCookies(null)
    const [value, setValue] = useState(0);
    const [SinglePareData, setSinglePareData] = useState(null)
    const {Exchange, coingeckoSymbol, cryptoCompareTsym}= useSelector(state => state)
    useEffect(()=>{
      if(Exchange !== null){
        Exchange.forEach(element =>{
          if(element.symbol === cryptoCompareTsym){
            setSinglePareData(element)
          }
        })
      }
    },[Exchange])
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    
    return (
      <React.Fragment>
        {
          SinglePareData !== null &&
          <div className={classes.container}>
            <div className={classes.chartActions}>
              <AppBar position="static" className={classes.appbar}>
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" classes={{ root: classes.tabsRoot }}>
                    {
                      TabsValue.map((t,i)=>{
                        return(
                          <Tab label={t} key={i} {...a11yProps(i)} classes={{root: classes.tabsRoot }} />
                        )
                      })
                    }
                </Tabs>
        <div className={classes.switcher}>
        {/* <Button  classes={{root: classes.buttonRoots }}>
          Credit Card
        </Button>
        <Button  classes={{root: classes.buttonRoots }} onClick={()=>{SetMarginClicked(!MarginClicked)}}>
         4 X Margin
        </Button> */}
        </div>
              </AppBar>
            </div>
            {
              TabsValue.map((t,i)=>{
                return(
                  <TabPanel key={i} value={value} index={i}>
                  <div className={classes.MainStyle}>
                  <span  className={classes.Span}>
                    {
                      ButtonValue.map((t,i)=>{
                        return(
                          <Button key={i} variant="outlined" classes={{root: classes.buttonRoots}}>
                            {t}
                          </Button>
                        )
                      })
                    }
                  </span>
                  </div>
                  {
                    t === 'Open Orders' ? 
                    <Fragment>
                      <div>{t}</div>
                    <Table size="small" className={classes.MainTable}>
                      <TableHead >
                        <TableRow >
                          <TableCell  classes={{ root: classes.tablecell }}>Time</TableCell>
                          <TableCell classes={{ root: classes.tablecell }}>Pair</TableCell>
                          <TableCell classes={{ root: classes.tablecell }}>Type</TableCell>
                          <TableCell classes={{ root: classes.tablecell }}>Side</TableCell>
                          <TableCell classes={{ root: classes.tablecell }}>Price(USDT)</TableCell>
                          <TableCell classes={{ root: classes.tablecell }}>Amount({SinglePareData.symbol.toUpperCase()})</TableCell>
                          <TableCell classes={{ root: classes.tablecell }}>Total(USDT)</TableCell>
                          <TableCell classes={{ root: classes.tablecell }}>Trigger condition</TableCell>
                          <TableCell classes={{ root: classes.tablecell }}>Status</TableCell>
                          <TableCell classes={{ root: classes.tablecell }}>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row)=>{
                          return(
                            <TableRow style={{height: "10px"}} key={row.id} >
                              <TableCell style={{height: "10px"}}>{row.time}</TableCell>
                          <TableCell style={{height: "10px"}}>{row.pair}</TableCell>
                          <TableCell style={{height: "10px"}}>{row.type}</TableCell>
                          <TableCell style={{height: "10px"}}>{row.side}</TableCell>
                          <TableCell style={{height: "10px"}}>{row.price}</TableCell>
                          <TableCell style={{height: "10px"}}>{row.amount}</TableCell>
                          <TableCell style={{height: "10px"}}>{row.total}</TableCell>
                          <TableCell style={{height: "10px"}}>{row.trigger}</TableCell>
                          <TableCell style={{height: "10px"}}>{row.status}</TableCell>
                          <TableCell style={{height: "10px"}}>{row.action}</TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                    </Fragment>
                    :
                    <Fragment>
                      <div>{t}</div>
                    <Table size="small" className={classes.MainTable}>
                      <TableHead >
                        <TableRow >
                          <TableCell  classes={{ root: classes.tablecell }}>Time</TableCell>
                          <TableCell classes={{ root: classes.tablecell }}>Pair</TableCell>
                          <TableCell classes={{ root: classes.tablecell }}>Type</TableCell>
                          <TableCell classes={{ root: classes.tablecell }}>Side</TableCell>
                          <TableCell classes={{ root: classes.tablecell }}>Price(USDT)</TableCell>
                          <TableCell classes={{ root: classes.tablecell }}>Amount({SinglePareData.symbol.toUpperCase()})</TableCell>
                          <TableCell classes={{ root: classes.tablecell }}>Total(USDT)</TableCell>
                          <TableCell classes={{ root: classes.tablecell }}>Trigger condition</TableCell>
                          <TableCell classes={{ root: classes.tablecell }}>Status</TableCell>
                          <TableCell classes={{ root: classes.tablecell }}>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row)=>{
                          return(
                            <TableRow style={{height: "10px"}} key={row.id} >
                              <TableCell style={{height: "10px"}}>{row.time}</TableCell>
                          <TableCell style={{height: "10px"}}>{row.pair}</TableCell>
                          <TableCell style={{height: "10px"}}>{row.type}</TableCell>
                          <TableCell style={{height: "10px"}}>{row.side}</TableCell>
                          <TableCell style={{height: "10px"}}>{row.price}</TableCell>
                          <TableCell style={{height: "10px"}}>{row.amount}</TableCell>
                          <TableCell style={{height: "10px"}}>{row.total}</TableCell>
                          <TableCell style={{height: "10px"}}>{row.trigger}</TableCell>
                          <TableCell style={{height: "10px"}}>{row.status}</TableCell>
                          <TableCell style={{height: "10px"}}>{row.action}</TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                    </Fragment>
                  }
                  </TabPanel>
                )
              })
            }
          </div>
  
        }
      </React.Fragment>
    );
  }
export default OrderReport;