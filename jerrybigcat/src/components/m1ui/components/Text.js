import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TextColors } from '../enums'
import { classNames, objectValues } from '../utils'

class Text extends Component {

	render() {

		const { color, ...props } = this.props
		const className = classNames(
			color ? 'm1-text-' + color : null,
			props.className
		)
		return (
			<span
				{...props}
				className={className}
			/>
		)
	}
}

Text.propTypes = {
	color: PropTypes.oneOf(objectValues(TextColors))
}

export default Text