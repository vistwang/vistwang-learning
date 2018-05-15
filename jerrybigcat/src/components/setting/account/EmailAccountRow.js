import React from 'react'
import PropTypes from 'prop-types'

import { Icon, Colors } from '../../m1ui'
import ButtonIcon from '../../../components/common/ButtonIcon'
import IconCircle from '../../../components/common/IconCircle'

import { SysMail } from '../../../base/system'

const EmailAccountRow = ({item, onEdit, onRemove}) => {
	return (
		<tr>
			<td>
				<IconCircle color={item.enable_use ? Colors.PRIMARY : Colors.IGNORE} />
			</td>
			<td>{item.account_name}</td>
			<td>{item.account_email}</td>
			<td>{SysMail.filter.emailSendTypes[item.send_type]}</td>
			<td>{item.used_count_daily || 0}/{item.count_daily}</td>
			<td>500</td>
			<td>
				<span>
					<ButtonIcon name="edit-o" onClick={e => onEdit(item.email_account_id)} />
					<ButtonIcon name="delete-o" onClick={e => onRemove(item.email_account_id)} />
				</span>
			</td>
		</tr>
	)
}

export default EmailAccountRow