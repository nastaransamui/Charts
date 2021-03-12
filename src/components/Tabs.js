import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import ExchangeTable from "../Exchange/ExchangeTable";
 const TabsValue =[
   'ETP',
   'Inno',
   'DeFi',
   'Polkdot',
   'Storage'
 ]
export function TabPanel(props) {
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
        <Box>
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

export function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const tabHeight = '24px'
const tabWidth = '24px'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
  }
}));

export default function SimpleTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" classes={{ root: classes.tabsRoot }}>
          {
            TabsValue.map((t,i) =>{
              return(
                <Tab label={t} key={i} {...a11yProps(i)} classes={{root: classes.tabsRoot }} />
              )
            })
          }
        </Tabs>
      </AppBar>
      {
        TabsValue.map((t,i)=>{
          return (<TabPanel key={i} value={value} index={i}>
            <ExchangeTable {...props}/>
          </TabPanel>)
        })
      }
    </div>
  );
}