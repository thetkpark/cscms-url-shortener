import React, { Component } from "react"
import * as actions from "../actions"
import { connect } from "react-redux"
import Modal from "./Modal.js"
import Loading from "./Loading"
import Warning from "./Warning"
import "./Landing.css"

class Landing extends Component {
	state = {
		displayModal: false,
		type: "",
		url: "",
		slug: "",
		loading: false,
		displayWarning: false
	}
	getShorten = async () => {
		this.setState({ loading: true })
		await this.props.createShorten(this.state.url, this.state.slug)
		this.setState({ loading: false })
		if (this.props.success) {
			this.setState({ displayModal: true, type: "shorten" })
		} else {
			this.setState({ displayWarning: true })
		}
	}
	getOriginal = async () => {
		this.setState({ loading: true })
		await this.props.getOriginal(this.state.url)
		this.setState({ loading: false })
		if (this.props.success) {
			this.setState({ displayModal: true, type: "original" })
		} else {
			this.setState({ displayWarning: true })
		}
	}
	closeModal = () => {
		this.setState({ displayModal: false, type: "" })
	}
	closeWarning = () => {
		this.setState({ displayWarning: false })
	}
	renderModal() {
		if (this.state.displayModal) {
			return (
				<div>
					<Modal
						onDimiss={this.closeModal}
						title={this.state.type}
						content={`${this.props.answer}`}
					></Modal>
				</div>
			)
		} else {
			return null
		}
	}
	renderLoading() {
		if (this.state.loading) {
			return <Loading></Loading>
		} else {
			return null
		}
	}
	renderWarning() {
		if (this.state.displayWarning) {
			return <Warning onDimiss={this.closeWarning}></Warning>
		} else {
			return null
		}
	}
	handleChange = (event) => {
		this.setState({ url: event.target.value })
	}
	handleChangeSlug = (event) => {
		this.setState({ slug: event.target.value })
	}
	render() {
		return (
			<div id="landing">
				{this.renderLoading()}
				<h1>cscms url shortener</h1>
				<div className="ui input" id="url">
					<input
						type="text"
						id="input-url"
						placeholder="Enter your url"
						focus="true"
						value={this.state.url}
						onChange={this.handleChange}
					/>
					<input
						id="input-slug"
						type="text"
						placeholder="Slug"
						value={this.state.slug}
						onChange={this.handleChangeSlug}
					/>
				</div>
				<div id="actionBtn">
					<span className="btnSpace">
						<button className="myBtn ui blue button" onClick={this.getShorten}>
							Get shorten url
						</button>
					</span>
					<span className="btnSpace">
						<button className="myBtn ui grey button" onClick={this.getOriginal}>
							Retrieve original url
						</button>
					</span>
				</div>
				{this.renderModal()}
				{this.renderWarning()}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		answer: state.url.answer,
		success: state.url.success
	}
}
export default connect(mapStateToProps, actions)(Landing)
