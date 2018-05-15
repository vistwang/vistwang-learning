import React, { Component } from 'react'
import { classNames } from '../utils'

class ModalTitle extends Component {
	render() {
		const { componentClass, className, ...props } = this.props  
		return (
			<h4
				{...props}
				className={classNames('m1-modal-title', className)}
			/>
		)
	}
}

export default ModalTitle