import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { msg, utils } from '../../../utils'
import { ReplyTypes } from '../../../base/enums'

import { actions } from '../../../reducers/campaign/inbox'
import { actions as replyActions } from '../../../reducers/campaign/reply'
import { actions as emailActions } from '../../../reducers/campaign/email'

import SendReplyEmailModal from '../../../components/campaign/inbox/SendReplyEmailModal'
import EmailAccountsModal from '../../../components/campaign/process/EmailAccountsModal'

class SendReplyModalContainer extends Component {
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

	handleOpenEmailAccountsModal = () => {
		this.props.showReplyEmailModal(false)
		this.props.showEmailAccountsModal(true)
	}

	handleCloseEmailAccountsModal = () => {
		this.props.showEmailAccountsModal(false)
		this.props.showReplyEmailModal(true)
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

	handleConfirmReply = (e) => {
		const {content, replyId, subject, summary, emailAccountId} = this.props
		const guestReply = this.getGuestReply()
		const emailAccount = this.getEmailAccount()
		const param = {
			replyId,
			subject,
			summary,
			content,
			address: guestReply.email,
			emailAccountId,
			emailAccountName: emailAccount.account_name,
			emailAccountAddress: emailAccount.account_email, 
		}
		this.props.reqSendRplyEmail(param)
	}

	getEmailAccount = () => {
		const {emailAccounts, emailAccountId} = this.props
		return emailAccounts.find(item => item.email_account_id === emailAccountId) || {}
	}

	getGuestReply = () => {
		const { reply } = this.props
		const guestReplys = reply.filter(item => !item.system)
		const guestReplyLength = guestReplys.length
		const guestReply = guestReplyLength > 0 ? guestReplys[guestReplys.length - 1] : {}
		return guestReply
	}

	render() {
		const {replyId, reply, replyEmailModal, content, emailAccountId, emailAccounts, ...props } = this.props
		const emailAccount = this.getEmailAccount()
		const guestReply = this.getGuestReply()
		return [
			<SendReplyEmailModal
				key="reply"
				show={replyEmailModal}
				email={guestReply.email}
				fullname={guestReply.fullname}
				content={content}
				emailAccount={emailAccount}
				onClose={e => props.showReplyEmailModal(false)}
				onContentChange={value => props.updateContent(value)}
				onAddEmailAccount={this.handleAddEmailAccount}
				onConfirm={this.handleConfirmReply}
			/>,
			<EmailAccountsModal
				key="account"
				show={props.emailAccountsModal}
				onClose={this.handleCloseEmailAccountsModal}
				emailAccountId={emailAccountId}
				onConfirm={this.handleSelectEmailAccount}
				emailAccounts={emailAccounts}
				onRadioSelect={emailAccountId => props.updateSelectEmailAccount(emailAccountId)}
			/>
		]
	}
}

const mapStateToProps = (state) => ({
	campaignId: state.campaignCreate.campaignId,
	recipients: state.inbox.recipients,

	emailAccounts: state.email.emailAccounts,

	replyDetailModal: state.reply.replyDetailModal,
	replyEmailModal: state.reply.replyEmailModal,
	reply: state.reply.reply,
	replyId: state.reply.replyId,
	subject: state.reply.subject,
	content: state.reply.content,
	emailAccountId: state.reply.emailAccountId,
	emailAccountsModal: state.reply.emailAccountsModal,
})

const mapDispatchToProps = (dispatch) => ({
	reqRecipients: bindActionCreators(actions.reqRecipients, dispatch),
	reqEmailAccounts: bindActionCreators(emailActions.reqEmailAccounts, dispatch),
	updateSelectEmailAccount: bindActionCreators(emailActions.updateSelectEmailAccount, dispatch),

	reqReply: bindActionCreators(replyActions.reqReply, dispatch),
	reqReply: bindActionCreators(replyActions.reqReply, dispatch),
	updateReplyId: bindActionCreators(replyActions.updateReplyId, dispatch),
	showReplyModal: bindActionCreators(replyActions.showReplyModal, dispatch),
	showReplyEmailModal: bindActionCreators(replyActions.showReplyEmailModal, dispatch),
	updateContent: bindActionCreators(replyActions.updateContent, dispatch),
	updateEmailAccountId: bindActionCreators(replyActions.updateEmailAccountId, dispatch),
	showEmailAccountsModal: bindActionCreators(replyActions.showEmailAccountsModal,dispatch),
	reqSendRplyEmail: bindActionCreators(replyActions.reqSendRplyEmail,dispatch),
})

export default connect(mapStateToProps,mapDispatchToProps)(SendReplyModalContainer)