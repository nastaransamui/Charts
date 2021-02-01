import React from 'react';

import { TableHead, TableCell, TableContainer, Paper, Table, TableRow, TableBody } from '@material-ui/core';
import PropTypes from "prop-types";
import _ from "lodash";
import {useTheme} from '@material-ui/core/styles'
import useStyles from './marketTrades-style';

function MarketTradeTable(props){
    const {marketTradeData} = props;
    const theme = useTheme();
    const classes= useStyles();
    
    return (
        <TableContainer component={Paper}>
        <Table  aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" style={{padding: 8}} align="center">Time</TableCell>
              <TableCell padding="checkbox"style={{padding: 8}}  align="center">Price</TableCell>
              <TableCell padding="checkbox" style={{padding: 8}} align="center">Direction</TableCell>
              <TableCell padding="checkbox"style={{padding: 8}}  align="center">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {marketTradeData.slice(0).reverse().map((row,index) => {
              const fullTime = new Date(row.ts)
              
              return(
                <TableRow key={`${row.amount}${index}${row.ts}${row.id}`} >
                <TableCell align="center" padding="checkbox" component="th" scope="row" style={{ padding: 8, color: row.direction === 'buy'? `${theme.palette.info.light}` : `${theme.palette.info.dark}`}}>
                {fullTime.getHours() + ":" + fullTime.getMinutes() + ":" + fullTime.getSeconds()}
                </TableCell>
                <TableCell padding="checkbox" align="center" style={{ padding: 8, color: row.direction === 'buy'? `${theme.palette.info.light}` : `${theme.palette.info.dark}`}}>{parseFloat(row.price)}</TableCell>
                <TableCell padding="checkbox" align="center" style={{ padding: 8, color: row.direction === 'buy'? `${theme.palette.info.light}` : `${theme.palette.info.dark}`}}>{row.direction}</TableCell>
                <TableCell padding="checkbox" align="center" style={{ padding: 8, color: row.direction === 'buy'? `${theme.palette.info.light}` : `${theme.palette.info.dark}`}}>
                  {Math.round(row.amount * Math.pow(10,4)) / Math.pow(10,4)}
                  </TableCell>
              </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    )
}

MarketTradeTable.propTypes = {
    marketTradeData: PropTypes.array.isRequired
}
export default MarketTradeTable;