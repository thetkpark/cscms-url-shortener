import React, { Component } from 'react'
import ReactDOM from 'react-dom'
class Loading extends Component {
	render() {
		return ReactDOM.createPortal(
			<div className="ui dimmer modals visible active">
				<div className="ui active inverted">
					<div className="ui text loader">Loading</div>
				</div>
				<p></p>
			</div>,
			document.querySelector('#modal')
		)
	}
}

export default Loading
