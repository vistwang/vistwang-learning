import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Radio } from '../m1ui'

let currentId = 0

class RadioMix extends Component {

	render() {
		const { id, className, checked, children, ...props } = this.props

		const radioId = id || `radioMix${currentId++}`

		const passClassName = classNames(
			'radio-mix',
			{'selected': checked},
			className,
		)
		return (
			<div className={passClassName}>
				<Radio {...props} id={radioId} checked={checked}/>
				<label  className="radio-mix-box" htmlFor={radioId}>
					{children}
				</label>
			</div>
		)
	}
}
RadioMix.propTypes = {
	checked: PropTypes.bool,
	onChange: PropTypes.func
}

export default RadioMix
