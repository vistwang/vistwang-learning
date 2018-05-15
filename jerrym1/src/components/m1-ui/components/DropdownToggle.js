import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { classNames } from '../utils'
import Button from './Button'
import SafeAnchor from './SafeAnchor'

const propTypes = {
	noCaret: PropTypes.bool,
	open: PropTypes.bool,
	title: PropTypes.string,
	useAnchor: PropTypes.bool
}

const defaultProps = {
	noCaret: false,
	useAnchor: false
}

class DropdownToggle extends Component {
	render() {
		const { noCaret, open, useAnchor, children, ...props } = this.props 

		const ComponentClass = useAnchor ? SafeAnchor : Button
		const useCaret = !noCaret

		return (
			<ComponentClass
				{...props}
			>
				{children || props.title}
				{useCaret && ' '}
				{useCaret && <i className="m1-caret"></i>}
			</ComponentClass>

		)
	}
}

DropdownToggle.propTypes = propTypes
DropdownToggle.defaultProps = defaultProps

export default DropdownToggle

