import React from 'react';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import CoreStyles from 'react-awesome-slider/src/core/styles.scss';
import AnimationStyles from 'react-awesome-slider/src/styled/fold-out-animation/fold-out-animation.scss';

import mumford from '../../assets/mumford.jpg'
import maroon5 from '../../assets/maroon5.jpg'
import panic from '../../assets/panic.jpg'

const AutoplaySlider = withAutoplay(AwesomeSlider);

function ImageSlider() {
    return (
        <AutoplaySlider
            play={true}
            cancelOnInteraction={false} 
            interval={5000}
            bullets={false}
            buttons={false}
            animation="foldOutAnimation"
            cssModule={[CoreStyles, AnimationStyles]}
        >
            <div data-src={mumford} />
            <div data-src={maroon5} />
            <div data-src={panic} />
        </AutoplaySlider>
    )
}

export default ImageSlider;