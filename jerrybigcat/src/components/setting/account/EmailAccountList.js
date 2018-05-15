import React from 'react'
import PropTypes from 'prop-types'

import EmailAccountRow from './EmailAccountRow'

const EmailAccountList = ({accounts, ...props}) => {
	return (
			<table className="m1-table">
				<thead>
					<tr>
						<th>状态</th>
						<th>姓名</th>
						<th>邮箱</th>
						<th>类型</th>
						<th>每日用量</th>
						<th>累计发送量</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{accounts.map((item, i) => 
						<EmailAccountRow  
							{...props}
							key={i}
							item={item}
						/>)}
				</tbody>
			</table>
	)
}

export default EmailAccountList