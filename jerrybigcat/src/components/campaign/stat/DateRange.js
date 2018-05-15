import React from 'react'
import PropTypes from 'prop-types'
import DateRangePicker from '../../common/DateRangePicker'
import moment from 'moment'

import { Dropdown, MenuItem, Icon } from '../../m1ui'

const DateFormat = 'YYYY-MM-DD'

const getTimeZoneLabel = (item) => {
	const hourPrefix = item.time_lag_hour >= 0 ? '+' : '-'
	const hour = hourPrefix + Math.abs(item.time_lag_hour)
	const min = Math.abs(item.time_lag_min)
	const minute = min < 10 ? ('0' + min) : min
	return `(UTC${hour}: ${minute}) ${item.time_lag_name}`
}

const DateRange = ({onApply, startDate, endDate, timeZone}) => {
	const sd = moment(startDate).format(DateFormat)
	const ed = moment(endDate).format(DateFormat)
	const timeLabel = sd + ' ~ ' + ed

	return (
		<div className="container stat-range">
			<DateRangePicker
				startDate={moment(startDate)}
				endDate={moment(endDate)}
				onApply={onApply}
			>
				<span className="date-picker">
					<Icon name="calendar" /> {timeLabel} <Icon name="unfold-down" />
				</span>
			</DateRangePicker>

			<span className="time-zone">
				<Icon name="map" /> {timeZone ? timeZone.title : '(UTC+8: 00) 中国时间-北京'}
			</span>
		</div>
	)
}

export default DateRange