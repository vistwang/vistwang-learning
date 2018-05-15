import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { classNames } from '../utils'

const propTypes = {
	dialogClassName: PropTypes.string,
	closeButton: PropTypes.bool,
	onClose: PropTypes.func
}

const defaultProps = {
	closeButton: true
}

class ModalDialog extends Component {

	handleCloceClick = e => {
		const { onClose } = this.props
		if(onClose) {
			onClose(e)
		}
	}

	render() {
		const { closeButton, onClose, dialogClassName, className, style, children, ...props } = this.props
		return (
			<div 
				{...props}
				role="dialog" 
				className={classNames('m1-modal', className)}>
				<div 
				className={classNames('m1-modal-dialog', dialogClassName)}
				style={style}
				>
					<div className="m1-modal-content">
						{closeButton && <button type="button" className="m1-modal-close" onClick={this.handleCloceClick}></button>}
						{children}
					</div>
				</div>
			</div>
		)
	}
}

ModalDialog.propTypes = propTypes
ModalDialog.defaultProps = defaultProps

export default ModalDialog
