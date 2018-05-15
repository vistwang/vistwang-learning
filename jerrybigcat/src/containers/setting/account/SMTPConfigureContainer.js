import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { actions } from '../../../reducers/setting/emailAccountSetting'
import SMTPConfigure from '../../../components/setting/account/SMTPConfigure'


class SMTPConfigureContainer extends Component {
	handleTest = () => {
		const {smtp_username, smtp_password, smtp_host, smtp_port, ...props} = this.props

		let stmpUsername

		if(!props.diff_server && !props.diff_email_username) {
		// 相同服务器，用户名和邮箱相同
			stmpUsername = props.server_email
		} else if(!props.diff_server && props.diff_email_username) {
		// 相同服务器，用户名和邮箱不同
			stmpUsername = props.server_username
		} else if(props.diff_server) {
		// 不同服务器
			// stmp 邮箱和用户名不一样
			stmpUsername = props.smtp_diff_email_username ? props.smtp_username : props.smtp_email
		}


		const param = {
			userName: stmpUsername,
			password: smtp_password,
			host: smtp_host,
			port: smtp_port,
			type: 0
		}
		this.props.testEmailAccount(param)
	}
	render() {
		const {updateStmpUsername, updateStmpEmail, updateStmpReplyEmail, updateServerSenderName, updateStmpPassword, updateStmpHost, updateStmpPort, updateStmpSSL, imapTest, ...props} = this.props
		return (
			<SMTPConfigure
				{...props}
				onDiffEmailUsername={e => props.updateStmpDiffEmailUsername(e.target.checked)}
				onIsReplyEmail={e => props.updateStmpIsReplyEmail(e.target.checked)}
				onUsername={e => updateStmpUsername(e.target.value)}
				onEmail={e => updateStmpEmail(e.target.value)}
				onSenderName={e => updateServerSenderName(e.target.value)}
				onPassword={e => updateStmpPassword(e.target.value)}
				onReplyEmail={e => updateStmpReplyEmail(e.target.value)}
				onHost={e => updateStmpHost(e.target.value)}
				onPort={e => updateStmpPort(e.target.value)}
				onSSL={e => updateStmpSSL(e.target.checked ? 1 : 0)}
				onTest={this.handleTest}
			/>
		)
	}
}


const mapStateToProps = (state) => {
	const {
		diff_server,
		diff_email_username,
		server_sender_name,
		server_username,
		server_email,
		smtp_diff_email_username,
		smtp_is_reply_email,
		smtp_username,
		smtp_password,
		smtp_email,
		smtp_reply_email,
		smtp_host,
		smtp_port,
		smtp_ssl,
	} = state.emailAccount.emailAccountSetting

	return {
		diff_server,
		diff_email_username,
		server_sender_name,
		server_username,
		server_email,
		smtp_diff_email_username,
		smtp_is_reply_email,
		smtp_username,
		smtp_password,
		smtp_email,
		smtp_reply_email,
		smtp_host,
		smtp_port,
		smtp_ssl,
	}
}

const mapDispatchProps = (dispatch) => ({
	updateStmpDiffEmailUsername: bindActionCreators(actions.updateStmpDiffEmailUsername, dispatch),
	updateStmpIsReplyEmail: bindActionCreators(actions.updateStmpIsReplyEmail, dispatch),
	updateStmpUsername: bindActionCreators(actions.updateStmpUsername, dispatch),
	updateStmpEmail: bindActionCreators(actions.updateStmpEmail, dispatch),
	updateServerSenderName: bindActionCreators(actions.updateServerSenderName, dispatch),
	updateStmpPassword: bindActionCreators(actions.updateStmpPassword, dispatch),
	updateStmpReplyEmail: bindActionCreators(actions.updateStmpReplyEmail, dispatch),
	updateStmpHost: bindActionCreators(actions.updateStmpHost, dispatch),
	updateStmpPort: bindActionCreators(actions.updateStmpPort, dispatch),
	updateStmpSSL: bindActionCreators(actions.updateStmpSSL, dispatch),
	testEmailAccount: bindActionCreators(actions.testEmailAccount, dispatch),
})

export default connect(mapStateToProps, mapDispatchProps)(SMTPConfigureContainer)