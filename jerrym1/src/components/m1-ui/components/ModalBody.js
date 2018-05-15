import React, { Component } from 'react'
import { classNames } from '../utils'

class ModalBody extends Component {
	render() {
		const { className, ...props } = this.props
		return (
			<div
				{ ...props }
				className={classNames('m1-modal-body', className)}
			/>
		)
	}
}
export default ModalBody