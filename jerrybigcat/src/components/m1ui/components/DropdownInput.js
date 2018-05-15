import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { classNames } from '../utils'

const propTypes = {
	value: PropTypes.string,
	placeholder: PropTypes.string,
}

const defaultProps = {
	value: '',
	placeholder: '',
}

class DropdownInput extends Component {
	render() {
		const { ...props } = this.props
		return (
			<div className="m1-dropdown-search">
				<input {...props} />
			</div>
		)
	}
}


DropdownInput.propTypes = propTypes
DropdownInput.defaultProps = defaultProps

export default DropdownInput

