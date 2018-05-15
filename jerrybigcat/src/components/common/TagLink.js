import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Icon } from '../m1ui'
import ButtonIcon from './ButtonIcon'

const TagLink = ({className, icon, closable, onClose, children, ...props}) => {
	return (
		<span 
			{...props}
			className={classnames('tag-link', className)}
		>
			<ButtonIcon name={icon || 'link-text'} />
			<span className="tag-link-label">
				{children}
			</span>
			{closable && <i className="m1-tag-close" onClick={onClose} ></i>}
		</span>
	)
}

TagLink.propTypes = {
	icon: PropTypes.string,
	closable: PropTypes.bool,
	onClose: PropTypes.func,
}

export default TagLink
