import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const propTypes = {
	on: PropTypes.bool,
	start: PropTypes.bool
}

const Moment = ({on, start, ...props}) => {
	return (
		<span className={classnames(
				{on: on},
				{start: start}
			)} ></span>
	)
} 

export default Moment