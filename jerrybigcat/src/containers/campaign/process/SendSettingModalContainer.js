import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Base64 } from 'js-base64' 

import { config, msg } from '../../../utils'
import { CampaignContentTypes } from '../../../base/enums'

import { actions } from '../../../reducers/campaign/campaignProcess'
import { actions as emailActions } from '../../../reducers/campaign/email'
import { actions as contentActions } from '../../../reducers/campaign/emailContent'

import SendSettingModal from '../../../components/campaign/process/SendSettingModal'
import EmailAccountsModal from '../../../components/campaign/process/EmailAccountsModal'

class SendTestModalContainer extends Component {
	componentDidMount() {
		// this.requestEmailAccounts()
	}
	handleAddEmailAccount = () => {
		this.requestEmailAccounts()
		this.handleOpenEmailAccountsModal()
	}

	requestEmailAccounts = () => {
		const { emailAccounts } = this.props
		if(emailAccounts.length === 0) {
			this.props.reqEmailAccounts(1, 100)
		}
	}

	handleSelectEmailAccount = () => {
		const { emailAccounts } = this.props
		const emailAccount = emailAccounts.find(item => !!item.checked) 
		if(!emailAccount) {
			msg.info('请至少选择一个邮件账户')
		} else {
			this.props.updateEmailAccountId(emailAccount.email_account_id)
			this.handleCloseEmailAccountsModal()
		}
	}

	handleOpenEmailAccountsModal = () => {
		this.props.showSendSettingModal(false)
		this.props.showEmailAccountsModal(true)
	}

	handleCloseEmailAccountsModal = () => {
		this.props.showEmailAccountsModal(false)
		this.props.showSendSettingModal(true)
	}

	handleSendTest = () => {
		const { subject, summary, tos, email_account_id, task_id, mailbody } = this.props
		const testParam = {
			task_id,
			subject,
			email_account_id,
			mailbody: mailbody,
			// mailbody: encodeURIComponent(Base64.encode(mailbody)),
			preview_text: summary,
			tos: JSON.stringify(tos.split(';'))
		}
		this.props.reqSendTestEmail(testParam)
	}

	handleSaveSendSetting = () => {
		const { subject, summary, tos, email_account_id, task_id, step_id, mailbody, relationId } = this.props
		const email = {
			task_id,
			email_account_id,
			subject,
			mailbody: mailbody,
			// mailbody: encodeURIComponent(Base64.encode(mailbody)),
		}
		const relation = {
			id: relationId,
			stepId: step_id,
			type: CampaignContentTypes.EDM,
		}
		this.props.reqSaveEmailContent(email, relation)
	}

	render() {
		const { email_account_id, emailAccounts, ...props } = this.props
		const emailAccount = emailAccounts.find(item => item.email_account_id === email_account_id) || {}
		return (
			<div>
				<SendSettingModal
					show={props.sendTestEmailModal}
					onClose={e => props.showSendSettingModal(false)}
					sendSettingModalType={props.sendSettingModalType}
					onAddEmailAccount={this.handleAddEmailAccount}
					emailAccount={emailAccount}
					subject={props.subject}
					summary={props.summary}
					tos={props.tos}
					onChangeSubject={subject => props.updateSubject(subject)}
					onChangeSummary={summary => props.updateSummary(summary)}
					onChangeTos={tos => props.updateTos(tos)}
					onSendTest={this.handleSendTest}
					onConfirm={this.handleSaveSendSetting}
				/>
				<EmailAccountsModal
					show={props.emailAccountsModal}
					onClose={this.handleCloseEmailAccountsModal}
					emailAccountId={email_account_id}
					onConfirm={this.handleSelectEmailAccount}
					emailAccounts={emailAccounts}
					onRadioSelect={email_account_id => props.updateSelectEmailAccount(email_account_id)}
				/>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		campaignId: state.campaignCreate.campaignId,
		emails: state.email.emails,
		emailLinks: state.email.emailLinks,
		accountInfo: state.email.accountInfo,
		emailAccounts: state.email.emailAccounts,

		task_id: state.emailContent.task_id,
		step_id: state.emailContent.step_id,
		relationId: state.emailContent.relationId,
		email_account_id: state.emailContent.email_account_id,
		subject: state.emailContent.subject,
		summary: state.emailContent.summary,
		mailbody: state.emailContent.mailbody,
		tos: state.emailContent.tos,
		sendSettingModalType: state.emailContent.sendSettingModalType,
		sendTestEmailModal: state.emailContent.sendTestEmailModal,
		emailAccountsModal: state.emailContent.emailAccountsModal,
	}
}

const mapDispatchToProps = (dispatch) => ({
	reqAccountInfo: bindActionCreators(emailActions.reqAccountInfo, dispatch),
	reqEmailAccounts: bindActionCreators(emailActions.reqEmailAccounts, dispatch),
	updateSelectEmailAccount: bindActionCreators(emailActions.updateSelectEmailAccount, dispatch),
	reqSaveEmailContent: bindActionCreators(contentActions.reqSaveEmailContent, dispatch),
	resetEmailContent: bindActionCreators(contentActions.resetEmailContent, dispatch),
	reqSendTestEmail: bindActionCreators(contentActions.reqSendTestEmail, dispatch),
	showSendSettingModal: bindActionCreators(contentActions.showSendSettingModal, dispatch),
	showEmailAccountsModal: bindActionCreators(contentActions.showEmailAccountsModal, dispatch),
	updateEmailAccountId: bindActionCreators(contentActions.updateEmailAccountId, dispatch),
	updateSubject: bindActionCreators(contentActions.updateSubject, dispatch),
	updateSummary: bindActionCreators(contentActions.updateSummary, dispatch),
	updateTos: bindActionCreators(contentActions.updateTos, dispatch),
})


export default connect(mapStateToProps, mapDispatchToProps)(SendTestModalContainer)