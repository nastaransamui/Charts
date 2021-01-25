
import React, { Fragment, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import { AutoSizer, Column, SortDirection, Table} from 'react-virtualized';
import StarIcon from '@material-ui/icons/Star';
import { TableSortLabel } from '@material-ui/core';
import 'react-virtualized/styles.css';
import _ from "lodash";
import {connect} from "react-redux";
import {useSelector, useDispatch} from 'react-redux';
import { getCookies, setCookies } from 'cookies-next';
import getExchangeData from '../../lib/exchange'
import { TableHead } from '@material-ui/core';
import getCandleChartData from '../../lib/candleChartData'

const useStyles = makeStyles(theme => ({
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  table: {
    '& .ReactVirtualized__Table__rowColumn':{
        marginLeft: 0,
      },
    '& .ReactVirtualized__Table__sortableHeaderColumn':{
        "&[aria-label=star]": {
            display: 'none'
          },
    }
  },
  tableRow: {
    cursor: 'pointer',
  },
  tableRowHover: {
    '&:hover': {
      backgroundColor: theme.palette.background.level1,
    },
  },
  tableCell: {
    flex: 1,
  },
}));

class MuiVirtualizedTable extends React.PureComponent {
    static defaultProps={
        headerHeight:28,
        rowHeight:28
    }
    _sortList = ({ sortBy, sortDirection }) => {
        const rows = this.props.Data;
        let newList = _.sortBy(rows, [sortBy]);
        if (sortDirection === SortDirection.DESC) {
          newList.reverse();
        }
        return newList;
      };
    
      _sort = ({ sortBy, sortDirection }) => {
        const sortedList = this._sortList({ sortBy, sortDirection });
        this.setState({ sortBy, sortDirection, sortedList });
      };
    constructor(props){
        super(props);
        const sortBy = "coin";
        const sortDirection = SortDirection.ASC;
        const sortedList = this._sortList({ sortBy, sortDirection });
        this.state = {
            sortBy,
            sortDirection,
            sortedList
          };
    }

    componentDidUpdate = (prevProps, prevState)=>{
        if (prevProps.Data !== this.props.Data) {
                this.setState({
            ...this.state,
            sortedList: this.props.Data
          })
        }
    }
    cellRenderer = ({ cellData, columnIndex }) => {
        const { columns, classes, rowHeight, onRowClick, Data, theme } = this.props;
        const StarClick = () =>{
            console.log('starclic')
          }
        return(
            <TableCell 
            component="div"
            className={clsx(classes.tableCell, classes.flexContainer, {
                [classes.noClick]: onRowClick == null,
              })}
              variant="body"
              style={{ height: 
                rowHeight, 
                paddingLeft:  0,
                color: columnIndex === 3 ? cellData < 0 ?  
              `${theme.palette.info.light}` : 
              `${theme.palette.info.dark}` : null}}>
                  { columnIndex == 0 && 
                  <StarIcon color="secondary" fontSize="small" style={{cursor: 'pointer', float: 'left'}} onClick={StarClick}/>}
                  {columnIndex === 3 ? `${cellData} %`: typeof cellData === 'string' ? cellData.toUpperCase() : cellData}
                  { columnIndex == 1 &&  
                  <Fragment>
                    {Data !== null && Data.map((d, i)=>{
                        return(
                            <Fragment key={`${d}${i}`}>
                                {cellData=== d.symbol &&  <>&nbsp;&nbsp;<img  src={d.image} alt="logo" style={{width: 10, height: 10}}/></>}
                            </Fragment>
                        )
                    })}
                  </Fragment>}
            </TableCell>
        )
    }

    headerRenderer = ({label, columnIndex})=>{
        const {theme} = this.props
        return(
            <Fragment >
                <TableHead
                component="div"
                style={{ backgroundColor: columnIndex == 0 && 'blue'}}
                >
                    <TableSortLabel style={{color: theme.palette.secondary.main}} direction={this.state.sortDirection.toLowerCase()}>
                    {label}
                    </TableSortLabel>
                </TableHead>
            </Fragment>
        )
    }
    getRowClassName = ({ index }) => {
        const { classes, onRowClick } = this.props;
        return clsx(classes.tableRow, classes.flexContainer, {
          [classes.tableRowHover]: index !== -1 && onRowClick != null,
        });
      };
    render(){
        const { classes, columns, rowHeight, headerHeight, ...tableProps } = this.props;
        return(
            <AutoSizer>
                {({height, width}) =>{
                    return(
                        <Table
                        height={height}
                        width={width}
                        rowHeight={rowHeight}
                        sort={this._sort}
                        sortBy={this.state.sortBy}
                        rowGetter={({ index }) => this.state.sortedList[index]}
                        sortDirection={this.state.sortDirection}
                        rowCount={this.state.sortedList.length}
                        headerHeight={headerHeight}
                        headerClassName={classes.headerColumn}
                        className={classes.table}
                        {...tableProps}
                        rowClassName={this.getRowClassName}>
                            {columns.map(({dataKey, ...other}, index) =>{
                                const dynamicWidth = 
                                dataKey === 'star' ?  (width / 15) : 
                                dataKey === 'symbol' ? (width/ 4):
                                dataKey === 'current_price' ? (width / 2.5) :
                                dataKey === 'price_change_percentage_24h' ? (width / 3) : null
                                return(
                                    <Column
                                    key={dataKey}
                                    headerRenderer={(headerProps) =>{
                                        return(
                                        this.headerRenderer({
                                          ...headerProps,
                                          columnIndex: 1,
                                        }))}
                                      }
                                    className={classes.flexContainer}
                                    cellRenderer={this.cellRenderer}
                                    dataKey={dataKey}
                                    width={dynamicWidth}
                                    {...other} />
                                );
                            })}
                        </Table>
                    )
                }}
            </AutoSizer>
        )
    }
}

MuiVirtualizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      dataKey: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      numeric: PropTypes.bool,
    }),
  ).isRequired,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowHeight: PropTypes.number,
};

