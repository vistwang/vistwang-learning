import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { actions } from '../../../reducers/setting/scheduleSetting'
import ScheduleSetHigh from '../../../components/setting/schedule/ScheduleSetHigh'


class ScheduleSetHighContainer extends Component {


	render() {
		const { schedule_festival, ...props } = this.props
		return (
			<ScheduleSetHigh 
				{...props}
				festivals={schedule_festival}
				onAddFestival={props.addFestival}
				onRemoveFestival={props.removeFestival}
				onIsFestival={e => props.updateIsFestival(!props.isFestival)}
			/>
		)
	}
}

const mapStateToProps = (state) => {
	const {
		schedule_id,
		schedule_festival,
		isFestival,
	} = state.schedule.scheduleSetting

	return {
		schedule_id,
		schedule_festival,
		isFestival,
	}
}

const mapDispatchToProps = (dispatch) => ({
	addFestival: bindActionCreators(actions.addFestival, dispatch),
	removeFestival: bindActionCreators(actions.removeFestival, dispatch),
	updateIsFestival: bindActionCreators(actions.updateIsFestival, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleSetHighContainer)