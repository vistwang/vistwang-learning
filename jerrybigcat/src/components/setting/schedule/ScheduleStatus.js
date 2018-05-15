import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Icon } from '../../m1ui'

const propTypes = {
	isUsing: PropTypes.bool
}

const ScheduleStatus = ({isUsing, ...props}) => {
	return (
		<span className={classnames(
				'schedule-status',
				{using: isUsing}
			)} >
			<Icon name="circle" />
			{' '}
			{isUsing ? '使用中' : '未使用'}
		</span>
	)
}	

ScheduleStatus.propTypes = propTypes

export default ScheduleStatus