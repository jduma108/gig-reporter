import React from 'react';
import axios from 'axios';
import Fade from 'react-reveal/Fade';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import CoreStyles from 'react-awesome-slider/src/core/styles.scss';
import AnimationStyles from 'react-awesome-slider/src/styled/fold-out-animation/fold-out-animation.scss';

import mumford from '../../assets/mumford.jpg'
import maroon5 from '../../assets/maroon5.jpg'
import panic from '../../assets/panic.jpg'

import './landing.css';

const ticketmasterKey = process.env.REACT_APP_TICKETMASTER_KEY

const AutoplaySlider = withAutoplay(AwesomeSlider);

const slider = (
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

class Landing extends React.Component {
    constructor(){
        super();

        this.state={
            userInput: '',
            successfulSearch: false,
            events: []
        }
        this.handleSearchButton = this.handleSearchButton.bind(this)
        this.handleSearchInput = this.handleSearchInput.bind(this)
    }

    handleSearchInput = (e) => {
        this.setState({successfulSearch: false})
        this.setState({userInput: e.target.value})
    }

    handleSearchButton = () => {
        this.setState({successfulSearch: false})
        var keyword = this.state.userInput
        axios.get("https://app.ticketmaster.com/discovery/v2/events.json?keyword=" + keyword + "&apikey=" + ticketmasterKey)
        .then(response => {
            console.log(response.data._embedded.events)
            var ticketMasterResults = response.data._embedded.events
            this.setState({successfulSearch: true, events: ticketMasterResults})
        })
        .catch(error => {
            this.setState({successfulSearch: false})
            console.log(error);
        });
    }
    render() {
        const { successfulSearch, userInput, events} = this.state
        
        return (
            <div className="landingWrapper">
                <Fade bottom>
                    <div className="slider">
                        {slider}
                    </div>
                    <div className="description">
                        <p>Need to find information about your favorite artist? Then you've come to the right place! Search an artist name to find out concert dates and read articles about them.</p>
                    </div>
                    
                    <div className="form">
                        <input 
                            type="text" 
                            className="searchInput" 
                            placeholder="Search artist name"
                            onChange={this.handleSearchInput}
                        />
                        <button className="seachButton" onClick={(e) => {this.handleSearchButton(e)}}><span>Search</span></button>
                    </div>
                </Fade>
                    {
                        successfulSearch ? 
                        <Fade bottom>
                            <div className="results">
                                <h1>Events for "{userInput}"</h1>
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="heading">Date</th>
                                            <th className="heading">Event Name</th>
                                            <th className="heading">Venue</th>
                                            <th className="heading">Location</th>
                                            <th className="heading">Buy Tickets</th>
                                        </tr>
                                    </thead>
                                    {
                                        events.map(event => (
                                            <tbody>
                                                <tr>
                                                    <td className="date">{event.dates.start.localDate}</td>
                                                    <td className="eventName">{event.name}</td>
                                                    <td className="venue">{event._embedded.venues[0].name}</td>
                                                    <td className="location">{event._embedded.venues[0].city.name}, {event._embedded.venues[0].country.countryCode}</td>
                                                    <td className="buyTickets"><a href={event.url} target="_blank" rel="noopener noreferrer">View Event</a></td>
                                                </tr>
                                            </tbody>
                                        ))
                                    }
                                </table>
                            </div>
                        </Fade>
                        : null
                    }
                
            </div>
        )
    }
}

export default Landing;