import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Icon } from '../m1ui'

const IconCircle = ({className, color, ...props}) => {
	return (
		<span 
			{...props}
			className={classnames(
				className,
				color
			)}
		>
			<Icon name="circle" />
		</span>
	)
}

IconCircle.propTypes = {
	color: PropTypes.string
}

export default IconCircle
