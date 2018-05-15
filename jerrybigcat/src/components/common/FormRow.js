import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const propTypes = {
	label: PropTypes.string
}

const FormRow = ({label, className, children, ...props}) => {
	return (
		<div 
			{...props}
			className={classnames(
				'm1-form-row',
				className
			)} >
			<label className="m1-form-label">{label}</label>
			<div className="m1-form-content">
				{children}
			</div>
		</div>
	)
}

export default FormRow