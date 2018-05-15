import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { actions as globalActions } from '../../../reducers/campaign'
import { actions } from '../../../reducers/campaign/campaignCreate'
import { actions as baseActions } from '../../../reducers/campaign/baseSetting'
import { actions as responseActions } from '../../../reducers/campaign/autoResponse'
import { actions as processActions } from '../../../reducers/campaign/campaignProcess'
import { actions as screeningActions } from '../../../reducers/campaign/screening'

import { SysContact } from '../../../base/system'
import { QueryScopes } from '../../../base/enums'

import { Button, Colors } from '../../../components/m1ui'

import ButtonAdd from '../../../components/campaign/create/ButtonAdd'
import EndCondition from '../../../components/campaign/create/EndCondition'
import AutoRespond from '../../../components/campaign/create/AutoRespond'
import BaseSetting from '../../../components/campaign/setting/BaseSetting'
import AutoResponseSetModalContainer from './AutoResponseSetModalContainer'

const queryScopes = SysContact.filter.queryScopes
const queryScopeGroups = queryScopes[QueryScopes.GROUP_NORMAL]
const queryScopeTags = queryScopes[QueryScopes.TAG]

class SettingContainer extends Component {
	componentDidMount() {
		const { timeZones, schedules, campaign_id, processes, autoResponseActions } = this.props
		
		if(timeZones.length === 0) {
			this.props.reqTimeZone()
		}
		if(schedules) {
			this.props.reqSchedules()
		}
		if(autoResponseActions.length === 0) {
			this.props.reqAutoResponseActions()
		}

		if(processes.length === 0 && campaign_id !== '') {
			this.props.reqCampaignProcesses(campaign_id)
		}

		if(!this.props.queryTerms) {
			this.props.reqQueryTerms()
		}

		this.initAutoResponses()
	}

	initAutoResponses = () => {
		const {campaign_id, responseCondition} = this.props
		if(responseCondition) {
			// console.log(typeof responseCondition)
			const responseConditionJson = JSON.parse(responseCondition)
			const userStr = responseConditionJson.user
			const responseStr = responseConditionJson.response
			if(responseStr) {
				const responseJson = JSON.parse(responseStr)
				// console.table(responseJson)
				this.props.updateAutoResponse(responseJson)
			}
		} 
		
	}

	handleSave = () => {
		const { campaignId, sendInterval, sendMax, timeZoneId, scheduleId, autoResponses, screeningConditions } = this.props
		const user = JSON.stringify(screeningConditions.map(item => JSON.stringify(item)))
		const response = JSON.stringify(autoResponses)
		const responseCondition = {
			user,
			response
		}
		const campaign = {
			id: campaignId,
			campaignSendInterval: sendInterval,
			campaignSendMax: sendMax,
			campaignTimeZone: timeZoneId,
			campaignTimeId: scheduleId,
			responseCondition: JSON.stringify(responseCondition),
		}
		this.props.reqSaveCampaign(campaign, {message: '设置保存成功'})
	}

	handleAddAutoResponse = () => {
		this.props.resetEditAutoResponse()
		this.props.showSettingModal(true)
	}
	handleEditAutoResponse = (index) => {
		const autoResponse = this.props.autoResponses[index]
		this.props.resetEditAutoResponse(autoResponse, index)
		this.props.showSettingModal(true)
	}
	handleRemoveAutoResponse = (index) => {
		this.props.deleteAutoResponse(index)
	} 
	render() {
		const { ...props} = this.props
		const queryTerms = props.queryTerms || {}
		const queryTermsGroups = queryTerms[queryScopeGroups.key] || {}
		const queryTermsTags = queryTerms[queryScopeTags.key] || []
		return (
			<div className="container setting-container" >
				<BaseSetting 
					taskIds={props.taskIds}
					interval={props.sendInterval}
					sendMax={props.sendMax}
					timeZone={props.timeZoneId}
					scheduleId={props.scheduleId}
					timeZones={props.timeZones}
					schedules={props.schedules}
					onInterval={e => props.updateInterval(e.target.value)}
					onSendMax={e => props.updateSendMax(e.target.value)}
					onTimeZone={value => props.updateTimeZone(value)}
					onSchedule={scheduleId => props.updateScheduleId(scheduleId)}
				/>
				<hr/>
				<AutoRespond 
					emails={props.emails}
					emailLinks={props.emailLinks}
					campaignList={props.campaignList}
					processes={props.processes}
					queryTermsGroups={queryTermsGroups}
					queryTermsTags={queryTermsTags}
					autoResponseActions={props.autoResponseActions}
					autoResponses={props.autoResponses}
					onAdd={this.handleAddAutoResponse}
					onEdit={this.handleEditAutoResponse}
					onRemove={this.handleRemoveAutoResponse}
				/>
				<AutoResponseSetModalContainer />
				<div className="setting-footer">
					<Button>取消</Button>
					<Button color={Colors.PRIMARY} onClick={this.handleSave} >保存设置</Button>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	campaignId: state.campaignCreate.campaignId,
	responseCondition: state.campaignCreate.response_condition,
	campaignList: state.campaignList.campaignList,
	sendInterval: state.baseSetting.sendInterval,
	sendMax: state.baseSetting.sendMax,
	timeZoneId: state.baseSetting.timeZoneId,
	scheduleId: state.baseSetting.scheduleId,
	schedules: state.baseSetting.schedules,
	timeZones: state.globalState.timeZones,

	processes: state.campaignProcess.processes,
	emails : state.email.emails,
	emailLinks : state.email.emailLinks,
	queryTerms: state.screening.queryTerms,

	autoResponseSettingModal: state.autoResponse.autoResponseSettingModal,
	autoResponseActions: state.autoResponse.autoResponseActions,
	screeningConditions: state.autoResponse.screeningConditions,
	autoResponses: state.autoResponse.autoResponses,
})

const mapDispatchToProps = (dispatch) => ({
	updateCampaignId: bindActionCreators(baseActions.updateCampaignId, dispatch),
	updateInterval: bindActionCreators(baseActions.updateInterval, dispatch),
	updateSendMax: bindActionCreators(baseActions.updateSendMax, dispatch),
	updateTimeZone: bindActionCreators(baseActions.updateTimeZone, dispatch),
	updateScheduleId: bindActionCreators(baseActions.updateScheduleId, dispatch),
	saveBaseSetting: bindActionCreators(baseActions.saveBaseSetting, dispatch),
	reqSchedules: bindActionCreators(baseActions.reqSchedules, dispatch),
	reqTimeZone: bindActionCreators(globalActions.reqTimeZone, dispatch),
	reqSaveCampaign: bindActionCreators(actions.reqSaveCampaign, dispatch),

	reqCampaignProcesses: bindActionCreators(processActions.reqCampaignProcesses, dispatch),
	reqQueryTerms: bindActionCreators(screeningActions.reqQueryTerms, dispatch),

	showSettingModal: bindActionCreators(responseActions.showSettingModal, dispatch),
	addAutoResponse: bindActionCreators(responseActions.addAutoResponse, dispatch),
	deleteAutoResponse: bindActionCreators(responseActions.deleteAutoResponse, dispatch),
	updateAutoResponse: bindActionCreators(responseActions.updateAutoResponse, dispatch),
	resetAutoResponses: bindActionCreators(responseActions.resetAutoResponses, dispatch),
	resetEditAutoResponse: bindActionCreators(responseActions.resetEditAutoResponse, dispatch),
	reqAutoResponseActions: bindActionCreators(responseActions.reqAutoResponseActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(SettingContainer)