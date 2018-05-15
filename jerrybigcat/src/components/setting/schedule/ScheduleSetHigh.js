import React from 'react'
import PropTypes from 'prop-types'

import { Switch, Button, Icon, Colors } from '../../m1ui'
import FestivalHoliday from './FestivalHoliday'

const ScheduleSetHigh = (props) => {
	return (
		<div className="schedule-set-high">
			<h2><Icon name="set-up-thin" /> 高级设置</h2>
			<div className="set-high-content">
				<p><Switch checked={props.isFestival} onChange={props.onIsFestival} /> 排除节假日</p>
				{props.isFestival && <p>开启排除节假日后，系统自动发送的邮件在所选的节假日时间段内不发送</p>}
				{props.isFestival && <FestivalHoliday
									{...props}
								/>}
			</div>
		</div>
	)
}

export default ScheduleSetHigh