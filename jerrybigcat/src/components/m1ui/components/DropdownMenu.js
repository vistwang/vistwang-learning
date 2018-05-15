import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { classNames } from '../utils'

const propTypes = {
	componentClass: PropTypes.node
}

const defaultProps = {
	componentClass: 'div'
}

class DropdownMenu extends Component {
	render() {
		const { componentClass: Component, className, children, ...props } = this.props 

		return (
			<Component
				{...props}
				className={classNames(
					'm1-dropdown-menu',
					className
				)}
			>
				{children}
			</Component>

		)
	}
}

DropdownMenu.propTypes = propTypes
DropdownMenu.defaultProps = defaultProps

export default DropdownMenu

