import React from 'react';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import { useTheme } from "@material-ui/core/styles";
import copyright from '../public/locale/copyright.json'
import {useSelector} from 'react-redux';


export default function Copyright() {
  const {"next-i18next": nextI18Next }= useSelector(state => state)
  const theme = useTheme();
  console.log()
  return (
    <Typography variant="body2" color="textSecondary" align="center" style={{color: theme.palette.text.disabled}}>
      {`${copyright[`${nextI18Next}_copyright`]} © `}
      <MuiLink color="inherit" href={process.env.NEXTAUTH_URL}>
        {copyright[`${nextI18Next}_website`]}
      </MuiLink>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
