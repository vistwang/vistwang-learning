import React from 'react'
import PropTypes from 'prop-types'

import { Switch, Button, Checkbox, Colors } from '../../m1ui'
import FormRow from '../../common/FormRow'

const SMTPConfigure = ({onDiffEmailUsername, onIsReplyEmail, onUsername, onEmail, onReplyEmail, onSenderName, onHost, onPort, onPassword, onSSL, onTest, ...props}) => {
	return (
		<div className="m1-col-6 stmp">
			<div className="m1-form">
				<div className="m1-form-row">
					<h3>发送邮件（SMTP）</h3>
				</div>
				{props.diff_server && <FormRow label="邮箱：">
									<input className="m1-form-input" onChange={onEmail} value={props.smtp_email} />
								</FormRow>}
				{props.diff_server && 
					<FormRow label="发件人名称：">
						<input className="m1-form-input" onChange={onSenderName} value={props.server_sender_name} />
					</FormRow>}
				{props.diff_server && !props.smtp_diff_email_username && 
					<p>
						<Checkbox onChange={onDiffEmailUsername} checked={props.smtp_diff_email_username} >
							我的邮箱地址和用户名不同
						</Checkbox>
					</p>}
				{props.diff_server && props.smtp_diff_email_username && 
					<FormRow label="用户名：" >
						<input className="m1-form-input" onChange={onUsername} value={props.smtp_username} />
					</FormRow>}
				{props.diff_server && !props.smtp_is_reply_email &&
				 <p>
				 	<Checkbox onChange={onIsReplyEmail} checked={props.smtp_is_reply_email} >
				 		回复到指定邮箱
				 	</Checkbox>
				 </p>}
				{props.diff_server && props.smtp_is_reply_email && 
					<FormRow label="回复邮箱：" >
						<input className="m1-form-input" onChange={onReplyEmail} value={props.smtp_reply_email} />
					</FormRow>}
				<FormRow label="SMTP主机：" >
					<input className="m1-form-input" onChange={onHost} value={props.smtp_host} />
				</FormRow>
				<FormRow label="SMTP端口：" >
					<input className="m1-form-input" onChange={onPort} value={props.smtp_port} />
				</FormRow>
				<FormRow label="密码：" >
					<input className="m1-form-input" type="password" onChange={onPassword} value={props.smtp_password} />
				</FormRow>
				<div className="m1-form-row">
					<Switch onChange={onSSL} checked={props.smtp_ssl} /> 启用SSL
				</div>
				<div className="m1-form-row">
					<Button
						color={Colors.TAGPRIMARY}
						onClick={onTest}
					>测试</Button>
				</div>
			</div>
		</div>
	)
}

export default SMTPConfigure