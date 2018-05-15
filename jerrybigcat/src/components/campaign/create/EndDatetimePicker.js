import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import DateRangePicker from 'react-bootstrap-daterangepicker'

import { Icon, Dropdown, MenuItem } from '../../m1ui'

const DateFormat = 'YYYY-MM-DD hh:mm'
const defaultStartDate = moment().subtract(6, 'days')
const defaultEndDate = moment()

class EndDatetimePicker extends Component {
	constructor(props) {
		super(props)

		this.state = {
			ranges: {
				'今天': [moment(), moment()],
				'昨天': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
				'最近7天': [moment().subtract(6, 'days'), moment()],
				'最近30天': [moment().subtract(29, 'days'), moment()],
				'本月': [moment().startOf('month'), moment().endOf('month')],
				'上月': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
			},
			locale: {
				format: DateFormat,
				applyLabel: '确定',
				cancelLabel: '取消',
				customRangeLabel: '自定义',
				daysOfWeek: ['日','一','二','三','四','五','六'],
				monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
			},
			startDate: defaultStartDate,
			endDate: defaultEndDate
		}
	}

	handlePickerApply = (e, picker) => {
		this.setState({
			startDate: picker.startDate,
			endDate: picker.endDate
		})
	}

	render() {
		const { ranges, startDate, endDate, locale } = this.state
		return (
			<span>
				<Dropdown title={startDate.format(DateFormat)}>
					<MenuItem>1111</MenuItem>
					<MenuItem>2222</MenuItem>
					<MenuItem>3333</MenuItem>
					<MenuItem>
						<DateRangePicker
							singleDatePicker={true}
							showDropdowns={true}
							// timePicker={true}
							// timePicker24Hour={true}
							applyClass="m1-btn m1-btn-primary"
							cancelClass="m1-btn"
							startDate={startDate}
							endDate={endDate}
							ranges={ranges}
							locale={locale}
							onApply={this.handlePickerApply}
						>
							<span>
								<Icon name="calendar" /> <span>custom</span>
							</span>
						</DateRangePicker>
					</MenuItem>
				</Dropdown>
			</span>
		)
	}
}

export default EndDatetimePicker