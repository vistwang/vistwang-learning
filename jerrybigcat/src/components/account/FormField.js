import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const propTypes = {
	title: PropTypes.string,
	inputText: PropTypes.any,
	check: PropTypes.bool,
	multi: PropTypes.bool
}

const FormField = ({title, inputText, check, multi, className, label, ...props}) => {
	const inputClassName = classNames('m1-form-input', className, {'error': check === false})
	return (
		<div className="m1-form-row">
			<div className="m1-form-label">
				{title}：
			</div>
			<div className="m1-form-content">
				{!label && !multi && <input {...props} className={inputClassName}/>}
				{!label && multi && <textarea {...props} className={inputClassName}/>}
				{!label && inputText && <p className="input-text">{inputText}</p>}
				{label && <div>{label}</div>}
			</div>
		</div>
	)
}

FormField.propTypes = propTypes

export default FormField