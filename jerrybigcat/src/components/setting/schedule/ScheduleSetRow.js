import React from 'react'
import PropTypes from 'prop-types'

import { Checkbox, Icon } from '../../m1ui'
import Timeline from './Timeline'

const propTypes = {
	isEmpty: PropTypes.bool,
	title: PropTypes.string
}


const TimelineEmpty = () => {
	const moments = []
	for(let i = 0; i < 24; i++) {
		moments.push(<span key={i}></span>)
	}
	return (<div className="timeline grid">
						{moments}
					</div>)
}

const ScheduleSetRow = ({isEmpty, title, name, scheduleWeek, onFullDay, onShowInterval, ...props}) => {
	return (
		<tr>
			<td>
				{!isEmpty && <Checkbox onChange={e => onFullDay(name)} checked={scheduleWeek.indexOf('0:00|24:00') >= 0} >{title}</Checkbox>}
			</td>
			<td>
				{!isEmpty && <Timeline className="deep" scheduleWeek={scheduleWeek} />}
				{isEmpty && <TimelineEmpty />}
			</td>
			<td>
				{!isEmpty && <Icon name="set-up" onClick={e => onShowInterval(name)} />}
			</td>
		</tr>
	)
}

ScheduleSetRow.propTypes = propTypes

export default ScheduleSetRow	