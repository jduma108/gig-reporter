import React from 'react';
import axios from 'axios';
import Fade from 'react-reveal/Fade';

import ImageSlider from '../imageSlider/imageSlider';
import TicketmasterTable from '../tmTable/tmTable';

import './landing.css';
import NytArticles from '../nytArticles/nytArticles';

const ticketmasterKey = process.env.REACT_APP_TICKETMASTER_KEY
const nytKey = process.env.REACT_APP_NYT_KEY

class Landing extends React.Component {
    constructor(){
        super();

        this.state={
            userInput: '',
            ticketmasterSuccess: false,
            nytSuccess: false,
            error: false,
            errorMessage: '',
            tmError: '',
            nytError: '',
            events: [],
            articles: []
        }
        this.handleSearchButton = this.handleSearchButton.bind(this)
        this.handleSearchInput = this.handleSearchInput.bind(this)
        this.handleErrorMessages = this.handleErrorMessages.bind(this)
        this.handleEnter = this.handleEnter.bind(this)
    }

    handleErrorMessages = (message) => {
        this.setState({error: true, errorMessage: message})
    }

    handleSearchInput = (e) => {
        this.setState({
            userInput: e.target.value, 
            ticketmasterSuccess: false, 
            nytSuccess: false, 
            error: false,
            errorMessage: ''
        })
    }

    handleEnter = (event) => {
        if(event.key === 'Enter'){
            this.handleSearchButton()
        }
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
                    this.setState({error: true, tmError: "No results from Ticketmaster, please try another search!"})
                }
                
            })
            .catch(error => {
                console.log(error);
            });
            axios.get("https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + keyword + "&api-key=" + nytKey)
            .then(response => {
                console.log(response.data.response.docs)
                if (response.data.response.docs.length !== 0) {
                    var nytResults = response.data.response.docs
                    this.setState({nytSuccess: true, articles: nytResults})
                }
                else {
                    this.setState({error: true, nytError: "No results from the New York Times, please try another search!"})
                }
                
            })
            .catch(error => {
                console.log(error);
            });
        } else {
            this.handleErrorMessages("Please enter an artist name!")
        }
        
    }
    render() {
        const { ticketmasterSuccess, nytSuccess, userInput, events, articles, error, errorMessage, nytError, tmError}= this.state
        
        return (
            <div className={ticketmasterSuccess || nytSuccess ? "resultsWrapper" : "landingWrapper"}>
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
                            onKeyPress={this.handleEnter}
                        />
                        <button 
                            className="seachButton" 
                            onClick={this.handleSearchButton}
                        >
                                <span>Search</span>
                        </button>
                    </div>
                </Fade>
                {
                    ticketmasterSuccess ? 
                    <TicketmasterTable eventResults={events} searchInput={userInput}/>
                    : error ? 
                    <Fade>
                        <div className="errorWrapper">
                            <h1>{errorMessage !== '' ? errorMessage : tmError}</h1>
                        </div>
                    </Fade>
                    : null
                }
                {
                    nytSuccess ? 
                    <NytArticles articleResults={articles} searchInput={userInput}/>
                    : error ? 
                    <Fade>
                        <div className="errorWrapper">
                            <h1>{nytError}</h1>
                        </div>
                    </Fade>
                    : null
                }
            </div>
        )
    }
}

export default Landing;