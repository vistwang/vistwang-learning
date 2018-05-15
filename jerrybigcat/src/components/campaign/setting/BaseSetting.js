import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TimeZone from '../../common/TimeZone'
import ScheduleDropdown from '../../common/ScheduleDropdown'

class BaseSetting extends Component {

	render() {
		const {interval, sendMax, timeZone, timeZones, schedules, scheduleId, ...props } = this.props
		return (
			<div className="container" >
				<div className="setting-header">
					<h2>基本设置</h2>
					<h4 className="subtitle">针对营销活动可选择性设置包括自动营销活动的结束时间、但封邮件发送的时间及每天对同一邮箱的最大发送量设置</h4>
				</div>
				<div className="setting-content">
					<h3>每封邮件发送的间隔时间</h3>
					<dl>
						<dt><input type="number" value={interval} onChange={props.onInterval} /> 秒</dt>
						<dd>依照业务需求配置，合理设置可保护您的发送账号不被邮件服务商限制发送，该设置仅用于本次营销活动，优先级高级系统全局的“邮件设置”。</dd>
					</dl>
					<h3>每天对同一邮箱的最大发送量</h3>
					<dl>
						<dt><input type="number" value={sendMax} onChange={props.onSendMax} /> 封</dt>
						<dd>依照业务需求配置，合理设置可保护您的发送账号不被邮件服务商限制发送，该设置仅用于本次营销活动，优先级高级系统全局的“邮件设置”。</dd>
					</dl>
					<h3>时区/时间段</h3>
					<div className="setting-time">
						<div className="time-area">
							<label>当前使用时区</label> <TimeZone list={timeZones} timeZone={timeZone} onSelect={props.onTimeZone} />
						</div>
						<div className="time-slot">
							<ScheduleDropdown
								scheduleId={scheduleId}
								list={schedules}
								onSelect={props.onSchedule}
							/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default BaseSetting