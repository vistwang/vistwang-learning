import React from 'react'
import PropTypes from 'prop-types'

import AddEmails from './AddEmails'

const EmailBlacklist = (props) => {
	return (
		<div className="m1-row">
			<h3>黑名单管理</h3>
			<p>添加到黑名单列表的邮箱或域，所有营销活动将自动过滤，不再发送</p>
			<div className="m1-panel-section blacklist-setting">
				<AddEmails {...props} />
			</div>
		</div>
	)
}

export default EmailBlacklist