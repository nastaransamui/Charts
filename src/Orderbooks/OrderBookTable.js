import React, { PureComponent, Fragment } from 'react';
import { AutoSizer, Column, SortDirection, Table} from 'react-virtualized';
import { TableSortLabel, TableHead, TableCell, Tooltip } from '@material-ui/core';
import PropTypes from "prop-types";
import _ from "lodash";
import clsx from 'clsx';

function TooltipText(params){
    return(
        `
        Amount Precision: ${params.rowData[`amount-precision`]} \n
        Price Precision: ${params.rowData[`price-precision`]}\n
        Value Precision: ${params.rowData[`value-precision`]}\n
        Trading: ${params.rowData[`api-trading`].toUpperCase()} \n
        Max Order Value: ${params.rowData[`buy-market-max-order-value`]} \n
        Leverage Ratio: ${params.rowData[`leverage-ratio`]} \n
        Limit Max Order Amount: ${params.rowData[`limit-order-max-order-amt`]}\n
        Limit Min Order Amount: ${params.rowData[`limit-order-min-order-amt`]}\n
        Limit Min Order Value: ${params.rowData[`min-order-value`]}\n
        `
    )
}
class MuiVirtualizedTable extends PureComponent {
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
        const sortBy = "";
        const sortDirection = SortDirection.ASC;
        const sortedList = this._sortList({ sortBy, sortDirection });
        this.state = {
            sortBy,
            sortDirection,
            sortedList,
            offline: false,
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
    cellRenderer = (params) => {
        const { classes, rowHeight, onRowClick,  theme } = this.props;
        const TooltipFirstCellOnly = params.columnIndex !== 0 ? true : false
        const toolTipValue = TooltipText(params)
        return(
            <Tooltip title={toolTipValue}  disableHoverListener={TooltipFirstCellOnly}
            placement="left" arrow enterTouchDelay={0}
            classes={{ tooltip:classes.toolTip, arrow:classes.toolTipArrow,tooltipPlacementLeft: classes.tooltipPlacementLeft }} >
                <TableCell component="div" 
            className={clsx(classes.tableCell, classes.flexContainer, {
                [classes.noClick]: onRowClick == null,
              })}
            variant="body"
            style={{
                height: 
                rowHeight, 
                paddingLeft:  0,
                color: params.rowData.state === 'offline' || params.rowData.state === 'suspend' ?
                `${theme.palette.info.light}` : null
            }}
            >
                {params.cellData.toUpperCase()}
            </TableCell>
            </Tooltip>
        )
    }

    headerRender = ({label, columnIndex})=>{
        const {rowHeight, theme} = this.props
        return(
            <Fragment>
                <TableHead 
                component="div" 
                style={{height: rowHeight, paddingLeft:  0}}>
                    <TableSortLabel 
                    style={{color: theme.palette.secondary.main}} 
                    direction={this.state.sortDirection.toLowerCase()}>
                        {label}
                    </TableSortLabel>
                </TableHead>
            </Fragment>
        )
    }

    getRowClassName = ({ index }) => {
        const { classes, onRowClick } = this.props;
        const {offline} = this.state
        return clsx(classes.flexContainer, {
          [classes.tableRowHoverOnline]: index !== -1 && onRowClick != null,
        }, offline && {
            [classes.tableRowHoverOffline]: index !== -1 && onRowClick != null,
          });
      };

    render(){
        const { classes,Data, columns, rowHeight, headerHeight, ...tableProps } = this.props;
        return(
            <AutoSizer>
                {({height, width})=>{
                    return(
                        <Table 
                        height={height}
                        width={width}
                        rowHeight={rowHeight}
                        sort={this._sort}
                        sortBy={this.state.sortBy}
                        rowGetter={({index}) => this.state.sortedList[index]}
                        sortDirection={this.state.sortDirection}
                        rowCount={this.state.sortedList.length}
                        headerHeight={headerHeight}
                        headerClassName={classes.headerColumn}
                        {...tableProps}
                        rowClassName={this.getRowClassName}
                        >
                            {columns.map(({dataKey, ...other},index) =>{
                                return(
                                    <Column
                                    key={dataKey}
                                    headerRenderer={(headerProps) =>{
                                        return(
                                            this.headerRender({
                                                ...headerProps, columnIndex: 1,
                                            })
                                        )
                                    }}
                                    className={classes.flexContainer}
                                    cellRenderer={this.cellRenderer}
                                    dataKey={dataKey}
                                    width={width} {...other}/>
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
export default  function VirtualizedTable(props){
    const {theme, classes, rowCount, Data, onRowClick,  columns} = props
    return <MuiVirtualizedTable
    theme={theme}
    classes={classes}
    rowCount={rowCount}
    Data={Data}
    onRowClick={onRowClick}
    columns={columns}
     />
}

