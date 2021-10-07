import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './NotFound.css'

class NotFound extends Component {
	render() {
		return (
			<div id="notfound">
				<h1>Sorry, Page not found</h1>
                <Link to="/"><h4>Back to Home page</h4></Link>
			</div>
		)
	}
}
export default NotFound;