const VirtualizedTable = MuiVirtualizedTable;

function ExchangeTable() {
  const {Exchange,coingeckoSymbol, PeriodicDataUpdate} = useSelector(state => state);
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const RowClicked = (value)=>{
      dispatch({type: 'cryptoCompareTsym', payload: value.rowData.symbol})
      setCookies(null, 'cryptoCompareTsym', value.rowData.symbol) 
      getCandleChartData(PeriodicDataUpdate, coingeckoSymbol,value.rowData.symbol).then((data)=>{
        dispatch({type: 'candleChartData', payload: data});
      })
    getExchangeData(coingeckoSymbol).then((data)=>{dispatch({type: 'Exchange', payload: data})})
  }
  useEffect(()=>{
    let isMount = true;
    let interval = setInterval(() => {
      if (isMount) {
        // getExchangeData(coingeckoSymbol).then((data)=>{dispatch({type: 'Exchange', payload: data})})
      }
    }, 3000);
    return()=>{
      isMount = false;
      clearInterval(interval)
    }
  },[Exchange])
  
  return (
    <Paper style={{ height: 840, width: '100%' }}>
      {Exchange !== null &&
      <VirtualizedTable
      theme={theme}
      classes={classes}
        rowCount={Exchange.length}
        Data={Exchange}
        onRowClick={(data) => { RowClicked(data) }}
        cookies={getCookies(null)}
        columns={[
            {
              label: '',
              numeric: false,
              dataKey: 'star',
            },
          {
            label: 'Coin',
            numeric: false,
            dataKey: 'symbol',
          },
          {
            label: 'LastPrice',
            numeric: true,
            dataKey: 'current_price',
          },
          {
            label: 'Change',
            numeric: true,
            dataKey: 'price_change_percentage_24h',
          },
        ]}
      />
}
    </Paper>
  );
}

export default connect((state)=> state)(ExchangeTable);