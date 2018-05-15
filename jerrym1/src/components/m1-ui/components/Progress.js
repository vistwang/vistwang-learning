import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { classNames } from '../utils'


class Progress extends Component {

	render() {
		const { className, dynamic, value } = this.props 

		const baseClassName = dynamic ? 'm1-progress-dynamic' : 'm1-progress'
		const fullClassName = classNames(baseClassName, className)
		let percentage = value ? parseInt(value) : 0
		percentage = percentage > 100 ? 100 : percentage
		percentage = percentage < 0 ? 0 : percentage
		const style = {width: percentage + '%'}

		return (
			<div className={fullClassName}>
              <div className="m1-progress-bar" style={style}></div>
            </div>
		)
	}
}
Progress.propTypes = {
	value: PropTypes.string,
	dynamic: PropTypes.bool
}

export default Progress