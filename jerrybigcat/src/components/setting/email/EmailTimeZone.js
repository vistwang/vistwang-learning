import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown, MenuItem } from '../../m1ui'

import TimeZone from '../../common/TimeZone'

const EmailTimeZone = (props) => {
	return (
		<div className="m1-row">
			<h3>时区设置</h3>
			<p>配置系统默认使用的时区</p>
			<div className="m1-panel-section time-zone">
				<label>当前使用时区：</label>
				<TimeZone list={props.timeZoneList} timeZone={props.timeZone} onSelect={props.onSelect} />
			</div>
		</div>
	)
}

export default EmailTimeZone