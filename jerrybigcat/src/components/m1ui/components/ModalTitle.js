import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { classNames } from '../utils'

const propTypes = {
	componentClass: PropTypes.node
}

const defaultProps = {
	componentClass: 'h4'
}

class ModalTitle extends Component {
	render() {
		const { componentClass: Component, className, ...props } = this.props  
		return (
			<Component
				{...props}
				className={classNames('m1-modal-title', className)}
			/>
		)
	}
}

ModalTitle.propTypes = propTypes
ModalTitle.defaultProps = defaultProps

export default ModalTitle