import React from 'react'
import PropTypes from 'prop-types'

const EmailSafe = ({countDaily, onCountDaily}) => {
	return (
		<div className="m1-form-row email-safe">
			<input type="number" onChange={onCountDaily} value={countDaily} /> 封 （不能超过400封/天）
		</div>
	)
}

export default EmailSafe 