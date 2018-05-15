import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { SysContact } from '../../../base/system'
import { QueryScopes } from '../../../base/enums'

import { actions as globalActions } from '../../../reducers/campaign'
import { actions } from '../../../reducers/campaign/campaignCreate'
import { actions as listCampaign } from '../../../reducers/campaign/campaignList'
import { actions as baseActions } from '../../../reducers/campaign/baseSetting'
import { actions as responseActions } from '../../../reducers/campaign/autoResponse'
import { actions as processActions } from '../../../reducers/campaign/campaignProcess'
import { actions as emailActions } from '../../../reducers/campaign/email'
import { actions as screeningActions } from '../../../reducers/campaign/screening'

import AddAutoRespondModal from '../../../components/campaign/create/AddAutoRespondModal'

const queryScopes = SysContact.filter.queryScopes
const queryScopeGroups = queryScopes[QueryScopes.GROUP_NORMAL]
const queryScopeTags = queryScopes[QueryScopes.TAG]

class AutoResponseSetModalContainer extends Component {
	componentDidMount() {
		const { campaign_id, processes, autoResponseActions } = this.props
		if(autoResponseActions.length === 0) {
			this.props.reqAutoResponseActions()
		}

		if(processes.length === 0 && campaign_id !== '') {
			this.props.reqCampaignProcesses(campaign_id)
		}

		if(!this.props.queryTerms) {
			this.props.reqQueryTerms()
		}
	}

	handleUpdateEditAutoResponse = (option) => {
		const { editAutoResponse } = this.props
		const autoResponse = {
			...editAutoResponse,
			...option
		}
		this.props.updateEditAutoResponse(autoResponse)
		// console.log(autoResponse)
	}

	handleSelectBehavior = (type) => {
		this.handleUpdateEditAutoResponse({type})
	}
	handleAutoResponseActions = (action_id) => {
		this.handleUpdateEditAutoResponse({action_id, data: ''})
	}

	handleSelectProcessContent = (mail_id, step) => {
		this.handleUpdateEditAutoResponse({step, mail_id})
	}
	handleSelectLink = (task_id, url) => {
		this.handleUpdateEditAutoResponse({url})
	}
	handleActionDataChange = (data) =>{
		this.handleUpdateEditAutoResponse({data})
	}

	handleApply = (e) => {
		const { editAutoResponse, editAutoResponseIndex } = this.props
		// console.log('apply',editAutoResponse)
		this.props.updateAutoResponse(editAutoResponse, editAutoResponseIndex)
		this.props.showSettingModal(false)
	}

	render() {
		const { editAutoResponse, ...props} = this.props
		const queryTerms = props.queryTerms || {}
		const queryTermsGroups = queryTerms[queryScopeGroups.key] || {}
		const queryTermsTags = queryTerms[queryScopeTags.key] || []

		return (
			<AddAutoRespondModal
				show={props.autoResponseSettingModal}
				onClose={e => props.showSettingModal(false)}
				onApply={this.handleApply}

				campaigns={props.campaignList}
				processes={props.processes}
				autoResponse={editAutoResponse}
				autoResponseActions={props.autoResponseActions}
				emails={props.emails}
				emailLinks={props.emailLinks}
				queryTermsGroups={queryTermsGroups}
				queryTermsTags={queryTermsTags}

				onSelectBehavior={this.handleSelectBehavior}
				onAutoResponseActions={this.handleAutoResponseActions}
				onSelectProcessContent={this.handleSelectProcessContent}
				onSelectLink={this.handleSelectLink}
				onActionDataChange={this.handleActionDataChange}
			/>
		)
	}
}

const mapStateToProps = (state) => ({
	autoResponseSettingModal: state.autoResponse.autoResponseSettingModal,
	autoResponseActions: state.autoResponse.autoResponseActions,
	screeningConditions: state.autoResponse.screeningConditions,
	autoResponses: state.autoResponse.autoResponses,
	editAutoResponseIndex: state.autoResponse.editAutoResponseIndex,
	editAutoResponse: state.autoResponse.editAutoResponse,
	processes: state.campaignProcess.processes,
	campaignList: state.campaignList.campaignList,
	campaign_id : state.campaignCreate.campaign_id,
	emails : state.email.emails,
	emailLinks : state.email.emailLinks,
	queryTerms: state.screening.queryTerms,
})

const mapDispatchToProps = (dispatch) => ({
	reqAutoResponseActions: bindActionCreators(responseActions.reqAutoResponseActions, dispatch),
	addAutoResponse: bindActionCreators(responseActions.addAutoResponse, dispatch),
	deleteAutoResponse: bindActionCreators(responseActions.deleteAutoResponse, dispatch),
	updateAutoResponse: bindActionCreators(responseActions.updateAutoResponse, dispatch),
	resetAutoResponses: bindActionCreators(responseActions.resetAutoResponses, dispatch),
	showSettingModal: bindActionCreators(responseActions.showSettingModal, dispatch),
	setEditAutoResponseIndex: bindActionCreators(responseActions.setEditAutoResponseIndex, dispatch),
	resetEditAutoResponse: bindActionCreators(responseActions.resetEditAutoResponse, dispatch),
	updateEditAutoResponse: bindActionCreators(responseActions.updateEditAutoResponse, dispatch),
	reqCampaignProcesses: bindActionCreators(processActions.reqCampaignProcesses, dispatch),
	reqQueryTerms: bindActionCreators(screeningActions.reqQueryTerms, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(AutoResponseSetModalContainer)