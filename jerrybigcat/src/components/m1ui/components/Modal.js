import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { classNames } from '../utils'

import ModalDialog from './ModalDialog'
import ModalBody from './ModalBody'
import ModalHeader from './ModalHeader'
import ModalFooter from './ModalFooter'
import ModalTitle from './ModalTitle'

const propTypes = {
	isAnimation: PropTypes.bool,
	show: PropTypes.bool,
	onClose: PropTypes.func,
	backdrop: PropTypes.oneOf(['static', true, false])
}

const defaultProps = {
	isAnimation: true,
	backdrop: true
}

class Modal extends Component {

	handleDialogClick = e => {
		if(e.target !== e.currentTarget) {
			return
		}
		if(this.props.onClose) {
			this.props.onClose()
		}
	}

	render() {
		const { isAnimation, show, backdrop, className, style, children, ...props } = this.props

		const inClassName = show && 'fade in'
		const modalStyle = {
			display: show ? 'block' : 'none'
		}

		// if(show) {
		// 	document.body.classList.add('modal-open')
		// } else {
		// 	document.body.classList.remove('modal-open')
		// }

		return (
			<div className="modal-open" style={modalStyle}>
				{backdrop?
					<div className={classNames('m1-modal-backdrop', inClassName)}></div> 
					: null}
				<ModalDialog
					{...props}
					style={style}
					className={classNames(className, inClassName)}
					onClick={backdrop === true ? this.handleDialogClick : null}
				>
					{children}
				</ModalDialog>
			</div>
		)
	}
}

Modal.propTypes = propTypes 
Modal.defaultProps = defaultProps

Modal.Title = ModalTitle
Modal.Body = ModalBody
Modal.Header = ModalHeader
Modal.Footer = ModalFooter
Modal.Dialog = ModalDialog


export default Modal