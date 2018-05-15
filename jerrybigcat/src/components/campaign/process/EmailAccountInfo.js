import React from 'react'
import PropTypes from 'prop-types'


import { EmailSendTypes } from '../../../base/enums'

import qqMail from '../../../assets/images/email/qq_mail.svg'
import wyMail from '../../../assets/images/email/163_mail.svg'
import GMail from '../../../assets/images/email/gmail.svg'
import sysMail from '../../../assets/images/email/sys_mail.svg'
import customMail from '../../../assets/images/email/custom_mail.svg'

const emailSendTypes = {
	[EmailSendTypes.SYSTEM_MAIL]: {label: '系统邮件服务', icon: sysMail},
	[EmailSendTypes.CUSTOM_MAIL]: {label: '自定义邮件服务', icon: customMail},
	[EmailSendTypes.WY_MAIL]: {label: '网易企业邮箱', icon: wyMail},
	[EmailSendTypes.QQ_MAIL]: {label: '腾讯企业邮箱', icon: qqMail},
	[EmailSendTypes.GMAIL]: {label: 'Gmail', icon: GMail},
}

const EmailAccountInfo = ({emailAccount, onChange}) => {
	const emailSendType = emailSendTypes[emailAccount.send_type] || emailSendTypes[EmailSendTypes.SYSTEM_MAIL]
	const emailServer = JSON.parse(emailAccount.email_server || '[]') || []
	const smtp = emailServer.find(item => item.type === 'SMTP') || {}
	return (
		<div>
			<div className="email-account-info">
				<div className="email-service">
					<div className="logo">
						<img src={emailSendType.icon}/>
					</div>
					<p>{emailSendType.label}</p>
				</div>
				<div className="info">
					<p>发件人名称: {smtp.sender}</p>
					<p>发件地址: {smtp.email}</p>
					<p>回复地址: {smtp.replyemail || smtp.email}</p>
				</div>
			</div>
			<div className="email-account-change">
				<a onClick={onChange} >更换邮箱账户</a>
			</div>
		</div>
	)
}

export default EmailAccountInfo