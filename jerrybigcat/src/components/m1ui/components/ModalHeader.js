import React, { Component } from 'react'
import { classNames } from '../utils'

class ModalHeader extends Component {
	render() {
		const { className, ...props } = this.props
		return (
			<div 
				{...props} 
				className={classNames('m1-modal-header', className)}
			/>
		)
	}
}

export default ModalHeader

