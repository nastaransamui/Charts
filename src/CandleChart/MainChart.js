import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, Grid } from "@material-ui/core";
import Tooltip from '@material-ui/core/Tooltip';
import SvgIcon from '@material-ui/core/SvgIcon';
import DynamicComponents from './TraidingComponents'
import {convertHex} from '../../lib/converHex'

import {
    BarSeries,
    AreaSeries,
	BollingerSeries,
	CandlestickSeries,
	LineSeries,
	OHLCSeries,
	SARSeries
} from "react-stockcharts/lib/series";
import {
	CrossHairCursor,
	CurrentCoordinate,
	MouseCoordinateX,
	MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";
import {
	OHLCTooltip,
	MovingAverageTooltip,
	BollingerBandTooltip,
	HoverTooltip,
} from "react-stockcharts/lib/tooltip";
import {
    ema,
    wma,
    sma,
    tma,
    bollingerBand,
    sar 
} from "react-stockcharts/lib/indicator";
import { saveInteractiveNodes, getInteractiveNodes } from "../../lib/interactiveutils";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { utcDay } from "d3-time";
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { TrendLine } from "react-stockcharts/lib/interactive";
import { format } from "d3-format";
import { fitWidth } from "react-stockcharts/lib/helper";
import { timeFormat } from "d3-time-format";
import { ChartCanvas, Chart } from "react-stockcharts";
import { last, timeIntervalBarWidth } from "react-stockcharts/lib/utils";

import {TradingTooltips} from './TradingTooltips'
import clsx from 'clsx';


Number.prototype.countDecimals = function () {
    if(Math.floor(this.valueOf()) === this.valueOf()) return 0;
    return this.toString().split(".")[1].length || 0; 
}
const styles = theme => ({
	root: {
		overflowY: 'hidden',
		overflow: 'hidden',
        overflowX: 'hidden',
		display: 'flex',
    },
    TraidingIcons:{
        width: '100%' ,
        height: '10%', 
        display:'flex', 
        justifyContent: 'space-evenly', 
        paddingTop: 10
    },
    mainChart:{
        width: '100%' ,
        height: 460,
        paddingTop: 30,
        [theme.breakpoints.down('lg')]: {
            height: 425,
        }
    },
    mainChartSm:{
        width: '100%' ,
        height: 430,
        paddingTop: 30,
        [theme.breakpoints.only('lg')]: {
            height: 460,
          },
        
    },
    toolTip: {
        backgroundColor: theme.palette.background.default,
        fontWeight: 600,
        fontSize: 12,
        color: theme.palette.secondary.main,
        borderColor: theme.palette.secondary.main,
        borderRadius: 4,
        border: 'solid 0.5px'
    },
    toolTipArrow:{
      color: theme.palette.background.default,
    },
    toolTipOff: {
        backgroundColor: theme.palette.background.default,
        fontWeight: 600,
        fontSize: 12,
        color: theme.palette.primary.main,
        borderColor: theme.palette.secondary.main,
        borderRadius: 4,
        border: 'solid 0.5px'
    },
    toolTipArrowOff: {
        color: theme.palette.background.default,
    },
});
const bbAppearance =(theme) => {
	return(
        {
            stroke: {
                top: `${theme.palette.primary.main}`,
                middle: "#FF6600",
                bottom: `${theme.palette.secondary.main}`,
            },
            fill: `${convertHex(theme.palette.secondary.main, 10)}`,
        }
    )
};

const dateFormat = timeFormat("%Y-%m-%d");
const hourFormat = timeFormat("%H:%M")
const minuteFormat = timeFormat("%H:%M:%S")
const numberFormat = format(".6f");
const formatNumber = (n,m)=>{return format(`.${m}f`)(n)}

function tooltipContent(ys,displayDateFormat, dashboardText,nextI18Next) {
    return ({ currentItem, xAccessor }) => {
		return {
			x: displayDateFormat(xAccessor(currentItem)),
			y: [
				{
					label: dashboardText[`${nextI18Next}_chart_open`],
					value: currentItem.open && formatNumber(currentItem.open, currentItem.open.countDecimals())
				},
				{
					label: dashboardText[`${nextI18Next}_chart_high`],
					value: currentItem.high && formatNumber(currentItem.high, currentItem.high.countDecimals())
				},
				{
					label: dashboardText[`${nextI18Next}_chart_low`],
					value: currentItem.low && formatNumber(currentItem.low, currentItem.low.countDecimals())
				},
				{
					label: dashboardText[`${nextI18Next}_chart_close`],
					value: currentItem.close && formatNumber(currentItem.close, currentItem.close.countDecimals())
				}
			]
				.concat(
					ys.map(each => ({
						label: each.label,
						value: each.value(currentItem),
						stroke: each.stroke
					}))
				)
				.filter(line => line.value)
		};
	};
}
class CandleStickChart extends Component {
    constructor(props){
        super(props);
        this.saveInteractiveNodes = saveInteractiveNodes.bind(this);
        this.getInteractiveNodes = getInteractiveNodes.bind(this);
        this.onDrawCompleteChart1 = this.onDrawCompleteChart1.bind(this);
        this.state = {
            ShowTraid: false,
			showSAR: false,
			enableTrendLine: true,
			showLineSerries: false,
			showBollingerSeries: false,
			HoverTooltipShow: false,
			CandleView: false,
			showBollingerBandTooltip: true,
			showMovingAverageTooltip: false,
            showOHLCTooltip: true,
            showMouseCoordinate: true,
            displayDateFormat : null,
            showBarChartVolume: true,
            showAreaChartVolume: false,
			trends_1: [
				{ start: [1606, 56], end: [1711, 53], appearance: { stroke: "green" }, type: "XLINE" }
			],
        }
    }

    changeScrollEnter(){
        document.getElementsByTagName('main')[0].style.overflow ='hidden'
    }

    changeScrollLeave(){
        document.getElementsByTagName('main')[0].style.overflow ="auto"
    }
    UNSAFE_componentWillMount(){
        switch (this.props.PeriodicDataUpdate) {
            case 'day':
                this.setState({
                    ...this.state,
                    displayDateFormat:dateFormat
                })
                break;
            case 'hour':
                 this.setState({
                     ...this.state,
                     displayDateFormat:hourFormat
                 })   
                break;
            case 'minute':
                 this.setState({
                     ...this.state,
                     displayDateFormat:minuteFormat
                 })       
                break;
            default:
                break;
        }
    }

    componentDidUpdate = (prevProps, prevState) =>{
        if(prevProps.PeriodicDataUpdate !== this.props.PeriodicDataUpdate){
            switch (this.props.PeriodicDataUpdate) {
                case 'day':
                    this.setState({
                        ...this.state,
                        displayDateFormat:dateFormat
                    })
                    break;
                case 'hour':
                     this.setState({
                         ...this.state,
                         displayDateFormat:hourFormat
                     })   
                    break;
                case 'minute':
                     this.setState({
                         ...this.state,
                         displayDateFormat:minuteFormat
                     })       
                    break;
                default:
                    break;
            }
            
        }
        if(prevProps.data !== this.props.data){
			this.setState({
				enableTrendLine: true,
				trends_1: [
					{ start: [1606, 56], end: [1711, 53], appearance: { stroke: "green" }, type: "XLINE" }
				],
			})
        }
    }

    onDrawCompleteChart1(trends_1) {
		this.setState({
			enableTrendLine: false,
			trends_1
		});
    }

    render(){
        const {
            type,
            theme,
            data: initialData,
            width,
            height,
            ratio,
            classes,
            TraidingView,
            PeriodicDataUpdate,
            dashboardText,
            nextI18Next
        } = this.props
        const {
            ShowTraid,
            showSAR,
            enableTrendLine,
            showLineSerries,
            showBollingerSeries,
            HoverTooltipShow,
            CandleView,
            showBollingerBandTooltip,
            showMovingAverageTooltip,
            showOHLCTooltip,
            showMouseCoordinate,
            displayDateFormat,
            showBarChartVolume,
            showAreaChartVolume
        } = this.state
        const accelerationFactor = .02;
        const maxAccelerationFactor = .2;
        const margin = { left: 70, right: 70, top: 20, bottom: 30 };
        const gridHeight = height - margin.top - margin.bottom;
        const gridWidth = width - margin.left - margin.right;
        const showGrid = true;
        const yGrid = showGrid ? { innerTickSize: -1 * gridWidth, tickStrokeOpacity: 0.2 } : {};
        const xGrid = showGrid ? { innerTickSize: -1 * gridHeight, tickStrokeOpacity: 0.2 } : {};
        const borderFixOrigin = (width * 0.5) - (initialData[0].open.countDecimals())
        const defaultSar = sar()
			.options({
				accelerationFactor, maxAccelerationFactor
			})
			.merge((d, c) => {d.sar = c;})
			.accessor(d => d.sar);

		const sma20 = sma()
		.options({ windowSize: 20 })
		.merge((d, c) => {d.sma20 = c;})
		.accessor(d => d.sma20);

	const wma20 = wma()
		.options({ windowSize: 20 })
		.merge((d, c) => {d.wma20 = c;})
		.accessor(d => d.wma20);

	const tma20 = tma()
		.options({ windowSize: 20 })
		.merge((d, c) => {d.tma20 = c;})
		.accessor(d => d.tma20);

		const ema20 = ema()
			.id(0)
			.options({ windowSize: 20 })
			.merge((d, c) => {d.ema20 = c;})
            .accessor(d => d.ema20)

		const ema50 = ema()
			.id(2)
			.options({ windowSize: 50 })
			.merge((d, c) => {d.ema50 = c;})
			.accessor(d => d.ema50);

		const bb = bollingerBand()
			.merge((d, c) => {d.bb = c;})
			.accessor(d => d.bb);

		const calculatedData = bb(ema20(sma20(wma20(tma20(ema50(defaultSar(initialData)))))));
            const xScaleProvider = discontinuousTimeScaleProvider
            .inputDateAccessor(d => d.date);
            const {
                data,
                xScale,
                xAccessor,
                displayXAccessor,
            } = xScaleProvider(calculatedData);
            const start = xAccessor(last(data));
		    const end = xAccessor(data[Math.max(0, data.length - 150)]);
            const xExtents = [start, end];
            const decimalNumber = data[0].open.countDecimals()
            
        return(
            <Grid container 
            className={classes.root} 
            onMouseEnter={this.changeScrollEnter}
            onMouseLeave={this.changeScrollLeave}>
                {/* Traiding View */}
                {
                    TraidingView &&
                    <div className={classes.TraidingIcons}>
                        {TradingTooltips.map((t,i)=>{
                            return(
                                <Tooltip arrow 
                                placement="bottom" 
                                key={i} 
                                title={this.state[`${t.state}`] ? t[`${nextI18Next}_titleHide`] : t[`${nextI18Next}_titleShow`]}
                                classes={{ tooltip: this.state[`${t.state}`] ? classes.toolTip : classes.toolTipOff, arrow: this.state[`${t.state}`] ? classes.toolTipArrow : classes.toolTipArrowOff}}>
                                    {
                                        !t.secondState  ? 
                                        <SvgIcon style={{cursor: 'pointer'}} color={this.state[`${t.state}`] ? "secondary" :"primary"} onClick={()=>{
                                            this.setState(prevState=>({ ...prevState, [`${t.state}`]: !prevState[`${t.state}`]})) }}>
                                                <DynamicComponents svgName={t.Svg} />
                                            </SvgIcon> :
                                            <>
                                            {showBarChartVolume && <SvgIcon style={{cursor: 'pointer'}} color={this.state[`${t.state}`] ? "secondary" :"primary"} onClick={()=>{
                                                    this.setState(prevState=>({ ...prevState, [`${t.state}`]: !prevState[`${t.state}`]})) }}>
                                                        <DynamicComponents svgName={t.Svg} />
                                                    </SvgIcon> }
                                            </>
                                    }
                                </Tooltip>
                            )
                        })}
                    </div>
                }
                <div 
                className={clsx(classes.mainChart, {[classes.mainChartSm]: TraidingView})}
                // style={{ width: '100%' , height: TraidingView ? 430: 460, paddingTop: 30,}}
                 >
                <ChartCanvas
                    height={750}
                    width={TraidingView ? width -15 : width}
                    ratio={ratio}
                    margin={margin}
                    type={type}
                    seriesName="MSFT"
                    data={data}
                    xScale={xScale}
                    xAccessor={xAccessor}
                    displayXAccessor={displayXAccessor}
                    xExtents={xExtents}
                    >
                        <Chart id={1} height={325}
                        yExtents={[d => [d.high, d.low], bb.accessor()]} >
                            <YAxis 
                            axisAt="right" 
                            orient="right" 
                            ticks={10} 
                            {...yGrid} 
                            inverted={true}
                            stroke={theme.palette.action.active} 
                            tickStroke={theme.palette.action.active} />
                            <XAxis 
                            axisAt="bottom" 
                            orient="bottom"
							{...xGrid}
							showTicks={true}
							tickStroke={theme.palette.action.active} 
							outerTickSize={0}
                            opacity={0.5}
                            displayFormat={displayDateFormat}
							stroke={theme.palette.action.active}  />
                            {showMouseCoordinate &&
                            <>
                            <CrossHairCursor 
                            stroke={theme.palette.primary.main}
                            opacity={0.5}/>
                            <MouseCoordinateY 
                            rectWidth={70}
                            fill={theme.palette.primary.main}
                            at="right" 
                            orient="right"
                            displayFormat={(d)=>{return formatNumber(d, decimalNumber)}} />
                            <MouseCoordinateX
                            at="bottom"
                            orient="bottom"
                            displayFormat={displayDateFormat}
                            fill={theme.palette.primary.main} />
                            </>}
                            {showSAR && TraidingView &&
                            <SARSeries yAccessor={d => d.sar} fill={{falling: `blue`,rising: `red`}}/>}
                            {CandleView && TraidingView ?
                            <OHLCSeries
                            width={timeIntervalBarWidth(utcDay)}
                            stroke={d => d.close > d.open ? `${theme.palette.info.dark}` : `${theme.palette.info.light}`}
                            wickStroke={d => d.close > d.open ? `${theme.palette.info.dark}` : `${theme.palette.info.light}`}
                            fill={d => d.close > d.open ? `${theme.palette.info.dark}` : `${theme.palette.info.light}`}/>
                            :
                            <CandlestickSeries
                            stroke={d => d.close > d.open ? `${theme.palette.info.dark}` : `${theme.palette.info.light}`}
                            wickStroke={d => d.close > d.open ? `${theme.palette.info.dark}` : `${theme.palette.info.light}`}
                            fill={d => d.close > d.open ? `${theme.palette.info.dark}` : `${theme.palette.info.light}`} />}
                            {
							showLineSerries && TraidingView &&
							<>
							<LineSeries yAccessor={ema20.accessor()} stroke={ema20.stroke()} stroke={theme.palette.info.light}/>
							<LineSeries yAccessor={ema50.accessor()} stroke={ema50.stroke()} stroke={theme.palette.info.dark}/>
                            <CurrentCoordinate yAccessor={ema20.accessor()} fill={ema20.stroke()} />
                            <CurrentCoordinate yAccessor={ema50.accessor()} fill={ema50.stroke()} />
							</>
						    }
                            {showBollingerSeries && TraidingView &&
                            <BollingerSeries yAccessor={d => d.bb}
						    {...bbAppearance(theme)} />
                            }
                            {showOHLCTooltip && TraidingView &&
                            <OHLCTooltip 
							origin={[0, -10]} 
							textFill={theme.palette.action.active} 
							labelFill={theme.palette.primary.main}
                            ohlcFormat={(d)=>{return formatNumber(d, decimalNumber)}}
                            xDisplayFormat={displayDateFormat}
                            displayTexts={{
                                d: `${dashboardText[`${nextI18Next}_chart_${PeriodicDataUpdate}`].toUpperCase()}: `,
                                o:  ` ${dashboardText[`${nextI18Next}_chart_open`]} `,
                                h: ` ${dashboardText[`${nextI18Next}_chart_high`]} `,
                                l:` ${dashboardText[`${nextI18Next}_chart_low`]} `,
                                c: ` ${dashboardText[`${nextI18Next}_chart_close`]} `,
                                v: ` ${dashboardText[`${nextI18Next}_chart_vol`]} `,
                                na: ` ${dashboardText[`${nextI18Next}_chart_na`]} `,
                            }}
							accessor={(d)=>{
									return {
										date: d.date,
										open: d.open,
										high: d.high,
										low: d.low,
										close: d.close,
										volume: d.volumeto
									}
							}}/>}
                            {HoverTooltipShow && TraidingView &&
                            <HoverTooltip
                                yAccessor={ema50.accessor()}
                                tooltipContent={tooltipContent([
                                    {
                                        label: `${ema20.type()}(${ema20.options()
                                            .windowSize})`,
                                        value: d => numberFormat(ema20.accessor()(d)),
                                        stroke: ema20.stroke(),
                                    },
                                    {
                                        label: `${ema50.type()}(${ema50.options()
                                            .windowSize})`,
                                        value: d => numberFormat(ema50.accessor()(d)),
                                        stroke: ema50.stroke()
                                    }
                                ], displayDateFormat, dashboardText,nextI18Next)}
                                fontSize={12}
                                fill= {theme.palette.primary.main}
                                bgFill={theme.palette.primary.main}
                                bgOpacity= {0.5}
                                stroke={ema50.stroke()}
                                fontFill= {theme.palette.action.active} 
                                opacity= {0.09}
                                />}
                                { ShowTraid && TraidingView &&
                                    <TrendLine
                                    ref={this.saveInteractiveNodes("Trendline", 1)}
                                    enabled={this.state.enableTrendLine}
                                    type="RAY"
                                    snap={false}
                                    snapTo={d => [d.high, d.low]}
                                    onStart={() => console.log("START")}
                                    onSelect={()=>console.log("Select")}
                                    onComplete={this.onDrawCompleteChart1}
                                    trends={this.state.trends_1}
                                    appearance={{
                                        stroke: "green",
                                        strokeOpacity: 1,
                                        strokeWidth: 1,
                                        strokeDasharray: "Solid",
                                        edgeStrokeWidth: 1,
                                        edgeFill: `${theme.palette.info.light}`,
                                        edgeStroke: "green",
                                        r: 8
                                    }}
                                />
                                }
                                {showBollingerBandTooltip && TraidingView &&
                                <BollingerBandTooltip
                                displayFormat={(d)=>{return formatNumber(d, decimalNumber)}}
                                origin={[0, 8]}
                                yAccessor={d=>{return d.bb}}
                                textFill={theme.palette.action.active}
                                labelFill={theme.palette.primary.main}
                                options={bb.options()}/>}
                                {showMovingAverageTooltip && TraidingView &&
                                <MovingAverageTooltip
                                onClick={e => console.log(e)}
                                textFill={theme.palette.action.active} 
                                origin={[0, 15]}
                                displayFormat={(d)=>{return formatNumber(d, decimalNumber)}}
                                width={80}
                                options={[
                                    {
                                        yAccessor: sma20.accessor(),
                                        type: "SMA",
                                        stroke: sma20.stroke(),
                                        windowSize: sma20.options().windowSize,
                                        echo: "some echo here",
                                        stroke: '#76ff05',
                                    },
                                    {
                                        yAccessor: wma20.accessor(),
                                        type: "WMA",
                                        stroke: wma20.stroke(),
                                        windowSize: wma20.options().windowSize,
                                        echo: "some echo here",
                                    },
                                    {
                                        yAccessor: tma20.accessor(),
                                        type: "TMA",
                                        stroke: tma20.stroke(),
                                        windowSize: tma20.options().windowSize,
                                        echo: "some echo here",
                                    },
                                    {
                                        yAccessor: ema20.accessor(),
                                        type: "EMA",
                                        stroke: ema20.stroke(),
                                        windowSize: ema20.options().windowSize,
                                        echo: "some echo here",
                                    },
                                    {
                                        yAccessor: ema50.accessor(),
                                        type: "EMA",
                                        stroke: ema50.stroke(),
                                        windowSize: ema50.options().windowSize,
                                        echo: "some echo here",
                                    },
                                ]} />}
                        </Chart>
                        {showBarChartVolume &&
                        <Chart id={2} height={100} yExtents={d=> d.volumeto} origin={(w, h) => {return [0, h - 475]}}>
                            <YAxis axisAt="left" orient="left" ticks={4} tickFormat={format(".2s")}
						    tickStroke={theme.palette.action.active}  />
                            {!showAreaChartVolume &&
                            <BarSeries yAccessor={d => d.volumeto}
                            fill={d => d.close > d.open ? `${theme.palette.info.dark}` : `${theme.palette.info.light}`} />
                            }
                            {showAreaChartVolume &&
                            <AreaSeries yAccessor={d => d.volumeto} fill={`${theme.palette.info.light}`} strokeWidth={2} strokeOpacity={0.5} stroke={`${theme.palette.info.light}`}/>
                            }
                            <MouseCoordinateY 
                            rectWidth={110}
                            fill={theme.palette.secondary.main}
                            at="left" 
                            orient="right"
                            displayFormat={(d)=>{return formatNumber(d, decimalNumber)}} />
                        </Chart>}
                    </ChartCanvas>
                </div>
            </Grid> 
        )
    }
}

CandleStickChart.propTypes ={
    data: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    theme: PropTypes.object.isRequired,
    ratio: PropTypes.number.isRequired,
    type: PropTypes.oneOf(['svg', 'hybrid']).isRequired,
    TraidingView: PropTypes.bool.isRequired,
    PeriodicDataUpdate: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired
}

CandleStickChart.defaultProps ={
    type: "svg"
}

CandleStickChart = fitWidth(CandleStickChart)

export default withStyles(styles, {withTheme: true})(CandleStickChart);