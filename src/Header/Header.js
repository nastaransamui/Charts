import React,{ useState} from 'react';
import { useTheme } from '@material-ui/core/styles';
import {useSelector} from 'react-redux';
import { CssBaseline } from '@material-ui/core';
import palette from '../../theme/palette'
import useStyles from './header-styles';
import LeftDrawer from '../Drawer/Drawer';
import { useSession} from 'next-auth/client'
import AlertDialog from '../components/AlertDialog'
import LoadingBar from 'react-top-loading-bar'
import {langName} from '../../public/locale/langName'
import { useProgress, RenderMenu, RenderLanguage, RenderThemePalette, RenderAppBar } from './headerHelpers';

function Header(props){
  const classes = useStyles();
  const {toggleDarkTheme,header, profile, showToolbar} = props;
  const [session,loading] = useSession()
  const { "next-i18next": nextI18Next }= useSelector(state => state)
  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElTheme, setAnchorElTheme] = useState(null);
  const [anchorElLang, setAnchorElLang] = useState(null);
  const {Progress, SetProgress} = useProgress({loading, showToolbar})
  const [AlertDialogState, setAlertDialogState] =useState({
    open: false,
  ContentText: "",
  ContentHeader: "",
  closeButtom: "",
  cancelButton:"",
  handleClose: ()=>{},
  CancellDialog: ()=>{},
  })

  return(
    <div className={classes.grow}>
      <CssBaseline />
      <LoadingBar 
      color={theme.palette.secondary.main} 
      onLoaderFinished={() => SetProgress(0)}
      progress={showToolbar === undefined && Progress}
       />
      <AlertDialog {...AlertDialogState} />
      <LeftDrawer openDrawer={openDrawer} {...props}/>
        <>
          {RenderAppBar({setAnchorElTheme,header,openDrawer, setOpenDrawer,classes,setAnchorElLang, toggleDarkTheme, setAnchorEl, profile})}
          {RenderMenu({AlertDialogState, setAlertDialogState,profile, anchorEl, setAnchorEl, header, nextI18Next, classes})}
          {RenderLanguage({anchorElLang, setAnchorElLang, classes, langName,header,nextI18Next })}
          {RenderThemePalette({classes,palette, anchorElTheme, setAnchorElTheme})}
        </>
    </div>
  )
}

export default Header;