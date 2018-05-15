import React from 'react'
import PropTypes from 'prop-types'

const EmailSafe = ({interval, max, onIntervalChange, onMaxChange}) => {
	return (
		<div className="m1-row">
			<h3>邮件安全设置</h3>
			<p>配置单封发送邮件的间隔时间以及针对同一个邮箱的每日最大发送量</p>
			<div className="m1-panel-section">
				<div className="m1-form safe-setting">
					<div className="m1-form-row send-interval">
						<label className="m1-form-label">每封邮件发送间隔时间</label>
						<div className="m1-form-content">
							<input 
								className="m1-form-input"  
								value={interval}
								onChange={onIntervalChange}
							/> 秒
						</div>
						<span className="setting-intro">依据业务需求配置，可保护您的发送账号不被邮件服务商限制发送</span>
					</div>
					<div className="m1-form-row send-max">
						<label className="m1-form-label">每天向同一邮箱发送的最大邮件数量</label>
						<div className="m1-form-content">
							<input 
								className="m1-form-input" 
								value={max}
								onChange={onMaxChange}
							/> 封
						</div>
						<span className="setting-intro">一句业务需求配置，可保护您的发送账号不被邮件服务商限制发送</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default EmailSafe