import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class Warning extends Component {
	render() {
		return ReactDOM.createPortal(
			<div
				className="ui dimmer modals visible active"
				onClick={this.props.onDimiss}
			>
				<div
					className="ui tiny modal visible active"
					onClick={e => e.stopPropagation()}
				>
					<div className="header">This url is invalid</div>
					<div className="content">Please input the valid url.</div>
					<div className="actions">
						<div className="ui green button" onClick={this.props.onDimiss}>
							OK
						</div>
					</div>
				</div>
			</div>,
			document.querySelector('#warning')
		)
	}
}

export default Warning
