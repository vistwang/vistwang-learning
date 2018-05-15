import React from 'react'
import PropTypes from 'prop-types'

import { Checkbox, Tag, Sizes, Colors } from '../../m1ui'
import { utils } from '../../../utils' 

const contentElement = document.createElement('div') 

const InboxRow = ({onDetail, recipient, ...props}) => {
	const emails = JSON.parse(recipient.email || '[{"item": ""}]')
	contentElement.innerHTML = recipient.content
	let contentText = contentElement.textContent
	contentText = contentText.substring(0, 200)
	return (
		<tr>
			<td><Checkbox checked={!!recipient.checked} onChange={e => props.onSelect(recipient.id, !recipient.checked)} /></td>
			<td>{recipient.fullname}</td>
			<td><a onClick={e => onDetail(recipient.id)}>{emails[0].item}</a></td>
			<td>
				<div>
					<Tag size={Sizes.SMALL}>发出</Tag>
				  <p>{recipient.subject}</p>
				</div>
			  </td>
			<td>
				<div>
					<Tag size={Sizes.SMALL}>回复</Tag>
					<p>{contentText}</p>
				</div>
			</td>
			<td>{utils.formatDate(recipient.gmtCreate || 1514736000000)}</td>
		</tr>
	)
}

InboxRow.PropTypes = {
	onDetail: PropTypes.func,
	recipient: PropTypes.object,
}

InboxRow.defaultProps = {
	recipient: {
		id: 0,
		fullname: '',
		subject: '',
		content: '',
		email: [{item: ''}],
		gmtCreate: 1514736000000
	}
}

export default InboxRow