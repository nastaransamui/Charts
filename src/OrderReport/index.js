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
import Moment from 'react-moment';
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
function createData(id, time, pair, en_type, cn_type, side, price, amount, total, en_trigger, cn_trigger, en_status, cn_status, en_action, cn_action) {
  return { id, time, pair, en_type, cn_type, side, price, amount, total, en_trigger, cn_trigger, en_status, cn_status, en_action, cn_action };
}

const rows = [
  createData(0, '2020-12-20T20:42:21.676Z', 'USD/BTC', 'Tupelo, MS', '密西西比州图珀洛', '3719', 312.44, 1.3444, 12, 'trigger', '扳机', 'status', '状态', 'action','行动'),
  createData(1, '2020-12-20T20:42:21.676Z', 'USD/LTC', 'London, UK', '英国伦敦', '2574', 866.99, 1.3444, 12, 'trigger', '扳机', 'status', '状态', 'action','行动'),
  createData(2, '2020-12-20T20:42:21.676Z', 'ETH/ADA', 'Boston, MA', '马萨诸塞州波士顿', '1253', 100.81, 1.3444, 12, 'trigger', '扳机', 'status', '状态', 'action','行动'),
  createData(3, '2020-12-20T20:42:21.676Z', 'BCH/BSV', 'Gary, IN',  '加里，印第安纳州', '2000', 654.39, 1.3444, 12, 'trigger', '扳机', 'status', '状态', 'action','行动'),
  createData(4, '2020-12-20T20:42:21.676Z', 'BNB/XMR', 'Long Branch, NJ', '新泽西州长分公司', '5919', 212.79, 1.3444, 12, 'trigger', '扳机', 'status', '状态', 'action','行动'),
];

