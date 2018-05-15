import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Icon } from '../m1ui'

const ButtonIcon = ({className, name, children, ...props}) => {
	return (
		<span 
			{...props}
			className={classnames('btn-icon', className)}
		>
			<Icon name={name} />
			{children}
		</span>
	)
}

ButtonIcon.propTypes = {
	name: PropTypes.string.isRequired
}

export default ButtonIcon
