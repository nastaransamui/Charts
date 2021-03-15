import React from 'react';
import useStyles from './error-style';
import { useSelector } from 'react-redux';
import { Container, Grid, Typography, Button } from '@material-ui/core';

function Error(props) {
    const classes = useStyles();
    const {"next-i18next": nextI18Next }= useSelector(state => state)
    const {ErrorText, statusCode} = props;
    return(
        <div className={classes.errorWrap}>
            <Container>
                <Grid container>
                    <Grid item sm={5} xs={12}>
                    <div className={classes.flex}>
                        <div className={classes.deco}>
                        <svg>
                          <use xlinkHref="/images/crypto/deco-hexa.svg#main" />
                        </svg>
                        <Typography variant="h3">
                            {statusCode}
                        </Typography>
                        </div>
                    </div>
                    </Grid>
                    <Grid item sm={7} xs={12}>
                        <div className={classes.text}>
                        <Typography variant="h4">{ErrorText[`${nextI18Next}_error`]}</Typography>
                        <Typography>
                            {ErrorText[`${nextI18Next}_404_subtitle`]}
                        </Typography>
                        <Button variant="contained" color="primary" href="/" className={classes.button}>
                            {ErrorText[`${nextI18Next}_404_button`]}
                        </Button>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default Error