import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { classNames } from '../utils'

class Alert extends Component {

	render() {
		const { color, className, children, ...props } = this.props
		const profix = 'm1-alert'
		const fullClassName = classNames(
			profix,
			color ? `${profix}-${color}` : null,
			className
		)
		return (
			<div className={fullClassName} >
				{children}
			</div>
		)
	}
}
Alert.propTypes = {
	color: PropTypes.string
}

export default Alert