import React from 'react';
import axios from 'axios';
import Fade from 'react-reveal/Fade';

import ImageSlider from '../imageSlider/imageSlider';
import TicketmasterTable from '../tmTable/tmTable';

import './landing.css';

const ticketmasterKey = process.env.REACT_APP_TICKETMASTER_KEY

class Landing extends React.Component {
    constructor(){
        super();

        this.state={
            userInput: '',
            ticketmasterSuccess: false,
            error: false,
            errorMessage: '',
            events: []
        }
        this.handleSearchButton = this.handleSearchButton.bind(this)
        this.handleSearchInput = this.handleSearchInput.bind(this)
        this.handleErrorMessages = this.handleErrorMessages.bind(this)
    }

    handleErrorMessages = (message) => {
        this.setState({error: true, errorMessage: message})
    }

    handleSearchInput = (e) => {
        this.setState({userInput: e.target.value, ticketmasterSuccess: false, error: false})
    }

    handleSearchButton = () => {
        var keyword = this.state.userInput.toLowerCase()
        if (keyword !== "") {
            axios.get("https://app.ticketmaster.com/discovery/v2/events.json?keyword=" + keyword + "&apikey=" + ticketmasterKey)
            .then(response => {
                //console.log(response.data._embedded.events)
                if (response.data._embedded !== undefined) {
                    var ticketMasterResults = response.data._embedded.events
                    this.setState({ticketmasterSuccess: true, events: ticketMasterResults})
                }
                else {
                    this.setState({ticketmasterSuccess: false})
                    this.handleErrorMessages("No results, please try another search!")
                }
                
            })
            .catch(error => {
                this.setState({ticketmasterSuccess: false})
                console.log(error);
            });
        } else {
            this.handleErrorMessages("Please enter an artist name!")
        }
        
    }
    render() {
        const { ticketmasterSuccess, userInput, events, error, errorMessage}= this.state
        
        return (
            <div className="landingWrapper">
                <Fade bottom>
                    <div className="slider">
                        <ImageSlider/>
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
                        ticketmasterSuccess ? 
                        <TicketmasterTable eventResults={events} searchInput={userInput}/>
                        : error ? 
                        <Fade>
                            <div className="errorWrapper">
                                <h1>{errorMessage}</h1>
                            </div>
                        </Fade>
                        : null
                    }
            </div>
        )
    }
}

export default Landing;