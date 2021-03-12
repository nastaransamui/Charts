import React, { useState, useEffect } from 'react';
import useStyles from './footer-style';
import clsx from 'clsx';
import { Container, Grid, InputAdornment, Typography, ButtonBase, Select, OutlinedInput, MenuItem,  IconButton, useTheme } from "@material-ui/core";
import LogoSvg  from '../../Header/logo';
import Link from 'next/link';
import brand from '../../../public/text/brand'
import palette from '../../../theme/palette'
import PaletteIcon from '@material-ui/icons/Palette';
import { setCookies} from 'cookies-next';
import {useSelector, useDispatch} from 'react-redux';
import { langName } from '../../../public/locale/langName'

const footer = {
    description: [
        {
           en: 'Resource',
           cn: '资源资源'
        },
        {
           en: 'Another resource',
           cn: '另一种资源'
        },
        {
            en:  'Final resource', 
            cn: '最终资源'
        },
        {
            en: 'Privacy policy', 
            cn: '隐私政策'
        },
        {
            en: 'Terms of use', 
            cn: '使用条款'
        },
        {
            en: 'Terms Condition',
            cn: '条款与协议'
        }
    ],
    link: ['#resource', '#another-resource', '#final-resource', '#privacy-policy', '#terms-of-use',  '#terms-of-condition'],
  };

  const news = [
    {
      text_en: 'Sed imperdiet enim ligula vitae 1.',
      text_cn: '但是预留1的资金。',
      img: 'https://via.placeholder.com/1050x700/6dc0ea/fff'
    },
    {
    text_en: 'Sed imperdiet enim ligula vitae 2.',
    text_cn: '但是预留1的资金。',
    img: "https://via.placeholder.com/970x725/6deaa6/fff"
    },
    {
    text_en: 'Sed imperdiet enim ligula vitae 3.',
    text_cn: '但是预留1的资金。',
    img: 'https://via.placeholder.com/1051x700/b8de27/fff',
    }
  ];

