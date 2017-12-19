import React, { Component } from 'react';

let regex = /^([\w_\.\-\+])+\@([\w\-]+\.)+([\w]{2,10})+$/;
const URL_EMAIL = 'http://localhost:3004/subscriptions';

class Subscriptions extends Component {

    constructor(props) {
        super(props);

        this.state = {
			email: '',
			error: false,
			success: false
		}

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.saveSubscription = this.saveSubscription.bind(this);
    }

    saveSubscription = (email) => {
		fetch (URL_EMAIL, {
			method: 'post',
			headers: {
				'Accept':'application/json',
				'Content-Type':'application/json'
			},
			body: JSON.stringify({email})
		})
		.then (response => response.json())
		.then (() => {
			this.setState ({
                email: '',
                success: true,
                error: false
			})
		})
    }

    clearMessages = () => {
        setTimeout(function () {
            this.setState ({
                error: false,
                success: false
            })
        }.bind(this), 4500)
    }

    handleSubmit (event) {
		event.preventDefault();
        let email = this.state.email;

        if (regex.test(email)) {
            this.saveSubscription(email);
        } else {
            this.setState ({
                error: true
            })
        }
        this.clearMessages();
    }

    onChangeInput (event) {
		this.setState ({
			email: event.target.value
        })
		let email = this.state.email;

        if (!regex.test(email)) {
            console.log("Bad Email")
            this.setState ({
                error: true
            })
            this.clearMessages();
        }
    }

    render() {
        return (
            <div className="subscription_panel">
                <h3>Subscribe to Us!</h3>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" placeholder="youremail@email.com" value={this.state.email} onChange={this.onChangeInput}/>
						<div className={this.state.error ? "error show":"error"}>
							Your Email is Invalid
						</div>
						<div className={this.state.success ? "success show":"success"}>
							Thank You for subscribing!
						</div>
                    </form>
                </div>
				<small>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi mattis,
					orci non efficitur porta, velit metus posuere mauris, non fringilla nisl felis ac tellus.
				</small>
            </div>
        );
    }
}

export default Subscriptions;