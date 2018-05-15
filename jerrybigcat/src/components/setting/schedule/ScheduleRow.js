import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { SysMail } from '../../../base/system'
import ScheduleStatus from './ScheduleStatus'
import Timeline from './Timeline'
import ButtonIcon from '../../common/ButtonIcon'

const weeks = SysMail.weeks

const propTypes = {
	useScheduleId: PropTypes.number,
	schedule: PropTypes.object,
}

const defaultProps = {
	useScheduleId: 0
}

const ScheduleRow = ({schedule, useScheduleId, ...props}) => {
	
	return (
		<tr>
			<td>{schedule.schedule_name}</td>

			{weeks.map((item, i) => {
				const schedule_week = JSON.parse(schedule.schedule_week)
				const week = schedule_week[item.name]
				const scheduleWeek = week.trim() === '' ? [] : week.split(',') 
				return (
					<td key={i} >
						<Timeline scheduleWeek={scheduleWeek} />
					</td>
				)
			})}
			
			<td>{schedule.default ? <span>默认</span> : <a className="schedule-set-default" onClick={e => props.onSettingDefault(schedule.schedule_id)} >设为默认</a>}</td>
			<td><ScheduleStatus isUsing={useScheduleId === schedule.schedule_id} /></td>
			<td><div className="item-operation">
				<ButtonIcon name="edit-o" onClick={e => props.onEdit(schedule.schedule_id)} />
				<ButtonIcon name="delete-o" onClick={e => props.onRemove(schedule.schedule_id)} />
			</div></td>
		</tr>
	)
}

ScheduleRow.propTypes = propTypes
ScheduleRow.defaultProps = defaultProps

export default ScheduleRow