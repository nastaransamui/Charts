import React, {useState} from 'react';
import Footer from './Footer';
import Counter from '../Counter';
import useStyles from './footer-style';
import LoadingOverlay from 'react-loading-overlay';



function FooterWithDeco(props) {
    const classes = useStyles();
    const [LoadingRoute, setLoadingRoute] = useState(false)
    return(
        <div className={classes.footerCounter}>
        <LoadingOverlay active={LoadingRoute} spinner text='Loading ...' >
            <div className={classes.decoTop}>
            <svg>
                <use xlinkHref="/images/crypto/deco-footer.svg#main" />
            </svg>
            </div>
        <Counter {...props} setLoadingRoute={setLoadingRoute} LoadingRoute={LoadingRoute}/>
        <Footer {...props}/>
        </LoadingOverlay>
        </div>
    )
}

export default FooterWithDeco;