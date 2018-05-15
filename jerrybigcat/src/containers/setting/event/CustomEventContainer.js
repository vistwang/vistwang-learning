import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { actions } from '../../../reducers/setting/event'
import { actions as setActions } from '../../../reducers/setting/eventSetting'

import { Button, Pagination, Icon, Colors } from '../../../components/m1ui'

import ButtonIcon from '../../../components/common/ButtonIcon'
import InputSearch from '../../../components/common/InputSearch'
import EventTable from '../../../components/setting/event/EventTable'
import EventModalContainer from './EventModalContainer'
import InstallCodeModalContainer from './InstallCodeModalContainer'

class CustomEventContainer extends Component {
	componentDidMount() {
		if(this.props.eventList.length === 0) {
			this.props.reqEventList()
		}
	}

	handleOpenCreate = e => {
		this.props.resetEvent()
		this.props.showEventSettingModal(true)
	}

	handleCloseCreate = e => {
		this.props.showEventSettingModal(false)
	}

	handleOpenInstall = e => {
		this.props.showEventInstallModal(true)
	}

	handleCloseInstall = e => {
		this.props.showEventInstallModal(false)
	}

	handleEditEvent = (id) => {
		const eventItem = this.props.eventList.find(item => item.id === id)
		this.props.resetEvent(eventItem)
		this.props.showEventSettingModal(true)
	}

	handleGetSearchList = (eventList) => {
		const reg = new RegExp(this.props.searchKey)
		return eventList.filter(item => (item.name.match(reg) || item.description.match(reg)))
	}

	render() {
		const {eventSettingModal, eventInstallModal, reqRemoveEvent, searchKey, eventList, ...props} = this.props
		const showEventList = searchKey === '' ? eventList : this.handleGetSearchList(eventList)
		return (
			<div className="m1-right">
				<div className="m1-panel">
					<div className="m1-panel-header">
						<h2>自定义事件</h2>
					</div>
					<div className="m1-panel-content">
						<div className="m1-row top-opaction">
							<Button color={Colors.PRIMARY} onClick={this.handleOpenCreate} ><Icon name="add-to" /> 创建自定义事件</Button>
							<InputSearch placeholder="搜索自定义事件" value={searchKey} onChange={e => props.updateSearchKey(e.target.value)} />
						</div>
						<div className="m1-row event-list-container">
							<EventTable 
								{...props} 
								eventList={showEventList}
								onRemove={reqRemoveEvent}
								onEdit={this.handleEditEvent}
							/>
						</div>
					</div>
				</div>
				<EventModalContainer 
					show={eventSettingModal}
					onClose={this.handleCloseCreate}
					onOpenInstall={this.handleOpenInstall}
				/>
				<InstallCodeModalContainer 
					show={eventInstallModal}
					onClose={this.handleCloseInstall}
				/>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	const {
		eventSettingModal, 
		eventInstallModal, 
		eventList, 
		searchKey,
	} = state.event.eventGlobal

	return {
		eventSettingModal, 
		eventInstallModal,
		eventList,
		searchKey,
	}
}

const mapDispatchProps = (dispatch) => ({
	showEventSettingModal: bindActionCreators(actions.showEventSettingModal, dispatch),
	showEventInstallModal: bindActionCreators(actions.showEventInstallModal, dispatch),
	reqEventList: bindActionCreators(actions.reqEventList, dispatch),
	reqRemoveEvent: bindActionCreators(actions.reqRemoveEvent, dispatch),
	updateSearchKey: bindActionCreators(actions.updateSearchKey, dispatch),
	resetEvent: bindActionCreators(setActions.resetEvent, dispatch),
})

export default connect(mapStateToProps, mapDispatchProps)(CustomEventContainer)
