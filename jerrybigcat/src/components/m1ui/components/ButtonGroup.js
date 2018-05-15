import React, { Component } from 'react'
import { classNames } from '../utils'

class ButtonGroup extends Component {
	render() {
		const { className, ...props } = this.props

		return (
			<div
				{...props}
				className={classNames('m1-btn-group', className)}
			/>
		)
	}
}

export default ButtonGroup