function Footer(props){
    const classes = useStyles();
    const [ctn, setCtn] = useState(null);
    const theme = useTheme();
    const { themeName,"next-i18next": nextI18Next}= useSelector(state => state)
    const {header, footerText} = props;
    const dispatch = useDispatch();
    const handleThemeName =(pallet) => {
        setCookies(null, 'themeName',pallet);
        dispatch({type: 'themeName', payload: pallet})
        setValues({...values, paletteName: pallet})
      }

    const [values, setValues] = useState({
        lang: `${nextI18Next}`,
        paletteName: themeName
      });

    useEffect(() => {
        setCtn(document.getElementById('main-wrap'));
        setValues({...values, lang:`${nextI18Next}`})
      }, [nextI18Next]);


      useEffect(() => {
        setValues({...values, paletteName:themeName})
      }, [themeName]);
      function handleChange(event) {
        setValues(oldValues => ({
          ...oldValues,
          [event.target.name]: event.target.value,
        }));
    }

    const LanguageClicked = (lang)=>{
        setCookies(null, `next-i18next`,lang.LangCode);
        dispatch({type: `next-i18next`, payload: lang.LangCode})
      }

    return(
        <Container  component="footer">
            <div className={classes.footer}>
                <Grid container spacing={6}>
                    <Grid item xs={12} md={5}>
                        <div className={classes.logo}>
                        <Link href='/'>
                      <a>
                      <LogoSvg 
                      downColor={theme.palette.secondary.dark} 
                    MainColor={theme.palette.secondary.main} 
                    alphabet={theme.typography.overline.color}/>
                      </a>
                    </Link>
                        <Typography variant="h6" color="textPrimary" className={classes.title}>
                            {brand.crypto[`projectName_${nextI18Next}`]}
                        </Typography>
                        </div>
                        <Typography  variant="h6" color="textPrimary" className={classes.footerDesc} gutterBottom>
                        {footerText[`${nextI18Next}_subtitle`]}
                        </Typography>
                        <div className={classes.quickLinks}>
                            <Typography variant="h6" className={classes.title} color="textPrimary" gutterBottom>
                                {footerText[`${nextI18Next}_quicklink`]}
                            </Typography>
                            <ul>
                                {footer.description.map((item, index) =>{
                                    return(
                                        <li key={item[nextI18Next]}>
                                            <Link href={footer.link[index]} variant="subtitle1" color="textSecondary">
                                                {item[nextI18Next]}
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={3} sm={12}>
                        {news.map((item, index) =>{
                            return(
                                <ButtonBase className={classes.blogItem} href="/" key={index.toString()}>
                                    <figure>
                                        <img src={item.img} alt="thumb" />
                                    </figure>
                                    <div className={classes.listText}>
                                        <Typography variant="button" className={classes.category}>
                                        {footerText[`${nextI18Next}_news`]}
                                        </Typography>
                                        <Typography display="block" component="span" className={classes.newsSubtittle}>{item[`text_${nextI18Next}`]}</Typography>
                                    </div>
                                </ButtonBase>
                            )
                        })}
                    </Grid>
                    <Grid item xs={12} md={3} sm={12} lg={3}>
                        <div className={classes.socmed}>
                            <IconButton aria-label="FB" className={classes.margin} size="small">
                                <i className="ion-social-facebook" />
                            </IconButton>
                            <IconButton aria-label="TW" className={classes.margin} size="small">
                                <i className="ion-social-twitter" />
                            </IconButton>
                            <IconButton aria-label="IG" className={classes.margin} size="small">
                                <i className="ion-social-instagram" />
                            </IconButton>
                            <IconButton aria-label="LI" className={classes.margin} size="small">
                                <i className="ion-social-linkedin" />
                            </IconButton>
                        </div>
                            <span className={classes.selectSpan}>
                            <Select
                            value={values.lang}
                            onChange={handleChange}
                            MenuProps={{
                                container: ctn
                            }}
                            startAdornment={(
                                <InputAdornment className={classes.icon} position="start">
                                <span></span>
                                </InputAdornment>
                            )}
                            className={classes.selectLang}
                            classes={{
                                selectMenu: classes.selectMenu
                            }}
                            input={<OutlinedInput labelWidth={200} name="lang" id="outlined-lang-simple" />}
                            >
                                {
                                    langName.map((d,i)=>{
                                        return(
                                            <MenuItem key={i.toString()} value={d.LangCode} onClick={()=>{LanguageClicked(d)}}>
                                                <img src={`/lang/${d.Flag}`} alt={d.Lang} className={classes.flag} /> &nbsp;
                                                <span className={classes.menuItemText}>{header[`${nextI18Next}_${d.title}`]}</span>
                                            </MenuItem>
                                        )
                                    })
                                }
                            </Select>
                            <Select
                            value={values.paletteName}
                            startAdornment={(
                                <InputAdornment className={classes.icon} position="start">
                                <span></span>
                                </InputAdornment>
                            )}
                            className={classes.selectLang}
                            classes={{
                                selectMenu: classes.selectMenu
                            }}
                            input={<OutlinedInput labelWidth={200} name="theme" id="outlined-theme-simple" />}
                            >
                            {Object.keys(palette).map(function(key,index){
                                return(
                                    <MenuItem key={index} value={key} 
                                    onClick={()=>{handleThemeName(key)}}
                                    style={{background:palette[key].palette.primary.main  }}>
                                        <PaletteIcon style={{ color: palette[key].palette.secondary.light }}/>
                                        &nbsp;
                                        <span className={classes.menuItemText}>{footerText[`${nextI18Next}_palette${index}`]}</span>
                                    </MenuItem>
                                )
                            })}
                            </Select>
                            </span>
                    </Grid>
                </Grid>
            </div>
        </Container>
    )
}

export default Footer;