import React from 'react';
import Fade from 'react-reveal/Fade';

import './nytArticles.css';

class NytArticles extends React.Component {
    render(){
        const { articleResults, searchInput} = this.props
        return (
            <Fade bottom>
                <div className="nytResults">
                    <h1>Articles about "{searchInput}"</h1>
                    <div className="articleWrapper">
                    {
                        articleResults.map((article) => (
                            <div className="articleItem">
                                {
                                    article.headline.main !== undefined ?
                                    <h2>{article.headline.main}</h2>
                                    : <h2>Article name unknown</h2>
                                }
                                {
                                    article.byline.original !== undefined ?
                                    <h3>{article.byline.original}</h3>
                                    : <h3>Author unknown}</h3>
                                }
                                {
                                    article.abstract !== undefined ?
                                    <p>{article.abstract}</p>
                                    : <p>Abstract not available</p>
                                }
                                <hr/>
                                {
                                    article.web_url !== undefined ?
                                    <a href={article.web_url}>Read article >></a>
                                    : <p>URL unavalible</p>
                                }
                            </div>
                        ))
                    }
                    </div>
                </div>
            </Fade>
        )
    }
}

export default NytArticles;