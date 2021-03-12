import React, { useState, useRef } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Carousel from 'react-slick';
import clsx from 'clsx';
import Title from '../../components/Title';
import TestiCard from '../../components/Cards/Testimonial';
import useStyle from './testi-style';
import {useSelector} from 'react-redux';

const testiContent = [
  {
    text_en: 'Vivamus sit amet interdum elit. Proin lacinia erat ac velit tempus auctor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam nec ex aliquet, aliquam neque non.',
    text_cn: '有时是活的胡萝卜开发商。 塞德·拉西尼亚（Sed lacinia）消逝，并渴望与作者共度时光。 有时，他们会饥肠and地开始饥饿，并初尝滋味。 您没有香蕉，有些也不会失败。',
    name_en: 'John Doe',
    name_cn: '约翰·杜',
    avatar: '/images/avatars/pp_girl.svg',
    title_en: 'Chief Digital Officer',
    title_cn: '首席数字官',
  },
  {
    text_en: 'Vivamus sit amet interdum elit. Proin lacinia erat ac velit tempus auctor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam nec ex aliquet, aliquam neque non.',
    text_cn: '有时是活的胡萝卜开发商。 塞德·拉西尼亚（Sed lacinia）消逝，并渴望与作者共度时光。 有时，他们会饥肠and地开始饥饿，并初尝滋味。 您没有香蕉，有些也不会失败。',
    name_en: 'John Doe',
    name_cn: '约翰·杜',
    avatar: '/images/avatars/pp_boy.svg',
    title_en: 'Chief Digital Officer',
    title_cn: '首席数字官',
  },
  {
    text_en: 'Cras convallis lacus orci, tristique tincidunt magna consequat in. In vel pulvinar est, at euismod libero.',
    text_cn: 'Cras convallis lacus orci，三位一体的锡奇顿·玛格纳在其中。 或在沙发上，但性能免费。',
    name_en: 'Jena Doe',
    name_cn: '简·多伊',
    avatar:  '/images/avatars/pp_girl2.svg',
    title_en: 'Graphic Designer',
    title_cn: '平面设计师',
  },
  {
    text_en: 'Sed imperdiet enim ligula, vitae viverra justo porta vel.',
    text_cn: 'Sed imperdiet enim ligula，正义之门，或生命之源。',
    name_en: 'Jovelin Doe',
    name_cn: '乔维林·多伊',
    avatar:  '/images/avatars/pp_girl3.svg',
    title_en: 'Senior Graphic Designer',
    title_cn: '高级平面设计师',
  },
  {
    text_en: 'Cras convallis lacus orci, tristique tincidunt magna consequat in. In vel pulvinar est, at euismod libero.',
    text_cn: 'Cras convallis lacus orci，三位一体的锡奇顿·玛格纳在其中。 或在沙发上，但性能免费。',
    name_en: 'Jihan Doe',
    name_cn: '吉汉道',
    avatar:'/images/avatars/pp_girl4.svg',
    title_en: 'CEO Software House',
    title_cn: '首席执行官软件公司',
  },
  {
    text_en: 'Cras convallis lacus orci, tristique tincidunt magna consequat in. In vel pulvinar est, at euismod libero.',
    text_cn: 'Cras convallis lacus orci，三位一体的锡奇顿·玛格纳在其中。 或在沙发上，但性能免费。',
    name_en: 'John Doe',
    name_cn: '约翰·杜',
    avatar: '/images/avatars/pp_boy4.svg',
    title_en: 'Senior Graphic Designer',
    title_cn: '高级平面设计师',
  },
];


function Testimonials(props) {
  const slider = useRef(null);
  const classes = useStyle();
  const {testimocialText} = props;
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const {"next-i18next": nextI18Next }= useSelector(state => state)
  const [active, setActive] = useState(0);
  const [activeTransition, setActiveTransition] = useState(0);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    fade: true,
    autoplay: true,
    autoplaySpeed: 7000,
    afterChange: (current) => setActive(current),
    beforeChange: (current, next) => setActiveTransition(next),
  };
  const slideState = index => {
    if (index === activeTransition - 1 || index === active - 1) {
      return classes.past;
    }
    if (index === activeTransition + 1 || index === active + 1) {
      return classes.future;
    }
    if (index === activeTransition || index === active) {
      return classes.current;
    }
    return classes.slide;
  };
  return (
    <div className={classes.root}>
      <Container fixed={isDesktop}>
        <Title text={testimocialText[`${nextI18Next}_title`]} align="center" />
        <Typography variant="subtitle2" align="center">
           {testimocialText[`${nextI18Next}_subtitle`]}
        </Typography>
        <Grid container spacing={6}>
          <Grid item md={1} xs={12} />
          <Grid item md={10} xs={12}>
            <div className={classes.sliderWrap}>
              <div className={classes.carousel}>
                <button
                  type="button"
                  className={clsx(classes.nav, classes.prev)}
                  onClick={() => slider.current.slickPrev()}
                >
                  <i className="ion-ios-arrow-back" />
                </button>
                <Carousel ref={slider} {...settings}>
                  {testiContent.map((item, index) => (
                    <div key={index.toString()} className={clsx(classes.item, slideState(index))}>
                      <div className={classes.slideContent}>
                        <TestiCard
                          text={item[`text_${nextI18Next}`]}
                          name={item[`name_${nextI18Next}`]}
                          title={item[`title_${nextI18Next}`]}
                          avatar={item.avatar}
                          active={index === active}
                        />
                      </div>
                    </div>
                  ))}
                </Carousel>
                <button
                  type="button"
                  className={clsx(classes.nav, classes.next)}
                  onClick={() => slider.current.slickNext()}
                >
                  <i className="ion-ios-arrow-forward" />
                </button>
              </div>
              <div className={classes.pagination}>
                <ul>
                  {[...Array(testiContent.length)].map((e, index) => (
                    <li
                      key={index.toString()}
                      className={index === active ? classes.active : ''}
                    >
                      <button type="button"  onClick={() => slider.current.slickGoTo(index)} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Testimonials
