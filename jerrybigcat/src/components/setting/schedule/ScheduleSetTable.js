import React from 'react'
import PropTypes from 'prop-types'

import { SysMail } from '../../../base/system'
import ScheduleSetRow from './ScheduleSetRow'

const weeks = SysMail.weeks

const TableHeadTimeline = () => {
	const moments = []
	for(let i = 0; i < 24; i++) {
		moments.push(<span key={i}><em>{i}</em></span>)
	}

	return (
		<div className="timeline table-head">
			{moments}
		</div>
	)
}

const ScheduleSetTable = ({schedule_week, ...props}) => {
	let weekRows = []
	weeks.forEach((item, i) => {
		weekRows.push(
			<ScheduleSetRow 
				{...props}
				key={item.name} 
				name={item.name}
				title={item.label} 
				scheduleWeek={schedule_week[item.name]} 
			/>)
		if(item.name !== 'saturday') {
			weekRows.push(<ScheduleSetRow key={i} isEmpty />)
		}
	})

	return (
		<div className="schedule-set-table">
			<table className="m1-table">
				<thead>
					<tr>
						<td></td>
						<td>
							<TableHeadTimeline />
						</td>
						<td></td>
					</tr>
				</thead>
				<tbody>
					{weekRows}
				</tbody>
			</table>
		</div>
	)
}

export default ScheduleSetTable