import React from 'react'
import PropTypes from 'prop-types'

import { Button, Modal, Colors } from '../../m1ui'
import EmailServiceItemContainer from '../../../containers/setting/account/EmailServiceItemContainer'

import qqMail from '../../../assets/images/email/qq_mail.svg'
import wyMail from '../../../assets/images/email/163_mail.svg'
import GMail from '../../../assets/images/email/gmail.svg'
import sysMail from '../../../assets/images/email/sys_mail.svg'
import customMail from '../../../assets/images/email/custom_mail.svg'

const { Header, Title, Body } = Modal

const selectEmailTypes = [
	{type: 3, label: '腾讯企业邮箱', icon: qqMail},
	{type: 2, label: '网易企业邮箱', icon: wyMail},
	{type: 4, label: 'Gmail', icon: GMail},
	{type: 0, label: '系统邮件服务', icon: sysMail},
	{type: 1, label: '自定义邮件服务', icon: customMail}
] 


const EmailService = (props) => {
	return [
		<Header key="header">
			<Title>请选择活配置您要使用的邮件服务商</Title>
		</Header>,
		<Body key="body">
			<div className="m1-row">
				<ul className="service-row">
					{selectEmailTypes.map((item, i) => (
						<EmailServiceItemContainer key={i} item={item} type={item.type} />
					))}
				</ul>
			</div>
		</Body>
	]
}

export default EmailService