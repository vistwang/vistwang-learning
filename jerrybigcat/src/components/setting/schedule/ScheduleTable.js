import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import ScheduleRow from './ScheduleRow'

const propTypes = {
	isChecked: PropTypes.bool
}

const ScheduleTable = ({scheduleList, ...props}) => {
	return (
		<div className="container schedule-table">
			<table className="m1-table">
				<thead>
					<tr>
						<th></th>
						<th>周日</th>
						<th>周一</th>
						<th>周二</th>
						<th>周三</th>
						<th>周四</th>
						<th>周五</th>
						<th>周六</th>
						<th></th>
						<th></th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{scheduleList.map((item, i) => (
						<ScheduleRow 
							{...props}
							key={i} 
							schedule={item} 
						/>
					))}
				</tbody>
			</table>
		</div>
	)
}

ScheduleTable.propTypes = propTypes

export default ScheduleTable