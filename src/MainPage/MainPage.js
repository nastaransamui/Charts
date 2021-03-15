import React,{ Fragment } from 'react';
import useStyles from './main-page-styles'
import {Typography} from '@material-ui/core'
import Banner from './Banner'
import Promotion from './Promotion';
import Feature from './Feature'
import Benefit from './Benefit'
import Testimonials from './Testimonials'
import Faq from './Faq';
import FooterWithCounter from './Footer/FooterWithCounter'

function MainPage(props){
    const classes = useStyles();
    return(
        <Fragment>
            <section id="banner">
//                 <Banner {...props} />
            </section>
          <section id="promotions">
            <Promotion {...props}/>
          </section>
          <section id="feature" >
             <Feature {...props}/>
          </section>
          <section id="feature" >
             <Benefit {...props}/>
          </section>
          <section id="testimonials" className={classes.spaceTop}>
             <Testimonials {...props}/>
          </section>
          <section id="testimonials" className={classes.spaceTop}>
             <Faq {...props}/>
          </section>
          <section id="testimonials" >
            <FooterWithCounter {...props}/>
          </section>
        </Fragment>
    )
}

export default MainPage;
