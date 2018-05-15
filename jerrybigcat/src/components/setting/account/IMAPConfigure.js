import React from 'react'
import PropTypes from 'prop-types'

import { Switch, Button, Colors } from '../../m1ui'
import FormRow from '../../common/FormRow'

const IMAPConfigure = ({onUsername, onHost, onPort, onPassword, onSSL, onTest, ...props}) => {
	return (
		<div className="m1-col-6 imap">
			<div className="m1-form">
				<div className="m1-form-row">
					<h3>接收邮件（IMAP）</h3>
				</div>
				{props.diff_server && 
					<FormRow label="用户名：" >
						<input className="m1-form-input" onChange={onUsername} value={props.imap_username} />
					</FormRow>}
				<FormRow label="IMAP主机：" >
					<input className="m1-form-input" onChange={onHost} value={props.imap_host} />
				</FormRow>
				<FormRow label="IMAP端口：" >
					<input className="m1-form-input" onChange={onPort} value={props.imap_port} />
				</FormRow>
				<FormRow label="密码：" >
					<input className="m1-form-input" type="password" onChange={onPassword} value={props.imap_password} />
				</FormRow>
				<div className="m1-form-row">
					<Switch onChange={onSSL} checked={props.imap_ssl} /> 启用SSL
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

export default IMAPConfigure