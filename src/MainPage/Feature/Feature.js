import React from 'react';
import MainFeature from './MainFeature';
import MoreFeature from './MoreFeature';
import useStyles from './feature-style';
import Parallax from '../../components/Parallax/Hexagonal';

export default function Feature(props) {
    const classes = useStyles();
    return(
        <div >
            <Parallax />
            <MainFeature {...props} />
            <MoreFeature {...props} />
        </div>
    )
}