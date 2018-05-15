import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {classNames} from '../utils'

class Icon extends Component {

	render() {
		const { color, name, ...props } = this.props
		const profix = 'm1-icon'
		const iconProfix = 'icon-m1'
		const className = classNames(
			'iconfont',
			name.indexOf(iconProfix) === -1 ? `${iconProfix}-${name}` : name,
			color ? `${profix}-${color}` : null,
			props.className
		)

		return (
			<i {...props} className={className} />
		)
	}
}
Icon.propTypes = {
	color: PropTypes.string,
	name: PropTypes.string.isRequired
}

export default Icon