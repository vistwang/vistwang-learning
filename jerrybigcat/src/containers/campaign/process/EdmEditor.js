import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { config, msg } from '../../../utils'
import { CampaignContentTypes } from '../../../base/enums'

import { actions } from '../../../reducers/campaign/campaignProcess'
import { actions as emailActions } from '../../../reducers/campaign/email'
import { actions as contentActions } from '../../../reducers/campaign/emailContent'

import EdmEditorMenuBar from '../../../components/campaign/process/EdmEditorMenuBar'
import SendSettingModalContainer from './SendSettingModalContainer'

class EdmEditor extends Component {
	constructor(props) {
		super(props)

	}
	componentDidMount() {
		window.addEventListener('message', this.handleWindowMessage, false)
	}
	componentWillReceiveProps(nextProps) {
		this.handleResetEmailContent(nextProps)
		this.hanldEmailAccountIdChange(nextProps)
	}
	componentWillUnmount() {
		window.removeEventListener('message', this.handleWindowMessage, false)
	}

	handleOpenSettingModal = (type) => {
		this.props.updateSendSettingModalType(type)
		this.props.showSendSettingModal(true)
	}

	handleResetEmailContent = (nextProps) => {
		if(this.props.task_id !== nextProps.task_id) {
			const { task_id, subject, email_account_id, mailbody } = nextProps
			const messageData = {
				handle: 'SOUP_RESET_EMAIL_CONTENT',
				data: {
					task_id,
					subject,
					email_account_id,
					mailbody,
				}
			}
			this.handlePostMessage(messageData)
		}
	}

	hanldEmailAccountIdChange = (nextProps) => {
		if(this.props.email_account_id !== nextProps.email_account_id) {
			const { email_account_id } = nextProps
			const messageData = {
				handle: 'SOUP_UPDATE_EMAIL_ACCOUNT_ID',
				data: {
					email_account_id
				}
			}
			this.handlePostMessage(messageData)
		}
	}

	handleMessageEvent = (action) => {
		switch(action.handle) {
			case 'SOUP_UPDATE_MAILBODY':
				this.props.updateMailbody(action.data.mailbody)
				break 
			case 'SOUP_OPEN_EMAIL_SETTING_MODAL':
				this.handleOpenSettingModal(action.data.type)
				break
		}
	}

	handleWindowMessage = (e) => {
		if(e.data) {
			this.handleMessageEvent(e.data)
		}
	}

	handlePostMessage = (message) => {
		this.refs.iframe.contentWindow.postMessage(message, config.DOMAIN)
	}

	handleSendSetting = (type) => {
		const messageData = {
			handle: 'SOUP_SAVE_DRAFT_AND_OPEN_SETTING_MODAL',
			data: { type }
		}
		this.handlePostMessage(messageData)
	}

	handleImportHtml = () => {
		const messageData = {
			handle: 'SOUP_IMPORT_EMAIL_TEMPLATE',
			data: {}
		}
		// this.handlePostMessage(messageData)

		msg.info('coming soon')
	}

	handleImport = (type) => {
		// console.log(type)
		switch(type) {
			case 3:
				this.handleImportHtml()
				break
		}
		
	}

	handleCreate = (type) => {
		if(type === CampaignContentTypes.SMS) {
			msg.info('coming soon')
		}
	}

	render() {

		return (
			<div className="edm-editor">
				<EdmEditorMenuBar
					onCreate={this.handleCreate}
					onSendSetting={e => this.handleSendSetting(0)}
					onSendTest={e => this.handleSendSetting(1)}
					onImport={type => this.handleImport(type)}
				/>
				<div className="edm-iframe-container">
					<iframe ref="iframe" src="/edm/html/default.htm" frameBorder="0"></iframe>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		processContentModal: state.campaignProcess.processContentModal,
		processes: state.campaignProcess.processes,
		campaign_id: state.campaignCreate.campaign_id,
		emails: state.email.emails,
		emailLinks: state.email.emailLinks,
		accountInfo: state.email.accountInfo,

		task_id: state.emailContent.task_id,
		email_account_id: state.emailContent.email_account_id,
		mailbody: state.emailContent.mailbody,
		subject: state.emailContent.subject,
	}
}

const mapDispatchToProps = (dispatch) =>({
	showProcessContentModal: bindActionCreators(actions.showProcessContentModal, dispatch),
	saveCampaignProcess: bindActionCreators(actions.saveCampaignProcess, dispatch),
	modifyCampaignProcess: bindActionCreators(actions.modifyCampaignProcess, dispatch),
	reqCampaignProcesses: bindActionCreators(actions.reqCampaignProcesses, dispatch),
	reqRemoveCampaignProcess: bindActionCreators(actions.reqRemoveCampaignProcess, dispatch),
	saveProcessContentSet: bindActionCreators(actions.saveCampaignProcess, dispatch),
	reqEmails: bindActionCreators(emailActions.reqEmails, dispatch),
	reqRemoveEmail: bindActionCreators(emailActions.reqRemoveEmail, dispatch),
	reqLinks: bindActionCreators(emailActions.reqLinks, dispatch),
	reqAccountInfo: bindActionCreators(emailActions.reqAccountInfo, dispatch),
	reqSaveEmailContent: bindActionCreators(contentActions.reqSaveEmailContent, dispatch),
	resetEmailContent: bindActionCreators(contentActions.resetEmailContent, dispatch),
	showSendSettingModal: bindActionCreators(contentActions.showSendSettingModal, dispatch),
	updateSendSettingModalType: bindActionCreators(contentActions.updateSendSettingModalType, dispatch),
	updateMailbody: bindActionCreators(contentActions.updateMailbody, dispatch),
})


export default connect(mapStateToProps, mapDispatchToProps)(EdmEditor)