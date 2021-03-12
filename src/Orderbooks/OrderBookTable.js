import React, { PureComponent, Fragment } from 'react';
import { AutoSizer, Column, SortDirection, Table} from 'react-virtualized';
import { TableSortLabel, TableHead, TableCell, Tooltip } from '@material-ui/core';
import PropTypes from "prop-types";
import _ from "lodash";
import clsx from 'clsx';
import {useSelector} from 'react-redux';
function TooltipText(params,dashboardText, nextI18Next){
    const Traiding = params.rowData[`api-trading`].toUpperCase() === dashboardText[`en_orderbooks_enable`] ? dashboardText[`${nextI18Next}_orderbooks_enable`] :params.rowData[`api-trading`].toUpperCase()
    return(
        `
        ${dashboardText[`${nextI18Next}_orderbooks_tooltip0`]}: ${params.rowData[`amount-precision`]} \n
        ${dashboardText[`${nextI18Next}_orderbooks_tooltip1`]}: ${params.rowData[`price-precision`]}\n
        ${dashboardText[`${nextI18Next}_orderbooks_tooltip2`]}: ${params.rowData[`value-precision`]}\n
        ${dashboardText[`${nextI18Next}_orderbooks_tooltip3`]}: ${Traiding} \n
        ${dashboardText[`${nextI18Next}_orderbooks_tooltip4`]}: ${params.rowData[`buy-market-max-order-value`]} \n
        ${dashboardText[`${nextI18Next}_orderbooks_tooltip5`]}: ${params.rowData[`leverage-ratio`]} \n
        ${dashboardText[`${nextI18Next}_orderbooks_tooltip6`]}: ${params.rowData[`limit-order-max-order-amt`]}\n
        ${dashboardText[`${nextI18Next}_orderbooks_tooltip7`]}: ${params.rowData[`limit-order-min-order-amt`]}\n
        ${dashboardText[`${nextI18Next}_orderbooks_tooltip8`]}: ${params.rowData[`min-order-value`]}\n
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
        const {dashboardText, nextI18Next} = this.props;
        const { classes, rowHeight, onRowClick,  theme } = this.props;
        const TooltipFirstCellOnly = params.columnIndex !== 0 ? true : false
        const toolTipValue = TooltipText(params,dashboardText, nextI18Next)
        const TranslateCell = 
        params.cellData.toUpperCase() === dashboardText[`en_orderbooks_data_online`] ? 
        dashboardText[`${nextI18Next}_orderbooks_data_online`] : 
        params.cellData.toUpperCase() === dashboardText[`en_orderbooks_data_offline`] ?
        dashboardText[`${nextI18Next}_orderbooks_data_offline`] : 
        params.cellData.toUpperCase() === dashboardText[`en_orderbooks_data_suspend`] ?
        dashboardText[`${nextI18Next}_orderbooks_data_suspend`] : params.cellData.toUpperCase();
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
                {TranslateCell}
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
    const {theme, classes, rowCount, Data, onRowClick,  columns,dashboardText} = props
    const {"next-i18next": nextI18Next }= useSelector(state => state)
    return <MuiVirtualizedTable
    theme={theme}
    nextI18Next={nextI18Next}
    classes={classes}
    rowCount={rowCount}
    Data={Data}
    onRowClick={onRowClick}
    columns={columns}
    dashboardText={dashboardText}
     />
}

