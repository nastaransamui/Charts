import React, { Fragment } from 'react'
import {useSelector} from 'react-redux';
import { AppBar,Toolbar } from '@material-ui/core';

function Loading(props){
const {themeType}= useSelector(state => state)
    return(
    <Fragment>
        <div
            style={{
              position: 'fixed',
              zIndex: 10000,
              background: themeType === 'dark' ? '#131625' : '#fafafa',
              width: '100%',
              height: '100%',
            }}
          >
          <AppBar  position="fixed" >
          <Toolbar></Toolbar>
          </AppBar>
            <img
              style={{
                opacity: 0.5,
                position: 'fixed',
                top: 'calc(50% - 50px)',
                left: 'calc(50% - 50px)'
              }}
              src="/loading.gif"
              alt="loading"
            />
            </div>
    </Fragment>
    )
}

export default Loading;