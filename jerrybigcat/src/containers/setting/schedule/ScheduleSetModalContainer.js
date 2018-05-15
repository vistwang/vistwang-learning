import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { actions as globalActions } from '../../../reducers/setting'
import { actions as scheduleActions } from '../../../reducers/setting/schedule'
import { actions } from '../../../reducers/setting/scheduleSetting'
import ScheduleSetModal from '../../../components/setting/schedule/ScheduleSetModal'


class ScheduleSetModalContainer extends Component {
	componentDidMount() {
		if(this.props.timeZones.length === 0) {
			this.props.reqTimeZone()
		}
	}
	handleSaveScheule = () => {
		const {
			title,
			schedule_id,
			time_zone,
			schedule_week,
			schedule_festival,
		} = this.props

		let week = {}
		for(let w in schedule_week) {
			week[w] = schedule_week[w].join(',')
		}
		const festival = schedule_festival.join(',')

		let schedule = {
			schedule_name: title,
			time_zone,
			schedule_week: JSON.stringify(week),
			schedule_festival: festival,
		}

		if(schedule_id) {
			schedule.schedule_id = schedule_id
		}

		this.props.saveSchedule(schedule)
	}

	render() {
		const { scheduleSettingModal, showSettingModal, ...props } = this.props
		return (
			<ScheduleSetModal 
				{...props}
				show={scheduleSettingModal}
				onClose={e => showSettingModal(false)}
				onChangeTitle={e => props.updateTitle(e.target.value)}
				onSaveSchedule={this.handleSaveScheule}
				onSelectTimeZone={v => props.updateTimeZone(v)}
			/>
		)
	}
}

const mapStateToProps = (state) => {
	const {
		title,
		schedule_id,
		time_zone,
		schedule_week,
		schedule_festival,
	} = state.schedule.scheduleSetting

	const {
		scheduleSettingModal
	} = state.schedule.scheduleGlobal


	return {
		title,
		schedule_id,
		time_zone,
		schedule_week,
		schedule_festival,

		scheduleSettingModal,

		timeZones: state.globalState.timeZones
	}
}

const mapDispatchToProps = (dispatch) => ({
	updateTitle: bindActionCreators(actions.updateTitle, dispatch),
	updateTimeZone: bindActionCreators(actions.updateTimeZone, dispatch),
	updateWeek: bindActionCreators(actions.updateWeek, dispatch),
	saveSchedule: bindActionCreators(actions.saveSchedule, dispatch),
	showSettingModal: bindActionCreators(scheduleActions.showSettingModal, dispatch),
	reqTimeZone: bindActionCreators(globalActions.reqTimeZone, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleSetModalContainer)