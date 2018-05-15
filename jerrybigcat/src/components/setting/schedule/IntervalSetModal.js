import React from 'react'
import PropTypes from 'prop-types'

import {Modal, Button, Icon, Colors} from '../../m1ui'
import TimeZone from '../../common/TimeZone'
import TimePicker from '../../common/TimePicker'
import ScheduleSetTableContainer from '../../../containers/setting/schedule/ScheduleSetTableContainer'
import ScheduleSetHigh from './ScheduleSetHigh'

import { SysMail } from '../../../base/system'


const { Header, Title, Body, Footer } = Modal

const IntervalSetModal = ({show, onClose, ...props}) => {
	return (
		<Modal
			show={show}
			onClose={onClose}
			style={{width: '710px'}}
		>
			<Header>
				<Title>
					设置时间段
				</Title>
			</Header>
			<Body>
				<div className="container">
					<div className="m1-row">
						<h3>已选时间段</h3>
						<ul className="time-selector-list">
							{props.intervals.map((item, i) =>{
								return (
									<li key={i}>
										<span>{SysMail.filter.weeks[props.weekDay]}</span>
										<span>{item.sDayClassify}</span>
										<span>{item.sHour}:{item.sMinute}</span>
										<span>-</span>
										<span>{item.eDayClassify}</span>
										<span>{item.eHour}:{item.eMinute}</span>
										<span className="operation">
											<Icon name='delete-o' onClick={e => props.onRemoveInterval(props.weekDay, i)} />
										</span>
									</li>
								)
							})}
						</ul>
					</div>
					<div className="m1-row">
						<h3>添加新时间段</h3>
						<div className="time-selector">
							<TimePicker 
								ampm={props.sDayClassify}
								hour={props.sHour}
								minute={props.sMinute}
								onAmPm={props.onSAmPm}
								onHour={props.onSHour}
								onMinute={props.onSMinute}
							/>
							{' —— '}
							<TimePicker 
								ampm={props.eDayClassify}
								hour={props.eHour}
								minute={props.eMinute}
								onAmPm={props.onEAmPm}
								onHour={props.onEHour}
								onMinute={props.onEMinute}
							/>
						</div>
					</div>
				</div>
			</Body>
			<Footer>
				<Button color={Colors.PRIMARY} onClick={props.onSaveInterval} >确认添加</Button>
			</Footer>
		</Modal>
	)
}

export default IntervalSetModal