import React from 'react';
import axios from 'axios';
import Fade from 'react-reveal/Fade';

import ImageSlider from '../imageSlider/imageSlider';
import TicketmasterTable from '../tmTable/tmTable';

import './landing.css';

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
            events: [],
            articles: []
        }
        this.handleSearchButton = this.handleSearchButton.bind(this)
        this.handleSearchInput = this.handleSearchInput.bind(this)
        this.handleErrorMessages = this.handleErrorMessages.bind(this)
    }

    handleErrorMessages = (message) => {
        this.setState({error: true, errorMessage: message})
    }

    handleSearchInput = (e) => {
        this.setState({userInput: e.target.value, ticketmasterSuccess: false, error: false, nytSuccess: false,})
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
                    this.handleErrorMessages("No results from Ticketmaster, please try another search!")
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
                    this.handleErrorMessages("No results from New York Times, please try another search!")
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
        const { ticketmasterSuccess, nytSuccess, userInput, events, articles, error, errorMessage}= this.state
        
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
                        <button 
                            className="seachButton" 
                            onClick={(e) => {this.handleSearchButton(e)}}
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
                                <h1>{errorMessage}</h1>
                            </div>
                        </Fade>
                        : null
                    }
                    {
                        nytSuccess ? 
                        <Fade bottom>
                            <div className="nytResults">
                                <h1>Articles about "{userInput}"</h1>
                                <div className="articleWrapper">
                                {
                                    articles.map((article) => (
                                        <div className="articleItem">
                                            <h2>{article.headline.main}</h2>
                                            <h3>{article.byline.original}</h3>
                                            <p>{article.abstract}</p>
                                            <hr/>
                                            <a href={article.web_url} target="_blank" rel="noopener noreferrer">Read article >></a>
                                        </div>
                                    ))
                                }
                                </div>
                            </div>
                        </Fade>
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