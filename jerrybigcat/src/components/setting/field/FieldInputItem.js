import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const propTypes = {
	label: PropTypes.string
}

const FieldInputItem = ({label, error, className, ...props}) => {
	return (
		<div className="m1-form-row">
			<label className="m1-form-label">{label}</label>
			<div className="m1-form-content">
				<input 
					{...props} 
					className={classnames(
						'm1-form-input',
						className,
						{error: error}
					)}
				/>
				{error && <div className="form-error">{error}</div>}
			</div>
		</div>
	)
}

export default FieldInputItem