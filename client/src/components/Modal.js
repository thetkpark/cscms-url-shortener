import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard'

class Modal extends Component {
	state = { value: 'hello test' }
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
						<CopyToClipboard text={this.state.value} onCopy={this.copy}>
							<div className="ui positive right labeled icon button">
								Copy
								<i className="copy icon"></i>
							</div>
						</CopyToClipboard>
					</div>
				</div>
			</div>,
			document.querySelector('#modal')
		)
	}
}

export default Modal
