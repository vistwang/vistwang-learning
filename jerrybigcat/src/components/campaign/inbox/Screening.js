import React from 'react'
import PropTypes from 'prop-types'

import { Checkbox, Dropdown, MenuItem, Icon } from '../../m1ui'
import InboxButtons from './InboxButtons'
import CreateClassifyModal from './CreateClassifyModal'

const Screening = ({checked, checkedCount, onSelectAll, replyTypes, recipients, ...props}) => {
	const hasChecked = checkedCount > 0
	return (
		<div className="container inbox-screening">
			<Checkbox text="全选" checked={checked} onChange={e => onSelectAll(!checked)}  /> {hasChecked && <span className="text-record">已选中 {checkedCount} 条记录</span>}
			{hasChecked && 
			<InboxButtons 
				replyTypes={replyTypes}
				onAddToReplyType={props.onAddToReplyType}
				onAddToCampaign={props.onAddToCampaign}
				onBlacklist={props.onBlacklist}
				onRemoveRecipient={props.onRemoveRecipient}
			/>}
			<Dropdown 
				icon="classification" 
				title="所有回复">
				<MenuItem eventKey={-1} onSelect={props.onSelectReplyType} >所有回复<span>{recipients.length}</span></MenuItem>
				{replyTypes.map((replyType, i) => {
					return (
						<MenuItem 
							key={i}
							eventKey={replyType.id} 
							onSelect={props.onSelectReplyType} >
							{replyType.name}
							<span className="count" >{replyType.size || 0}</span>
							{/*非系统字段可删改*/}
							{!replyType.system && 
								<span className="set" >
									<Icon name="set-up" onClick={e => props.onSettingReplyType(replyType.id)} /> 
									{' '}
									<Icon name="delete-o" onClick={e => props.onRemoveReplyType(replyType.id)} />
								</span>}
						</MenuItem>
					)
				})}
				<li className="btn-add" onClick={props.onCreateReplyType} ><Icon name="add-to" /> 创建新分类</li>
			</Dropdown>
		</div>
	)
}

export default Screening