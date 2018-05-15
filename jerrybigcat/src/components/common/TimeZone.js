import React from 'react'
import PropTypes from 'prop-types'

import {Dropdown, MenuItem} from '../m1ui'

const getTimeZoneLabel = (item) => {
	const hourPrefix = item.time_lag_hour >= 0 ? '+' : '-'
	const hour = hourPrefix + Math.abs(item.time_lag_hour)
	const min = Math.abs(item.time_lag_min)
	const minute = min < 10 ? ('0' + min) : min
	return `(UTC${hour}: ${minute}) ${item.time_lag_name}`
}

const TimeZone = ({list, timeZone, onSelect}) => {
	let timeZoneLabel = '请选择时区'
	if(list.length > 0) {
		const timeZoneItem = list.find(item => item.time_zone_id === timeZone)
		if(timeZoneItem){
			timeZoneLabel =  getTimeZoneLabel(timeZoneItem)
		}
	}
	return (
		<Dropdown
			title={timeZoneLabel}
			icon="map"
			className="m1-dropdown-form time-zone"
		>
			{list.map((item, i) => {
				return (
					<MenuItem 
						key={i} 
						eventKey={item.time_zone_id} 
						onSelect={onSelect} 
					>
						{getTimeZoneLabel(item)}
					</MenuItem>
				)
			})
			}
		</Dropdown>
	)
}

export default TimeZone