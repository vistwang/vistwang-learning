import React, { Component } from 'react'
import { classNames } from '../utils'

class ModalFooter extends Component {
	render() {
		const { className, ...props } = this.props
		return (
			<div
				{ ...props }
				className={classNames('m1-modal-footer', className)}
			/>
		)
	}
}
export default ModalFooter
