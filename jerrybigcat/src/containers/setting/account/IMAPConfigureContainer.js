import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { actions } from '../../../reducers/setting/emailAccountSetting'
import IMAPConfigure from '../../../components/setting/account/IMAPConfigure'


class IMAPConfigureContainer extends Component {
	handleTest = () => {
		const {imap_username, imap_password, imap_host, imap_port, ...props} = this.props
		let imapUsername

		if(!props.diff_server && !props.diff_email_username) {
		// 相同服务器，用户名和邮箱相同
			imapUsername = props.server_email
		} else if(!props.diff_server && props.diff_email_username) {
		// 相同服务器，用户名和邮箱不同
			imapUsername = props.server_username
		} else if(props.diff_server) {
		// 不同服务器
			imapUsername = props.imap_username
		}

		const param = {
			userName: imapUsername,
			password: imap_password,
			host: imap_host,
			port: imap_port,
			type: 1
		}
		this.props.testEmailAccount(param)
	}

	render() {
		const {updateImapUsername, updateImapPassword, updateImapHost, updateImapPort, updateImapSSL, imapTest, ...props} = this.props
		return (
			<IMAPConfigure
				{...props}
				onUsername={e => updateImapUsername(e.target.value)}
				onPassword={e => updateImapPassword(e.target.value)}
				onHost={e => updateImapHost(e.target.value)}
				onPort={e => updateImapPort(e.target.value)}
				onSSL={e => updateImapSSL(e.target.checked ? 1 : 0)}
				onTest={this.handleTest}
			/>
		)
	}
}


const mapStateToProps = (state) => {
	const {
		diff_server,
		diff_email_username,
		server_username,
		server_email,
		imap_username,
		imap_password,
		imap_host,
		imap_port,
		imap_ssl,
	} = state.emailAccount.emailAccountSetting

	return {
		diff_server,
		diff_email_username,
		server_username,
		server_email,
		imap_username,
		imap_password,
		imap_host,
		imap_port,
		imap_ssl,
	}
}

const mapDispatchProps = (dispatch) => ({
	updateImapUsername: bindActionCreators(actions.updateImapUsername, dispatch),
	updateImapPassword: bindActionCreators(actions.updateImapPassword, dispatch),
	updateImapHost: bindActionCreators(actions.updateImapHost, dispatch),
	updateImapPort: bindActionCreators(actions.updateImapPort, dispatch),
	updateImapSSL: bindActionCreators(actions.updateImapSSL, dispatch),
	testEmailAccount: bindActionCreators(actions.testEmailAccount, dispatch),
})

export default connect(mapStateToProps, mapDispatchProps)(IMAPConfigureContainer)