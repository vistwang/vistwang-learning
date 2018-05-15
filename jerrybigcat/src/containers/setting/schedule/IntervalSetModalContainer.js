import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { actions as scheduleActions } from '../../../reducers/setting/schedule'
import { actions } from '../../../reducers/setting/scheduleSetting'
import { actions as intervalActions } from '../../../reducers/setting/scheduleInterval'
import IntervalSetModal from '../../../components/setting/schedule/IntervalSetModal'


class IntervalSetModalContainer extends Component {
	handleSaveInterval = () =>{
		const {weekDay, sDayClassify,
		sHour,
		sMinute,
		eDayClassify,
		eHour,
		eMinute,} = this.props

		const startHour = sDayClassify === 'pm' ? (parseInt(sHour) + 12) : sHour
		const endHour = eDayClassify === 'pm' ? (parseInt(eHour) + 12) : eHour

		const interval = `${startHour}:${sMinute}|${endHour}:${eMinute}`
		this.props.saveInterval(interval,weekDay)
	}

	getWeekDayIntervals = () => {
		const { weekDay, schedule_week } = this.props
		const weekdayIntervals = schedule_week[weekDay].map(val => {
			const intervalArr = val.split('|')
			const startTime = intervalArr[0].split(':')
			const endTime = intervalArr[1].split(':')
			const startHour = parseInt(startTime[0])
			const endHour = parseInt(endTime[0])
			const sDayClassify = startHour > 12 ? 'pm' : 'am'
			const eDayClassify = endHour > 12 ? 'pm' : 'am'
			const sHour = startHour > 12 ? (startHour - 12) : startHour
			const eHour = endHour > 12 ? (endHour - 12) : endHour
			const interval = {
				sDayClassify,
				sHour,
				sMinute: startTime[1],
				eDayClassify,
				eHour,
				eMinute: endTime[1]
			}
			return interval
		})


		return weekdayIntervals
	}

	render() {
		const { intervalSettingModal, showIntervalModal, showSettingModal, removeInterval, ...props } = this.props



		return (
			<IntervalSetModal 
				{...props}
				show={intervalSettingModal}
				onClose={e => {
					showIntervalModal(false)
					showSettingModal(true)
				}}
				intervals={this.getWeekDayIntervals()}
				onSAmPm={classify => props.updateSDayClassify(classify)}
				onSHour={hour => props.updateSHour(hour)}
				onSMinute={minute => props.updateSMinute(minute)}
				onEAmPm={classify => props.updateEDayClassify(classify)}
				onEHour={hour => props.updateEHour(hour)}
				onEMinute={minute => props.updateEMinute(minute)}
				onSaveInterval={this.handleSaveInterval}
				onRemoveInterval={removeInterval}
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
		scheduleSettingModal,
		intervalSettingModal,
	} = state.schedule.scheduleGlobal

	const {
		weekDay,
		sDayClassify,
		sHour,
		sMinute,
		eDayClassify,
		eHour,
		eMinute,
	} = state.schedule.scheduleInterval

	return {
		title,
		schedule_id,
		time_zone,
		schedule_week,
		schedule_festival,

		scheduleSettingModal,
		intervalSettingModal,

		weekDay,
		sDayClassify,
		sHour,
		sMinute,
		eDayClassify,
		eHour,
		eMinute,
	}
}

const mapDispatchToProps = (dispatch) => ({
	updateTitle: bindActionCreators(actions.updateTitle, dispatch),
	updateTimeZone: bindActionCreators(actions.updateTimeZone, dispatch),
	updateWeek: bindActionCreators(actions.updateWeek, dispatch),
	saveInterval: bindActionCreators(actions.saveInterval, dispatch),
	removeInterval: bindActionCreators(actions.removeInterval, dispatch),

	showSettingModal: bindActionCreators(scheduleActions.showSettingModal, dispatch),
	showIntervalModal: bindActionCreators(scheduleActions.showIntervalModal, dispatch),

	updateSDayClassify: bindActionCreators(intervalActions.updateSDayClassify, dispatch),
	updateSHour: bindActionCreators(intervalActions.updateSHour, dispatch),
	updateSMinute: bindActionCreators(intervalActions.updateSMinute, dispatch),
	updateEDayClassify: bindActionCreators(intervalActions.updateEDayClassify, dispatch),
	updateEHour: bindActionCreators(intervalActions.updateEHour, dispatch),
	updateEMinute: bindActionCreators(intervalActions.updateEMinute, dispatch),
	setWeekDay: bindActionCreators(intervalActions.setWeekDay, dispatch),
	resetInterval: bindActionCreators(intervalActions.resetInterval, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(IntervalSetModalContainer)