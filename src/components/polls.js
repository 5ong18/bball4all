import React, { Component } from 'react';

const URL_POLLS = 'http://localhost:3004/teams'

class Poll extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pollTeams: [],
            error: ''
        }
    }

    fetchPoll () {
        fetch(`${URL_POLLS}?poll=true&sort=count&_order=desc`, {method: 'GET'})
        .then (response => response.json())
        .then (json => {
           // console.log(json)
           this.setState ({
                pollTeams: json
           })
        }).catch(error => {
            // console.log (error.message + " ☹️ (Please check your Internet Connection)")
            this.setState({
                error: error.message + " Data ☹️ (Please check your Internet Connection)"
            })
        })
    }

    componentDidMount() {
        this.fetchPoll();
    }

    addCount (count, id) {
        fetch (`${URL_POLLS}/${id}`, {
            method: 'PATCH',
            headers: {
                'Accept':'application/json',
                'Content-type':'application/json'
            },
            body: JSON.stringify({count: count + 1})
        }).then(() => {
            this.fetchPoll();
        })
    }

    sortVotes = (array) => {
        array = this.state.pollTeams;

        array.sort(function (a, b) {
            return b.count - a.count;
        });

        return array;
    }

    renderPoll () {
        const position = ["1ST", "2ND", "3RD", "4TH", "5TH"];

        return this.sortVotes(this.state.pollTeams).map ((item, index) => {
            return (
                <div key={item.id} className="poll_item" onClick={()=>this.addCount(item.count, item.id)}>
                    <img alt={item.name} src={`/assets/img/teams/${item.logo}`} />
                    <h4>{position[index]}</h4>
                    <div><b>{item.count}</b><br/> Votes</div>
                </div>
            )
        })
    }

    render() {
        return (
            <div className="home_poll">
                <h3>Who will be the next champion?</h3>
                <div className="poll_container">
                    {this.renderPoll()}
                </div>
            </div>
        );
    }
}

export default Poll;