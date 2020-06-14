import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class Modal extends Component {
	render() {
		return ReactDOM.createPortal(
			<div
				className="ui small dimmer modals visible active"
				onClick={this.props.onDimiss}
			>
				<div
					className="ui standard modal visible active"
					onClick={e => e.stopPropagation()}
				>
					<div className="header">Title</div>
					<div className="content">Content</div>
					<div className="actions">
						<div className="ui positive right labeled icon button">
							Copy
							<i className="checkmark icon"></i>
						</div>
					</div>
				</div>
			</div>,
			document.querySelector('#modal')
		)
	}
}

export default Modal
