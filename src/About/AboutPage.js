import React from 'react';
import {Typography} from '@material-ui/core';
import { useSelector } from 'react-redux';
export default function AboutPage(props) {
  const {"next-i18next": nextI18Next }= useSelector(state => state)
  const {header} = props;
  return (
    <div >
     <Typography variant="h4" component="h1" gutterBottom >
      {header[`${nextI18Next}_about_us`]}
     </Typography>
    </div>
  );
}