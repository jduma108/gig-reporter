import React from 'react';
import Fade from 'react-reveal/Fade';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import CoreStyles from 'react-awesome-slider/src/core/styles.scss';
import AnimationStyles from 'react-awesome-slider/src/styled/fold-out-animation/fold-out-animation.scss';
//import 'react-awesome-slider/dist/styles.css';

import Header from '../header/header';
import mumford from '../../assets/mumford.jpg'
import maroon5 from '../../assets/maroon5.jpg'
import panic from '../../assets/panic.jpg'

import './landing.css';

const AutoplaySlider = withAutoplay(AwesomeSlider);

const slider = (
    <AutoplaySlider
        play={true}
        cancelOnInteraction={false} 
        interval={3000}
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

class Landing extends React.Component {
    render() {
        
        return (
            <div className="landingWrapper">
                <Header/>
                <div className="slider">
                    {slider}
                </div>
            </div>
        )
    }
}

export default Landing;