import React from 'react'
import PropTypes from 'prop-types'

import { Radio, Icon, Colors } from '../../m1ui'

import { SysMail } from '../../../base/system'

const EmailAccountRow = ({item, onRadioSelect}) => {
	return (
		<tr>
			<td>
				<Radio checked={!!item.checked} onChange={e => onRadioSelect(item.email_account_id)} />
			</td>
			<td>{item.account_name}</td>
			<td>{item.account_email}</td>
			<td>{SysMail.filter.emailSendTypes[item.send_type]}</td>
			<td>{item.used_count_daily || 0}/{item.count_daily}</td>
			<td>500</td>
		</tr>
	)
}

export default EmailAccountRow