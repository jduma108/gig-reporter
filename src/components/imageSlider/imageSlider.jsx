import React from 'react';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import CoreStyles from 'react-awesome-slider/src/core/styles.scss';
import AnimationStyles from 'react-awesome-slider/src/styled/fold-out-animation/fold-out-animation.scss';

import bts from '../../assets/bts.jpg';
import ajr from '../../assets/ajr.jpg';
import halsey from '../../assets/halsey.jpg';
import hellaMegaTour from '../../assets/hellaMegaTour.jpg';
import jonBellion from '../../assets/jonBellion.jpg';
import muse from '../../assets/muse.jpg';

const AutoplaySlider = withAutoplay(AwesomeSlider);

function ImageSlider() {
    return (
        <AutoplaySlider
            play={true}
            cancelOnInteraction={false} 
            interval={4000}
            bullets={false}
            buttons={false}
            animation="foldOutAnimation"
            cssModule={[CoreStyles, AnimationStyles]}
        >
            <div data-src={hellaMegaTour} alt="hella-mega-tour"/>
            <div data-src={jonBellion} alt="jon-bellion"/>
            <div data-src={muse} alt="muse"/>
            <div data-src={bts} alt="bts"/>
            <div data-src={halsey} alt="halsey"/>
            <div data-src={ajr} alt="ajr"/>
        </AutoplaySlider>
    )
}

export default ImageSlider;