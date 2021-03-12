import React from 'react';
import Footer from './Footer';
import Counter from '../Counter';
import useStyles from './footer-style';

function FooterWithDeco(props) {
    const classes = useStyles();
    return(
        <div className={classes.footerCounter}>
            <div className={classes.decoTop}>
            <svg>
                <use xlinkHref="/images/crypto/deco-footer.svg#main" />
            </svg>
            </div>
        <Counter {...props}/>
        <Footer {...props}/>
        </div>
    )
}

export default FooterWithDeco;