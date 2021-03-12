import React from 'react'
import useStyles from './promotion-style';
import {Grid, ButtonBase, Typography, Paper} from '@material-ui/core'
import NextIcon from '@material-ui/icons/ArrowForward';
import clsx from 'clsx';
import Slider from 'react-animated-slider';
import {useSelector} from 'react-redux';

const sliderData = [
    {
      image: 'https://source.unsplash.com/random',
      en_title: 'Sed imperdiet enim ligula',
      cn_title: '但是，预留资金',
      en_desc: 'Sed imperdiet enim ligula vitae viverra. Vivamus sit amet interdum elit.',
      cn_desc: '对于紫花苜蓿，需要进行无礼的外在性行为。 有时是活的胡萝卜开发商.',
      en_date: '12 Jul - 10 Aug',
      cn_date: '7月12日-8月10日',
    },
    {
      image: 'https://source.unsplash.com/random',
      en_title: 'Fusce placerat enim et odio',
      cn_title: '临床房地产和仇恨',
      en_desc: 'Sed imperdiet enim ligula vitae viverra. Vivamus sit amet interdum elit.',
      cn_desc: '对于紫花苜蓿，需要进行无礼的外在性行为。 有时是活的胡萝卜开发商',
      en_date: '12 Jul - 10 Aug',
      cn_date: '7月12日-8月10日'
    },
    {
      image: 'https://source.unsplash.com/random',
      en_title: 'Pellentesque ac bibendum tortor',
      cn_title: '和营养饮料的温度',
      en_desc: 'Sed imperdiet enim ligula vitae viverra. Vivamus sit amet interdum elit.',
      cn_desc: '对于紫花苜蓿，需要进行无礼的外在性行为。 有时是活的胡萝卜开发商.',
      en_date: '12 Jul - 10 Aug',
      cn_date: '7月12日-8月10日'
    },
    {
      image: 'https://source.unsplash.com/random',
      en_title: 'Pellentesque ac bibendum tortor',
      cn_title: '和营养饮料的温度',
      en_desc: 'Sed imperdiet enim ligula vitae viverra. Vivamus sit amet interdum elit.',
      cn_desc: '对于紫花苜蓿，需要进行无礼的外在性行为。 有时是活的胡萝卜开发商.',
      en_date: '12 Jul - 10 Aug',
      cn_date: '7月12日-8月10日'
    }
  ];

  function Promotion(props) {
    const classes = useStyles();
    const {"next-i18next": nextI18Next }= useSelector(state => state)

    return (
      <div className={classes.root}>
        <div className={classes.sliderWrap}>
          <Slider
            className="slider-wrapper"
            previousButton={(
              <NextIcon />
            )}
            nextButton={(
              <NextIcon />
            )}
          >
            {sliderData.map((item, index) => (
              <div className={clsx(classes.item, index % 2 === 1 ? classes.odd : classes.even)} key={index.toString()}>
                <Grid container>
                  <Grid item xs={12} lg={4}>
                    &nbsp;
                  </Grid>
                  <Grid item xs={12} lg={7}>
                      <section>
                        <div className={classes.imgWrap} >
                          <div className={classes.decoration}>
                            <svg>
                              <use xlinkHref="/images/crypto/deco-promo.svg#main" />
                            </svg>
                          </div>
                          <figure  className={classes.image} >
                            <img style={{
                                height: 370, 
                                width: 310, 
                                marginLeft: 20,
                                position: 'relative',
                                zIndex: 2,
                                overflow: 'hidden',
                                display: 'inline-block',
                                clipPath: 'polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)', 
                            }} src={item.image} alt={item[`${nextI18Next}_title`]} />
                          </figure>
                        </div>
                      </section>
                    <Paper className={classes.paper}>
                      <Typography variant="h1">
                        <ButtonBase>
                          {item[`${nextI18Next}_title`]}
                        </ButtonBase>
                      </Typography>
                      <Typography component="p">
                        {item[`${nextI18Next}_desc`]}
                      </Typography>
                      <section className={classes.time}>
                        <Typography component="h6">
                            Period
                          :&nbsp;
                          {item[`${nextI18Next}_date`]}
                        </Typography>
                      </section>
                    </Paper>
                  </Grid>
                </Grid>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    );
  }

export default Promotion