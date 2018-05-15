import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { classNames, removeProps } from '../utils'


class Input extends Component {

	render() {
		const { id, type, className, ...props } = this.props

		return (
			<input 
				id={id}
				type={type || 'text'}
				className={className}
				{...props}
			/>
		)
	}
}

Input.propTypes = {
	id: PropTypes.string,
	type: PropTypes.string
}

export default Input