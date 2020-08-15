import React from 'react';
import Fade from 'react-reveal/Fade';

class TicketmasterTable extends React.Component {
    render(){
        const { eventResults, searchInput} = this.props
        return (
            <Fade bottom>
                <div className="tmResults">
                    <h1>Events for "{searchInput}"</h1>
                    <table>
                        <thead>
                            <tr>
                                <th className="heading dateHeader">DATE</th>
                                <th className="heading eventHeader">EVENT NAME</th>
                                <th className="heading venueHeader">VENUE</th>
                                <th className="heading locationHeader ">LOCATION</th>
                                <th className="heading ticketsHeader">TICKETS</th>
                            </tr>
                        </thead>
                        {
                            eventResults.map((event, i) => (
                                <tbody key={i}>
                                    <tr className="tableRow">
                                        <td className="tableData date">{event.dates.start.localDate}</td>
                                        <td className="tableData eventName">{event.name}</td>
                                        <td className="tableData venue">{event._embedded.venues[0].name}</td>
                                        <td className="tableData location">{event._embedded.venues[0].city.name}, {event._embedded.venues[0].country.countryCode}</td>
                                        <td className="tableData tickets"><a href={event.url} target="_blank" rel="noopener noreferrer">View Event</a></td>
                                    </tr>
                                </tbody>
                            ))
                        }
                    </table>
                </div>
            </Fade>
        )
    }
}

export default TicketmasterTable;