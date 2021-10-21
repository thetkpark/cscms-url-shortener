import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import QRCode from 'react-qr-code'
class Modal extends Component {
	copy = () => {
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
					<div className="content">
						<a
							href={this.props.content}
							target="_blank"
							rel="noopener noreferrer"
						>
							{this.props.content}
						</a>
						<div style={{ width: '150px', height: '150px' }}>
							<QRCode value={this.props.content} />
						</div>
					</div>
					<div className="actions">
						<div
							className="ui blue deny right labeled icon button"
							onClick={this.props.onDimiss}
						>
							<a
								style={{ textDecoration: 'none', color: 'white' }}
								href={this.props.content}
								target="_blank"
								rel="noopener noreferrer"
							>
								Open link
							</a>
							<i className="share icon"></i>
						</div>
						<CopyToClipboard text={this.props.content} onCopy={this.copy}>
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
