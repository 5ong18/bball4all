import React, {Component} from 'react';
import shuffleArray from "../functions";

const URL_TEAM = 'http://localhost:3004/teams'

class Team extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        }
    }

    getTeamDetail () {
        fetch(`${URL_TEAM}?name=${this.props.match.params.id}`, {method: 'GET'})
            .then(response => response.json())
            .then(json => {
                console.log(json)
                this.setState({
                    data: json
                })
            })
    }

    renderSquad = (squad) => {
        return shuffleArray(squad).map((item) => {
            return (
                <div key={item.name} className="item_player_wrapper">
                    <img src={`../assets/img/avatar.png`} alt={item.name}/>
                    <h4>{item.name}</h4>
                    <div className="node">
                        <span>Number: </span>{item.number}
                    </div>
                    <div className="node">
                        <span>PPG: </span>{item.PPG}
                    </div>
                    <div className="node">
                        <span>APG: </span>{item.APG}
                    </div>
                    <div className="node">
                        <span>RPG: </span>{item.RPG}
                    </div>
                </div>
            )
        })
    }

    renderData = ({data}) => {
        return data.map((item) => {
            return (
                <div key={item.id} className="team_data_wrapper">
                    <div className="left">
                        <img src={`../assets/img/teams/${item.logo}`} alt={item.name}/>
                    </div>
                    <div className="right">
                        <h1>{item.name}</h1>
                        <p>{item.description}</p>
                        <hr/>
                        <div className="squad">
                            {this.renderSquad(item.squad)}
                        </div>
                    </div>
                </div>
            )
        })
    }

    componentDidMount() {
        this.getTeamDetail()
    }

    render () {
        return (
            <div className="team_data">
                {this.renderData(this.state)}
            </div>
        )
    }
}

export default Team;