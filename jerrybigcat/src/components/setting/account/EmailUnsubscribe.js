import React from 'react'
import PropTypes from 'prop-types'

import { Radio, Dropdown, MenuItem } from '../../m1ui'

import ContentEditable from '../../common/ContentEditable'

const EmailUnsubscribe = ({onUnsubscribeType, onUnsubscribeName, onUnsubscribeContent, unsubscribe_type, unsubscribe_name,unsubscribe_content, ...props}) => {
	return (
		<div className="email-unsubscribe">
			<div className="unsubscribe-type">
				<Radio onChange={e => onUnsubscribeType(0)} checked={unsubscribe_type === 0} >通过回复邮件退订</Radio>
				<Radio onChange={e => onUnsubscribeType(1)} checked={unsubscribe_type === 1} >通过点击链接退订</Radio>
			</div>
			<div className="unsubscribe-link">
				<ContentEditable
					className="m1-input"
					html={unsubscribe_name}
					onChange={onUnsubscribeName}
				/>
			</div>
			<div className="unsubscribe-contact">
				<Dropdown 
					title="插入动态变量"
					className="m1-dropdown-form"
				>
					<MenuItem>姓名</MenuItem>
					<MenuItem>电话</MenuItem>
					<MenuItem>称谓</MenuItem>
				</Dropdown>
			</div>
			<div className="unsubscribe-content">
				<textarea onChange={onUnsubscribeContent} value={unsubscribe_content} />
			</div>
		</div>
	)
}

export default EmailUnsubscribe