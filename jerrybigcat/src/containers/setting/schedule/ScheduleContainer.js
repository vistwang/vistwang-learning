import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'

import { actions } from '../../../reducers/setting/schedule'
import { actions as setActions } from '../../../reducers/setting/scheduleSetting'
import { actions as emailActions } from '../../../reducers/setting/email'

import { Button, Tag, Icon, Colors } from '../../../components/m1ui'

import ScheduleTable from '../../../components/setting/schedule/ScheduleTable'
import ScheduleSetModalContainer from './ScheduleSetModalContainer'
import IntervalSetModalContainer from './IntervalSetModalContainer'


class ScheduleContainer extends Component {
	componentDidMount() {
		if(this.props.scheduleList.length === 0) {
			this.props.reqScheduleList()
		}
		if(!this.props.account_id) {
			this.props.reqAccountSet()
		}
	}

	handleAddSchedule = e => {
		this.props.resetSchedule()
		this.props.showSettingModal(true)
	}

	handleCloseModal = e => {
		this.props.showSettingModal(false)
	}

	weekThanslateStrToArr = (week) => {
		let w = {}
		for(let key in week) {
			const interval = week[key]
			w[key] = interval !== '' ? interval.split(',') : []
		}
		return w
	}

	handleEditSchedule = (id) => {
		const { scheduleList } = this.props
		const schedule = scheduleList.find(item => item.schedule_id === id) 
		if(schedule) {
			const { schedule_festival, schedule_week } = schedule
			const festival = schedule_festival !== '' ? schedule_festival.split(',') : [] 
			const week = this.weekThanslateStrToArr(JSON.parse(schedule_week))
			const title = schedule.schedule_name || ''
			const currSchedule = {
				...schedule,
				title,
				schedule_week: week,
				schedule_festival: festival
			}


			this.props.resetSchedule(currSchedule)
			this.props.showSettingModal(true)
		}
	}

	render() {
		const { scheduleSettingModal, scheduleList, schedule_id, ...props } = this.props
		return (
			<div className="m1-right">
				<div className="m1-panel">
					<div className="m1-panel-header schedule-header">
						<h2>发送时间表</h2>
						<Button color={Colors.PRIMARY} onClick={this.handleAddSchedule} >添加时间表</Button>
					</div>
					<div className="m1-panel-content">
						<ScheduleTable 
							useScheduleId={schedule_id}
							scheduleList={scheduleList}
							onEdit={this.handleEditSchedule}
							onRemove={props.reqRemoveSchedule}
							onSettingDefault={props.reqSettingDefault}
						/>
					</div>
				</div>
				<ScheduleSetModalContainer />
				<IntervalSetModalContainer />
			</div>		
		)
	}
}

const mapStateToProps = (state) => ({
	account_id: state.email.account_id,
	schedule_id: state.email.schedule_id,
	scheduleSettingModal: state.schedule.scheduleGlobal.scheduleSettingModal,
	scheduleList: state.schedule.scheduleGlobal.scheduleList,
})

const mapDispatchToProps = (dispatch) => ({
	showSettingModal: bindActionCreators(actions.showSettingModal, dispatch),
	reqScheduleList: bindActionCreators(actions.reqScheduleList, dispatch),
	reqRemoveSchedule: bindActionCreators(actions.reqRemoveSchedule, dispatch),
	reqSettingDefault: bindActionCreators(actions.reqSettingDefault, dispatch),
	resetSchedule: bindActionCreators(setActions.resetSchedule, dispatch),
	reqAccountSet: bindActionCreators(emailActions.reqAccountSet, dispatch),
})

export default connect(mapStateToProps,mapDispatchToProps)(ScheduleContainer)