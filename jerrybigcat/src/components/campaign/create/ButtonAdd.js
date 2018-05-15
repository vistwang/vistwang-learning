import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { Icon } from '../../m1ui'

const ButtonAdd = ({className, children, ...props}) => {
	return (
		<div 
			{...props}
			className={classnames(
				'btn-add',
				className
			)}
			>
			<Icon name="add-to"/>
			{children}
		</div>
	)
}

ButtonAdd.propTypes = {
	onAdd: PropTypes.func
}

export default ButtonAdd