import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { classNames } from '../utils'
import SafeAnchor from './SafeAnchor'

const propTypes = {
	active: PropTypes.bool,
	disabled: PropTypes.bool,
	eventKey: PropTypes.any,
	href: PropTypes.string,
	onClick: PropTypes.func,
	onSelect: PropTypes.func
}

const defaultProps = {
	disabled: false
}

class MenuItem extends Component {

	handleClick = e => {
		const { href, disabled, onSelect, eventKey } = this.props

		if(!href || disabled) {
			e.preventDefault()
		}

		if(disabled) {
			return
		}

		if(onSelect) {
			onSelect(eventKey, e)
		}
	}

	render() {
		const { className, disabled, active, style, children, ...props } = this.props

		return (
			<li
				className={classNames(className, {active, disabled})}
				style={style}
			>
				<SafeAnchor
					onClick={this.handleClick}
				>
					{children}
				</SafeAnchor>
			</li>
		)
	}
}

MenuItem.propTypes = propTypes
MenuItem.defaultProps = defaultProps

export default MenuItem