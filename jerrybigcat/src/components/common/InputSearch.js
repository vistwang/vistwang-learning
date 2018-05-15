import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { Icon } from '../m1ui'

const propTypes = {
	right: PropTypes.bool,
	circle: PropTypes.bool
}

const InputSearch = ({className, circle, right, ...props}) => {
	return (
		<div className={classnames(
			(circle ? 'm1-input-group' : 'm1-input-group-form'),
			className,
			{'right': right}
			)}>
     	<Icon name="search" />
      <input
      	{...props}
      />
    </div>
	)
}

InputSearch.propTypes = propTypes

export default InputSearch