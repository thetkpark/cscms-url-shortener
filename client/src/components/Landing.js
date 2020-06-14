import React, { Component } from 'react'
import './Landing.css'

class Landing extends Component {
	render() {
		return (
			<div id="landing">
				<h1>cscms url shortener</h1>
				<div class="ui input" id="url">
					<input type="text" placeholder="Enter your url" focus />
				</div>
				<div id="actionBtn">
					<span class="btnSpace">
						<button class="large ui blue button">Get shorten url</button>
					</span>
					<span class="btnSpace">
						<button class="large ui grey button">
							Retrieve original url
						</button>
					</span>
				</div>
			</div>
		)
	}
}

export default Landing
