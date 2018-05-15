import React from 'react'
import PropTypes from 'prop-types'

import EventRow from './EventRow'

const EventTable = ({eventList, ...props}) =>{
	return (
		<table className="m1-table">
			<thead>
				<tr>
					<th>事件名称</th>
					<th>唯一ID</th>
					<th>描述</th>
					<th>创建者</th>
					<th>创建时间</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
			{eventList.map((item, i) => (
				<EventRow 
					{...props}
					key={i}
					item={item}
				/>
			))}
			</tbody>
		</table>
	)
}

export default EventTable