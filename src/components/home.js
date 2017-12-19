import React, { Component } from 'react';

// import components
import Featured from './featured';
import Subscriptions from './subscriptions';
import Blocks from './blocks';
import Polls from './polls';
// import Teams from './teams';

const URL_HOME = 'http://localhost:3004/home';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            home: '',
            error: ''
        }
    }

    getHomeData() {
        fetch(URL_HOME, {method: 'GET'})
        .then(response => response.json())
        .then (json => {
            this.setState ({
                home: json
            })
        }).catch(error => {
            this.setState({
                error: error.message + " Data ☹️ (Please check your Internet Connection)"
            })
        })
    }

    componentDidMount() {
        this.getHomeData();
    }

    render () {
        return (
            <div>
                <Featured slides={this.state.home.slider} error={this.state.error}/>
                <Subscriptions />
                <Blocks blocks={this.state.home.blocks} error={this.state.error}/>
                <Polls />
            </div>
        )
    }
}

export default Home;