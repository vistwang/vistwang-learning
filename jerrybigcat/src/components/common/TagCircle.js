import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const propTypes = {
	color: PropTypes.string
}

const TagCircle = ({color, className, children, ...props}) => {
	const profix = 'm1-tag-circle'
	return (
		<span
		{...props}
			className={classnames(
				profix,
				color ? profix + '-' + color : null,
				className
			)}
		>
			{children}
		</span>
	)
}

TagCircle.propTypes = propTypes

export default TagCircle