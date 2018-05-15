import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { actions } from '../../../reducers/setting/emailAccountSetting'

import { Modal } from '../../../components/m1ui'

import EmailService from '../../../components/setting/account/EmailService'
import EmailSetting from '../../../components/setting/account/EmailSetting'
import EmailSettingFooter from '../../../components/setting/account/EmailSettingFooter'

class EmailServiceModal extends Component {
	handleCancel = () => {
		if(this.props.settingStep === 1) {
			this.props.onClose()
		} else {
			this.props.updateSettingStep(1)
		}
	}

	handleConfirm = (step) => {
		if(this.props.settingStep === 1) {
			this.props.updateSettingStep(2)
		} else {
			this.handleSaveEmailAccount()
		}
	}

	handleSaveEmailAccount = () => {
		const {
			email_account_id, 
			send_type, 
			count_daily, 
			can_signature,
			email_server, 
			email_signature, 
			email_unsubscribe, 
			enable_use,
			...props
		} = this.props

		

		let param = {
			email_account_id, 
			send_type, 
			count_daily, 
			email_server: this.getEmailServer(), 
			email_signature, 
			email_unsubscribe: this.getUnsubscribe(), 
			enable_use,
		}
		if(email_account_id) {
			param.email_account_id = email_account_id
		}
		if(count_daily > 0) {
			param.count_daily = count_daily
		}
		if(can_signature && email_signature.trim() !== '') {
			param.email_signature = email_signature
		}
		this.props.saveEmailAccount(param)
	}

	// 收发邮箱服务器字段处理
	getEmailServer() {
		const props = this.props
		let imapUsername, stmpUsername, stmpEmail, stmpReplyEmail

		if(!props.diff_server && !props.diff_email_username) {
		// 相同服务器，用户名和邮箱相同
			imapUsername = stmpUsername = stmpEmail = stmpReplyEmail = props.server_email
		} else if(!props.diff_server && props.diff_email_username) {
		// 相同服务器，用户名和邮箱不同
			imapUsername = stmpUsername = props.server_username
			stmpEmail = stmpReplyEmail = props.server_email
		} else if(props.diff_server) {
		// 不同服务器
			imapUsername = props.imap_username
			stmpEmail = props.smtp_email

			// stmp 邮箱和用户名不一样
			stmpUsername = props.smtp_diff_email_username ? props.smtp_username : props.smtp_email

			// 回复指定邮箱
			stmpReplyEmail = props.smtp_is_reply_email ? props.smtp_reply_email : props.smtp_email
		}

		let emailImap = {
			type: 'IMAP',
			username: imapUsername,
			host: props.imap_host,
			port: props.imap_port,
			password: props.imap_password,
			useSSL: props.imap_ssl,
		} 

		let emailStmp = {
			type: 'SMTP',
			email: stmpEmail,
			username: stmpUsername,
			replyemail: stmpReplyEmail,
			sender: props.server_sender_name,
			host: props.smtp_host,
			port: props.smtp_port,
			password: props.smtp_password,
			useSSL: props.smtp_ssl,
		}

		let emailServer = [emailImap, emailStmp]

		return JSON.stringify(emailServer)
	}

	getUnsubscribe() {
		const { unsubscribe_type, unsubscribe_name, unsubscribe_content } = this.props
		const unsubscribe = {
			type: unsubscribe_type,
			clickname: unsubscribe_name,
			replyContent: unsubscribe_content
		}

		return JSON.stringify(unsubscribe)
	}

	render() {
		const {show, onClose, settingStep} = this.props
		return (
			<Modal
				show={show}
				onClose={onClose}
				style={{width: '770px'}}
			>
				{
					settingStep === 1 ? 
					<EmailService /> : 
					<EmailSetting />
				}
				<EmailSettingFooter
					step={settingStep}
					onCancel={this.handleCancel}
					onConfirm={this.handleConfirm}
				/>
			</Modal>
		)
	}
}

const mapStateToProps = (state) => {
	const {
		settingStep, 
		email_account_id, 
		send_type, 
		count_daily,
		can_signature, 
		email_server, 
		email_signature, 
		email_unsubscribe, 
		enable_use,

		diff_server,
		diff_email_username,

		server_username,
		server_email,
		server_sender_name,

		imap_username,
		imap_password,
		imap_host,
		imap_port,
		imap_ssl,

		smtp_diff_email_username,
		smtp_is_reply_email,
		smtp_username,
		smtp_password,
		smtp_email,
		smtp_reply_email,
		smtp_host,
		smtp_port,
		smtp_ssl,

		unsubscribe_type,
		unsubscribe_name,
		unsubscribe_content,
	} = state.emailAccount.emailAccountSetting

	return {
		settingStep,
		email_account_id,
		send_type,
		count_daily,
		can_signature,
		email_server,
		email_signature,
		email_unsubscribe,
		enable_use,

		diff_server,
		diff_email_username,

		server_username,
		server_email,
		server_sender_name,

		imap_username,
		imap_password,
		imap_host,
		imap_port,
		imap_ssl,

		smtp_diff_email_username,
		smtp_is_reply_email,
		smtp_username,
		smtp_password,
		smtp_email,
		smtp_reply_email,
		smtp_host,
		smtp_port,
		smtp_ssl,

		unsubscribe_type,
		unsubscribe_name,
		unsubscribe_content,
	}
}

const mapDispatchProps = (dispatch) => ({
	updateSettingStep: bindActionCreators(actions.updateSettingStep, dispatch),
	saveEmailAccount: bindActionCreators(actions.saveEmailAccount, dispatch),
})

export default connect(mapStateToProps, mapDispatchProps)(EmailServiceModal)