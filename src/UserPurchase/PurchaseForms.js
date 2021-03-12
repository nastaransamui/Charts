import React, { Fragment, useEffect, useState } from "react";
import {connect} from "react-redux";
import { useTheme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField'
import {useSelector} from 'react-redux';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import useStyles from './userPerchace-style';
import LoginDialog from './LoginDialog'
import { signOut, useSession } from 'next-auth/client'
import AlertDialog from '../components/AlertDialog'
export function valuetext(value){ return `${value} %`}
const marks =[
    {
      value: 0,
      label: '0%'
    },
    {
      value: 25,
      label: '25%'
    },
    {
      value: 50,
      label: '50%'
    },
    {
      value: 75,
      label: '75%'
    },
    {
      value: 100,
      label: '100%'
    },
  ]

const ButtonValues = [
    {
        value: "Limit",
        en_label: "Limit",
        cn_label: "限制"
    },
    {
        value: "Market",
        en_label: "Market",
        cn_label: "市场",
    },
    {
        value: "StopLimit",
        en_label: "Stop-limit",
        cn_label: "止损限制",
    },
    {
        value: "TriggerOrder",
        en_label: "Trigger Order",
        cn_label: "触发顺序",
    },
]

function PurchaseForms(props){
    const classes = useStyles();
    const theme = useTheme();
    const [session] = useSession();
    const {dashboardText, header} = props;
    const [values, setValues]=useState({
        Price1: '',
        Price2: '',
        Amount1: '',
        Amount2: '',
    })

    const onCancellDialog = (e) =>{
        setAlertDialogState({
            ...AlertDialogState,
            open: false
        })
    }
    const onCloseDialog = () =>{
        setAlertDialogState({
            open: false,
        ContentText: "",
        ContentHeader: "",
        closeButtom: "",
        cancelButton:"",
        handleClose: onCloseDialog,
        CancellDialog: onCancellDialog
          })
          signOut() 
    }
    const [SinglePareData, setSinglePareData] = useState(null)
    const [Login, SetLogin] = useState(session)
    const {Exchange, coingeckoSymbol, cryptoCompareTsym, "next-i18next": nextI18Next} = useSelector(state => state)
    const [AlertDialogState, setAlertDialogState] =useState({
        open: false,
      ContentText: "",
      ContentHeader: "",
      closeButtom: "",
      cancelButton:"",
      handleClose: onCloseDialog,
      CancellDialog: onCancellDialog
      })
    useEffect(()=>{
        let isMount = true;
        if(isMount ){
            Exchange.forEach(element =>{
                if(element.symbol ===cryptoCompareTsym){
                    setValues((prevState)=>({
                        ...prevState,
                        Price1: element.current_price,
                        Price2: element.current_price,
                    }))
                    setSinglePareData(element)
                }
            })
        }
        return()=>{
            isMount = false;
        }
    },[Exchange])
    const onLogin = (value)=>{
        if(value === 'Login'){SetLogin(session)}
    }
    const SubmitForm = value =>{}
    const SliderChage = (e, value)=>{}
    const [SingupDialogOpen, setSingupDialogOpen]=useState(false)

    const SingOut = () =>{
        setAlertDialogState({
            handleClose: onCloseDialog,
            open: true,
            ContentText: `${header[`${nextI18Next}_signout_text`]}`,
            ContentHeader: `${header[`${nextI18Next}_signout_header`]}`,
            closeButtom: `${header[`${nextI18Next}_agree`]}`,
            cancelButton: `${header[`${nextI18Next}_close`]}`,
            CancellDialog: onCancellDialog
          })
    }

    return (
        <Fragment>
        <LoginDialog  SingupDialogOpen={SingupDialogOpen} setSingupDialogOpen={setSingupDialogOpen}  {...props}/>
        <AlertDialog {...AlertDialogState} />
            {SinglePareData &&
            <div className={classes.MainStyle}>
                <span className={classes.SpanBuy}>
                    {ButtonValues.map((t,i)=>(<Button key={`${i}${t.value}`} variant="outlined" classes={{root: classes.buttonRoots}}>
                        {t[`${nextI18Next}_label`]}
                    </Button>))}
                    <FormControl fullWidth className={classes.marginFormBuy} variant="outlined"  size="small">
                        <TextField onChange={(e)=>{setValues({...values, Price1: e.target.value})}}
                        type="number"
                        id="Price1"
                        label={dashboardText[`${nextI18Next}_purchase_price`]}
                        disabled
                        value={values.Price1}
                        margin="dense"
                        variant="outlined"
                        InputProps={{
                            startAdornment:<InputAdornment position="start">{dashboardText[`${nextI18Next}_purchase_price`]}</InputAdornment>,
                            endAdornment:<InputAdornment position="start">
                                {coingeckoSymbol.toUpperCase()}
                            </InputAdornment>
                        }} />
                    </FormControl>
                    <FormControl fullWidth className={classes.marginFormBuy} variant="outlined"  size="small" required>
                        <TextField onChange={(e) => {setValues({...values, Amount1: e.target.value}); if(e.target.value.length > 12) setValues({...values, Amount1: e.target.value.slice(0,12)}) }}
                        type="number"
                        id="Amount1"
                        label={dashboardText[`${nextI18Next}_purchase_amount`]}
                        value={values.Amount1}
                        margin="dense"
                        variant="outlined"
                        InputProps={{
                            startAdornment:<InputAdornment position="start">{dashboardText[`${nextI18Next}_purchase_amount`]}</InputAdornment>,
                            endAdornment:<InputAdornment position="start">{SinglePareData.symbol.toUpperCase()}</InputAdornment>,
                        }} />
                    </FormControl>
                    <span className={classes.total}>
                        <dt className={classes.dt}>{dashboardText[`${nextI18Next}_purchase_total`]}:</dt>
                        <dt className={classes.dt}>{((values.Amount1)* (values.Price1)).toFixed(8)} {dashboardText[`${nextI18Next}_purchase_usd`]}</dt>
                    </span>
                    <Slider className={classes.SliderBuy} disabled={!Login}
                    defaultValue={0} getAriaValueText={valuetext}  aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto" step={1} marks={marks} 
                    onChange={(e,value)=>SliderChage(e,value)}
                    min={0}
                    max={100} />
                    <Grid className={!Login ? classes.LoginButton : classes.LoginedButtonBuy}>
                        {
                           session!== null ?
                            <>
                            <span className={classes.Login} onClick={(e)=>{SubmitForm(SinglePareData)}} >
                            {dashboardText[`${nextI18Next}_purchase_buy`]} {SinglePareData.symbol.toUpperCase()}
                            </span>
                            {dashboardText[`${nextI18Next}_purchase_or`]}
                           <span className={classes.Login} onClick={SingOut}>
                           {header[`${nextI18Next}_singout`]}
                           </span>
                            </>
                            :
                            <>
                            <span className={classes.Singup} onClick={(e)=>{setSingupDialogOpen(true)}} >
                            {header[`${nextI18Next}_login`]}
                            </span>
                           </>
                        }
                    </Grid>
                </span>
                <Divider orientation="vertical" flexItem classes={{root: classes.divider}}  />
                <span className={classes.SpanSale}>
                    {ButtonValues.map((t,i)=>(<Button key={`${i}${t.value}`} variant="outlined" classes={{root: classes.buttonRoots}}>
                        {t[`${nextI18Next}_label`]}
                    </Button>))}
                    <FormControl fullWidth className={classes.marginFormSale} variant="outlined" size="small">
                        <TextField id="Price2" label={dashboardText[`${nextI18Next}_purchase_price`]} onChange={(e)=>{setValues({...values, Price2: e.target.value})}}
                        type="number" value={values.Price2} disabled margin="dense" variant="outlined"
                        InputProps={{
                            startAdornment:<InputAdornment position="start">{dashboardText[`${nextI18Next}_purchase_price`]}</InputAdornment>,
                            endAdornment:<InputAdornment position="start">
                                {coingeckoSymbol.toUpperCase()}
                            </InputAdornment>
                        }} />
                    </FormControl>
                    <FormControl fullWidth className={classes.marginFormSale} variant="outlined" size="small">
                    <TextField
                        id="Amount2"
                        label={dashboardText[`${nextI18Next}_purchase_amount`]}
                        onChange={(e) => {setValues({...values, Amount2: e.target.value}); if(e.target.value.length > 12) setValues({...values, Amount2: e.target.value.slice(0,12)}) }}
                        type="number"
                        value={values.Amount2}
                        margin="dense"
                        variant="outlined"
                        InputProps={{
                        startAdornment:<InputAdornment position="start">{dashboardText[`${nextI18Next}_purchase_amount`]}</InputAdornment>,
                        endAdornment:<InputAdornment position="start">{SinglePareData.symbol.toUpperCase()}</InputAdornment>
                        }}
                    />
                    </FormControl>
                    <span className={classes.total}>
                        <dt className={classes.dt}>{dashboardText[`${nextI18Next}_purchase_total`]}:</dt>
                        <dt className={classes.dt}>{((values.Amount2)* (values.Price2)).toFixed(8)} {dashboardText[`${nextI18Next}_purchase_usd`]}</dt>
                    </span>
                    <Slider className={classes.SliderSale} disabled={!Login}
                    defaultValue={0} getAriaValueText={valuetext}  aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto" step={1} marks={marks} 
                    onChange={(e,value)=>SliderChage(e,value)}
                    min={0}
                    max={100} />
                    <Grid className={!Login ? classes.LoginButton : classes.LoginedButtonSell}>
                        {
                            session!== null ?
                            <>
                            <span className={classes.Login} onClick={(e)=>{SubmitForm(SinglePareData)}} >
                            {dashboardText[`${nextI18Next}_purchase_sale`]} {SinglePareData.symbol.toUpperCase()}
                            </span>
                           {dashboardText[`${nextI18Next}_purchase_or`]}
                           <span className={classes.Login} onClick={SingOut}>
                              {header[`${nextI18Next}_singout`]}
                           </span>
                            </>
                            :
                            <>
                                <span className={classes.Singup} onClick={(e)=>{setSingupDialogOpen(true)}} >{header[`${nextI18Next}_login`]}</span>
                            </>
                        }
                    </Grid>
                </span>
            </div>
            }
        </Fragment>
    )
}

export default connect((state)=> state)(PurchaseForms);