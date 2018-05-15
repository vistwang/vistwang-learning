import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Picker from 'react-bootstrap-daterangepicker'

const propTypes = {
	showDropdowns: PropTypes.bool,
	startDate: PropTypes.object,
	endDate: PropTypes.object,
	ranges: PropTypes.object,
	locale: PropTypes.object,
	onApply: PropTypes.func,
}

const defaultProps = {
	showDropdowns: true,
	startDate: moment().subtract(6, 'days'),
	endDate: moment(),
	ranges: {
		'今天': [moment(), moment()],
		'昨天': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
		'最近7天': [moment().subtract(6, 'days'), moment()],
		'最近30天': [moment().subtract(29, 'days'), moment()],
		'本月': [moment().startOf('month'), moment().endOf('month')],
		'上月': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
	},
	locale: {
		format: 'YYYY-MM-DD',
		applyLabel: '确定',
		cancelLabel: '取消',
		customRangeLabel: '自定义',
		daysOfWeek: ['日','一','二','三','四','五','六'],
		monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
	}
}

const DateRangePicker = ({onApply, children, ...props}) => {
	return (
		<Picker
			{...props}
			applyClass="m1-btn m1-btn-primary"
			cancelClass="m1-btn"
			onApply={onApply}
		>
			{children}
		</Picker>
	)
}

DateRangePicker.propTypes = propTypes
DateRangePicker.defaultProps = defaultProps

export default DateRangePicker