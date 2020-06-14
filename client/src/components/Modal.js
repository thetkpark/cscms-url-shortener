import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class Modal extends Component {
	copy = () => {
		//copy text to clipboard
		this.props.onDimiss()
	}
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
					<div className="header">This is your {this.props.title} url</div>
					<div className="content">Content</div>
					<div className="actions">
						<div
							className="ui positive right labeled icon button"
							onClick={this.props.copy}
						>
							Copy
							<i className="copy icon"></i>
						</div>
					</div>
				</div>
			</div>,
			document.querySelector('#modal')
		)
	}
}

export default Modal
