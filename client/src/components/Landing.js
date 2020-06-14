import React, { Component } from 'react'
import Modal from './Modal.js'
import './Landing.css'

class Landing extends Component {
	state = { displayModal: false }
	getShorten = () => {
		this.setState({ displayModal: true })
	}
	getOriginal = () => {
		this.setState({ displayModal: true })
	}
	closeModal = () => {
		this.setState({ displayModal: false })
	}
	renderModal() {
		if (this.state.displayModal) {
			return (
				<div>
					<Modal onDimiss={this.closeModal}></Modal>
				</div>
			)
		} else {
			return null
		}
	}
	render() {
		return (
			<div id="landing">
				<h1>cscms url shortener</h1>
				<div className="ui input" id="url">
					<input type="text" placeholder="Enter your url" focus="true" />
				</div>
				<div id="actionBtn">
					<span className="btnSpace">
						<button
							className="large ui blue button"
							onClick={this.getShorten}
						>
							Get shorten url
						</button>
					</span>
					<span className="btnSpace">
						<button
							className="large ui grey button"
							onClick={this.getOriginal}
						>
							Retrieve original url
						</button>
					</span>
				</div>
				{this.renderModal()}
			</div>
		)
	}
}

export default Landing
