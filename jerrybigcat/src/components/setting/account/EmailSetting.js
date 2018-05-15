import React from 'react'
import PropTypes from 'prop-types'

import { Modal } from '../../m1ui'

import EmailSettingItemContainer from '../../../containers/setting/account/EmailSettingItemContainer'
import EmailSafeContainer from '../../../containers/setting/account/EmailSafeContainer'
import EmailSignatureContainer from '../../../containers/setting/account/EmailSignatureContainer'
import EmailUnsubscribeContainer from '../../../containers/setting/account/EmailUnsubscribeContainer'
import EmailConfigure from './EmailConfigure'

const { Header, Title, Body } = Modal

const EmailSetting = (props) => {
	return [
		<Header key="header">
			<Title>收发邮件账户配置</Title>
		</Header>,
		<Body key="body">
			<EmailSettingItemContainer
				type="server"
				title="IMAP和SMTP配置"
				icon="set-up-thin"
				intro="请配置您的邮件账户的接受（IMAP）和（SMTP）信息"
			>
				<EmailConfigure />
			</EmailSettingItemContainer>
			<EmailSettingItemContainer
				type="safe"
				title="邮件安全设置"
				icon="security"
				intro="设定该邮箱账户每天最大发送邮件量，依据业务需求配置，避免对接收用户造成打扰而投诉或退订"
			>
				<EmailSafeContainer />
			</EmailSettingItemContainer>
			<EmailSettingItemContainer
				type="signature"
				title="邮件签名设置"
				icon="feather"
				intro="您可以通过粘贴或手动编辑该邮件账户的签名，启用后，凡事通过该邮箱账户发出的邮件地步，将自动加上签名信息"
			>
				<EmailSignatureContainer />
			</EmailSettingItemContainer>
			<EmailSettingItemContainer
				title="退订设置"
				icon="unsubscribe"
				intro="设置邮件地步的退订术语，让您的优先更加友好及个性化"
			>
				<EmailUnsubscribeContainer />
			</EmailSettingItemContainer>
		</Body>
	]
}

export default EmailSetting