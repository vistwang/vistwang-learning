import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { SysContact } from '../../../base/system'
import { actions } from '../../../reducers/setting/eventSetting'
import EventModal from '../../../components/setting/event/EventModal'

const sampleEvents = SysContact.sampleEvents

const propTypes = {
	show: PropTypes.bool,
	onClose: PropTypes.func,
	onOpenInstall: PropTypes.func,
}

class EventModalContainer extends Component {
	handleConfirm = (e) => {
		if(this.props.settingStep === 1) {
			this.props.updateSettingStep(2)
		} else {
			// const filterEvents = this.props.addEvents.filter(item => (item.uniqueId.trim() !== '' && item.name.trim() !== ''))
			// if(filterEvents.length > 0) {
			// 	filterEvents.forEach((item) => {
			// 		if(!item.id) {
			// 			delete item.id
			// 		} else {
			// 			// item.id = 
			// 		}
			// 		this.props.saveEvent(item)
			// 	})
			// }
			this.props.onClose()
			this.props.onOpenInstall()
		}
	}

	submitEvent = (item, index) => {
		if(item.uniqueId.trim() !== '' && item.name.trim() !== '' && item.type !== '') {
			let id = item.id
			delete item.id
			this.props.saveEvent(item, id, index)
		}
	}

	handleChangeLazy = (item, index) => {
		this.submitEvent(item, index)
	}

	handleUseSample = (item) => {
		const index = this.props.addEvents.length
		this.props.addEvent(item)
		this.submitEvent(item, index)
	}

	render() {
		const { settingStep, ...props } = this.props
		return (
			<EventModal
				{...props}
				step={settingStep}
				sampleEvents={sampleEvents}
				onConfirm={this.handleConfirm}
				onChangeLazy={this.handleChangeLazy}
				onUpdateEvent={props.updateEvent}
				onAddEvent={props.addEvent}
				onEventTab={props.updateEventTab}
				onUseSample={this.handleUseSample}
			/>
		)
	}
}

EventModalContainer.propTypes = propTypes

const mapStateToProps = (state) => {
	const {settingStep, addEvents, customEventTab} = state.event.eventSetting
	return {
		settingStep, 
		addEvents,
		customEventTab,
	}
}

const mapDispatchProps = (dispatch) => ({
	updateSettingStep: bindActionCreators(actions.updateSettingStep, dispatch),
	updateEventTab: bindActionCreators(actions.updateEventTab, dispatch),
	addEvent: bindActionCreators(actions.addEvent, dispatch),
	updateEvent: bindActionCreators(actions.updateEvent, dispatch),
	saveEvent: bindActionCreators(actions.saveEvent, dispatch),
})

export default connect(mapStateToProps, mapDispatchProps)(EventModalContainer)