function preventDefault(event) {
  event.preventDefault();
}
const TabsValue =[
  {
    en:  'Open Orders',
    cn: "未结订单"
  },
  {
    en: 'Order History',
    cn: '订单历史'
  }
]
const ButtonValue = [
  {
    en:  'Ordinary',
    cn: '普通的'
  },
  {
    en: 'Stop-Limit',
    cn: "停止限制"
  },
  {
    en: 'Trigger Order',
    cn: '触发顺序'
  }
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
    const {dashboardText} = props;
    const [value, setValue] = useState(0);
    const [SinglePareData, setSinglePareData] = useState(null)
    const {Exchange, coingeckoSymbol, cryptoCompareTsym, "next-i18next": nextI18Next}= useSelector(state => state)
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
                          <Tab label={t[`${nextI18Next}`]} key={i} {...a11yProps(i)} classes={{root: classes.tabsRoot }} />
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
                            {t[`${nextI18Next}`]}
                          </Button>
                        )
                      })
                    }
                  </span>
                  </div>
                  {
                    t.en === 'Open Orders' ? 
                    <Fragment>
                      <div>{t[`${nextI18Next}`]}</div>
                    <Table size="small" className={classes.MainTable}>
                      <TableHead >
                        <TableRow >
                          <TableCell  classes={{ root: classes.tablecell }}>{dashboardText[`${nextI18Next}_orderReport_table0`]}</TableCell>
                          <TableCell classes={{ root: classes.tablecell }}>{dashboardText[`${nextI18Next}_orderReport_table1`]}</TableCell>
                          <TableCell classes={{ root: classes.tablecell }}>{dashboardText[`${nextI18Next}_orderReport_table2`]}</TableCell>
                          <TableCell classes={{ root: classes.tablecell }}>{dashboardText[`${nextI18Next}_orderReport_table3`]}</TableCell>
                          <TableCell classes={{ root: classes.tablecell }}>{dashboardText[`${nextI18Next}_orderReport_table4`]}</TableCell>
                          <TableCell classes={{ root: classes.tablecell }}>{dashboardText[`${nextI18Next}_orderReport_table5`]}({SinglePareData.symbol.toUpperCase()})</TableCell>
                          <TableCell classes={{ root: classes.tablecell }}>{dashboardText[`${nextI18Next}_orderReport_table6`]}</TableCell>
                          <TableCell classes={{ root: classes.tablecell }}>{dashboardText[`${nextI18Next}_orderReport_table7`]}</TableCell>
                          <TableCell classes={{ root: classes.tablecell }}>{dashboardText[`${nextI18Next}_orderReport_table8`]}</TableCell>
                          <TableCell classes={{ root: classes.tablecell }}>{dashboardText[`${nextI18Next}_orderReport_table9`]}</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row)=>{
                          return(
                            <TableRow style={{height: "10px"}} key={row.id} >
                              <TableCell style={{height: "10px"}}><Moment locale={nextI18Next === "cn" && "zh_cn"  }format="MMMM Do YYYY, h:mm a">{row.time}</Moment></TableCell>
                          <TableCell style={{height: "10px"}}>{row.pair}</TableCell>
                          <TableCell style={{height: "10px"}}>{row[`${nextI18Next}_type`]}</TableCell>
                          <TableCell style={{height: "10px"}}>{row.side}</TableCell>
                          <TableCell style={{height: "10px"}}>{row.price}</TableCell>
                          <TableCell style={{height: "10px"}}>{row.amount}</TableCell>
                          <TableCell style={{height: "10px"}}>{row.total}</TableCell>
                          <TableCell style={{height: "10px"}}>{row[`${nextI18Next}_trigger`]}</TableCell>
                          <TableCell style={{height: "10px"}}>{row[`${nextI18Next}_status`]}</TableCell>
                          <TableCell style={{height: "10px"}}>{row[`${nextI18Next}_action`]}</TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                    </Fragment>
                    :
                    <Fragment>
                      <div>{t[`${nextI18Next}`]}</div>
                    <Table size="small" className={classes.MainTable}>
                      <TableHead >
                        <TableRow >
                        <TableCell  classes={{ root: classes.tablecell }}>{dashboardText[`${nextI18Next}_orderReport_table0`]}</TableCell>
                          <TableCell classes={{ root: classes.tablecell }}>{dashboardText[`${nextI18Next}_orderReport_table1`]}</TableCell>
                          <TableCell classes={{ root: classes.tablecell }}>{dashboardText[`${nextI18Next}_orderReport_table2`]}</TableCell>
                          <TableCell classes={{ root: classes.tablecell }}>{dashboardText[`${nextI18Next}_orderReport_table3`]}</TableCell>
                          <TableCell classes={{ root: classes.tablecell }}>{dashboardText[`${nextI18Next}_orderReport_table4`]}</TableCell>
                          <TableCell classes={{ root: classes.tablecell }}>{dashboardText[`${nextI18Next}_orderReport_table5`]}({SinglePareData.symbol.toUpperCase()})</TableCell>
                          <TableCell classes={{ root: classes.tablecell }}>{dashboardText[`${nextI18Next}_orderReport_table6`]}</TableCell>
                          <TableCell classes={{ root: classes.tablecell }}>{dashboardText[`${nextI18Next}_orderReport_table7`]}</TableCell>
                          <TableCell classes={{ root: classes.tablecell }}>{dashboardText[`${nextI18Next}_orderReport_table8`]}</TableCell>
                          <TableCell classes={{ root: classes.tablecell }}>{dashboardText[`${nextI18Next}_orderReport_table9`]}</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row)=>{
                          return(
                            <TableRow style={{height: "10px"}} key={row.id} >
                              <TableCell style={{height: "10px"}}>{row.time}</TableCell>
                          <TableCell style={{height: "10px"}}>{row.pair}</TableCell>
                          <TableCell style={{height: "10px"}}>{row[`${nextI18Next}_type`]}</TableCell>
                          <TableCell style={{height: "10px"}}>{row.side}</TableCell>
                          <TableCell style={{height: "10px"}}>{row.price}</TableCell>
                          <TableCell style={{height: "10px"}}>{row.amount}</TableCell>
                          <TableCell style={{height: "10px"}}>{row.total}</TableCell>
                          <TableCell style={{height: "10px"}}>{row[`${nextI18Next}_trigger`]}</TableCell>
                          <TableCell style={{height: "10px"}}>{row[`${nextI18Next}_status`]}</TableCell>
                          <TableCell style={{height: "10px"}}>{row[`${nextI18Next}_action`]}</TableCell>
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