import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { classNames } from '../utils'

const propTypes = {
	color: PropTypes.string,
	size: PropTypes.string,
	href: PropTypes.string,
	onClick: PropTypes.func,
	disabled: PropTypes.bool
}

const isTrivialHref = href => {
	return !href || href.trim() === '#'
}

class SafeAnchor extends Component {

	handleClick = e => {
		const { disabled, href, onClick } = this.props

		if(disabled || isTrivialHref(href)) {
			e.preventDefault()
		}

		if(disabled) {
			e.stopPropagation()
			return
		}

		if(onClick) {
			onClick(e)
		}
	}

	render() {
		const { disabled, ...props } = this.props

		if(disabled) {
			props.styl = { pointerEvents: 'none', ...props.style }
		}

		return (
			<a
				{...props}
				onClick={this.handleClick}
			/>
		)
	}
}

SafeAnchor.propTypes = propTypes

export default SafeAnchor