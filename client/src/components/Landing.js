import React, { Component } from 'react'
import * as actions from '../actions'
import { connect } from 'react-redux'
import Modal from './Modal.js'
import './Landing.css'

class Landing extends Component {
	state = { displayModal: false, type: '', url: '' }
	getShorten = async () => {
		console.log(this.props);
		await this.props.createShorten(this.state.url);
		this.setState({ displayModal: true, type: 'shorten' })
		console.log(this.state.url)
	}
	getOriginal = () => {
		this.setState({ displayModal: true, type: 'original' })
	}
	closeModal = () => {
		this.setState({ displayModal: false, type: '' })
	}
	renderModal() {
		if (this.state.displayModal) {
			return (
				<div>
					<Modal onDimiss={this.closeModal} title={this.state.type}></Modal>
				</div>
			)
		} else {
			return null
		}
	}
	handleChange = event => {
		this.setState({ url: event.target.value })
	}
	render() {
		return (
			<div id="landing">
				<h1>cscms url shortener</h1>
				<div className="ui input" id="url">
					<input
						type="text"
						placeholder="Enter your url"
						focus="true"
						value={this.state.url}
						onChange={this.handleChange}
					/>
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

export default connect(null, actions)(Landing)
