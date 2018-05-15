import React from 'react'
import PropTypes from 'prop-types'

import {Modal, Button, Colors} from '../../m1ui'
import TimeZone from '../../common/TimeZone'
import ScheduleSetTableContainer from '../../../containers/setting/schedule/ScheduleSetTableContainer'
import ScheduleSetHighContainer from '../../../containers/setting/schedule/ScheduleSetHighContainer'

const { Header, Title, Body, Footer } = Modal

const ScheduleSetModal = ({show, onClose, ...props}) => {
	return (
		<Modal
			show={show}
			onClose={onClose}
			style={{width: '810px'}}
		>
			<Header>
				<Title>
					添加新的时间表
				</Title>
			</Header>
			<Body>
				<div className="container">
					<div className="schedule-set-head">
						<input placeholder="新的时间表" value={props.title} onChange={props.onChangeTitle} />
						<TimeZone 
							list={props.timeZones}
							timeZone={props.time_zone}
							onSelect={props.onSelectTimeZone}
						/>
					</div>
					<ScheduleSetTableContainer />
					<ScheduleSetHighContainer />
				</div>
			</Body>
			<Footer>
				<Button onClick={onClose}>取消</Button>
				<Button color={Colors.PRIMARY} onClick={props.onSaveSchedule} >保存修改</Button>
			</Footer>
		</Modal>
	)
}

export default ScheduleSetModal