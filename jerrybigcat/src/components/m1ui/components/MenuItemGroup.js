import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { classNames } from '../utils'

const propTypes = {
	componentClass: PropTypes.node,
	label: PropTypes.string,
}

const defaultProps = {
	componentClass: 'li'
}

class MenuItemGroup extends Component {
	render() {
		const { componentClass: Component, className, label, children, ...props } = this.props 

		return (
			<Component
				{...props}
				className={classNames(
					'm1-dropdown-optgroup',
					className
				)}
			>
				{label && <a>{label}</a>}
				{children}
			</Component>

		)
	}
}

MenuItemGroup.propTypes = propTypes
MenuItemGroup.defaultProps = defaultProps

export default MenuItemGroup

