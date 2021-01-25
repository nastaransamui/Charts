import React from "react";
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import TimelineIcon from '@material-ui/icons/Timeline';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import AssessmentIcon from '@material-ui/icons/Assessment';
import MouseIcon from '@material-ui/icons/Mouse';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import TraidingSvg from '../../public/tradingline.svg';
import InsertChartIcon from '@material-ui/icons/InsertChart';
export default function DynamicComponents(props)  {
    const {svgName} = props;
    const Components = {
      TraidingSvg: TraidingSvg,
      DragIndicatorIcon: DragIndicatorIcon,
      FiberManualRecordIcon: FiberManualRecordIcon,
      TimelineIcon: TimelineIcon,
      SettingsEthernetIcon: SettingsEthernetIcon,
      WbIncandescentIcon: WbIncandescentIcon,
      BubbleChartIcon: BubbleChartIcon,
      TrendingUpIcon: TrendingUpIcon,
      AssessmentIcon: AssessmentIcon,
      MouseIcon: MouseIcon,
      EqualizerIcon:EqualizerIcon,
      InsertChartIcon: InsertChartIcon
    };
    function DynamicComponents(props) {
      const SpecificComp = Components[props.compname]
      return <SpecificComp compname={props.compname} />
    }
    return (<DynamicComponents compname={svgName}  />)
  }