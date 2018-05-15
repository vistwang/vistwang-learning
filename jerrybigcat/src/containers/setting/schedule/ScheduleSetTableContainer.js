import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { actions as scheduleActions } from '../../../reducers/setting/schedule'
import { actions } from '../../../reducers/setting/scheduleSetting'
import { actions as intervalActions } from '../../../reducers/setting/scheduleInterval'
import ScheduleSetTable from '../../../components/setting/schedule/ScheduleSetTable'


class ScheduleSetTableContainer extends Component {
	handleFullDay = (weekDay) => {
		const { schedule_week } = this.props
		const scheduleDay = schedule_week[weekDay]
		const scheduleWeek = {
			...schedule_week,
			[weekDay]: scheduleDay.indexOf('0:00|24:00') < 0 ? ['0:00|24:00'] : []
		}
		this.props.updateWeek(scheduleWeek)
	}

	handleShowInterval = (weekDay) => {
		const { showSettingModal, showIntervalModal,resetInterval, schedule_week } = this.props

		const interval = {
			weekDay
		}

		resetInterval(interval)

		showSettingModal(false)
		showIntervalModal(true)
	}
	render() {
		const { intervalSettingModal, ...props } = this.props
		return (
			<ScheduleSetTable 
				{...props}
				onFullDay={this.handleFullDay}
				onShowInterval={this.handleShowInterval}
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

	return {
		title,
		schedule_id,
		time_zone,
		schedule_week,
		schedule_festival,

		scheduleSettingModal,
		intervalSettingModal,
	}
}

const mapDispatchToProps = (dispatch) => ({
	updateTitle: bindActionCreators(actions.updateTitle, dispatch),
	updateTimeZone: bindActionCreators(actions.updateTimeZone, dispatch),
	updateWeek: bindActionCreators(actions.updateWeek, dispatch),
	showSettingModal: bindActionCreators(scheduleActions.showSettingModal, dispatch),
	showIntervalModal: bindActionCreators(scheduleActions.showIntervalModal, dispatch),
	resetInterval: bindActionCreators(intervalActions.resetInterval, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleSetTableContainer)