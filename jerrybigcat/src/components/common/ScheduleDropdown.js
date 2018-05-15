import React from 'react'
import PropTypes from 'prop-types'

import {Dropdown, MenuItem} from '../m1ui'

const ScheduleDropdown = ({list, scheduleId, onSelect}) => {
	const schedule = list.find(item => item.schedule_id === scheduleId) || {}
	return (
		<Dropdown
			title={schedule.schedule_name || '请选择工作时间段'}
			className="m1-dropdown-form"
		>
			{list.map((item, i) => {
				return (
					<MenuItem 
						key={i} 
						eventKey={item.schedule_id} 
						onSelect={onSelect} 
					>
						{item.schedule_name || '未命名时间表'}
					</MenuItem>
				)
			})
			}
		</Dropdown>
	)
}

ScheduleDropdown.propTypes = {
	list: PropTypes.array,
	scheduleId: PropTypes.number,
	onSelect: PropTypes.func
}
ScheduleDropdown.defaultProps = {
	list: [],
	scheduleId: 0
}

export default ScheduleDropdown