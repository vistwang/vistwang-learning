import React from 'react'
import PropTypes from 'prop-types'

import { Switch } from '../../m1ui'
import FormRow from '../../common/FormRow'

const EmailConfigureBase = ({onDiffServer, onDiffEmailUsername, onUsername, onEmail,onSender, ...props}) => {
	return (
		<div className="container">
			<div className="m1-row">
				<Switch onChange={onDiffServer} checked={props.diff_server} /> 我要使用不同的邮件接收和发送服务器
			</div>
			{!props.diff_server && <div className="m1-row">
							<div className="m1-col-6">
								<FormRow
									label="邮箱："
								>
									<input className="m1-form-input" onChange={onEmail} value={props.server_email} />
								</FormRow>
							</div>
							<div className="m1-col-6">
								<FormRow
									label="发件人名称："
								>
									<input className="m1-form-input" onChange={onSender} value={props.server_sender_name} />
								</FormRow>
							</div>
						</div>}
			{!props.diff_server && <div className="m1-row">
							<Switch onChange={onDiffEmailUsername} checked={props.diff_email_username} /> 我的邮箱地址和用户名不同
						</div>}
			{!props.diff_server && props.diff_email_username && 
				<div className="m1-row">
					<FormRow label="用户名：" >
						<input className="m1-form-input" onChange={onUsername} value={props.server_username} />
					</FormRow>
				</div>}
		</div>
	)
}

export default EmailConfigureBase