import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const propTypes = {
	isChecked: PropTypes.bool
}

const PushTypeItem = ({isChecked, ...props}) => {
	return (
		<li 
			{...props}
			className={classnames({active: isChecked})} 
			>
			{props.children}
		</li>
	)
}

PushTypeItem.propTypes = propTypes

export default PushTypeItem