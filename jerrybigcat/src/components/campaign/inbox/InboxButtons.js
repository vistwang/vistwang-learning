import React from 'react'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'

import { Dropdown, MenuItem, Tag, Sizes, Colors } from '../../m1ui'
import ButtonIcon from '../../common/ButtonIcon'

let currentId = 0

const InboxButtons = ({id, replyTypes, ...props}) => {
	const tooltipId = id || `tooltip${currentId++}`
	return (
		<div className="inbox-btns">
			<Dropdown
				toggleClassName="btn-icon"
				icon="classification"
				title=" "
				noCaret
				data-for={tooltipId} 
				data-tip="添加到分类"
			>
				{replyTypes.map((replyType, i) => {
					return (
						<MenuItem key={i} eventKey={replyType.id} onSelect={props.onAddToReplyType} >{replyType.name}</MenuItem>
					)
				})}
			</Dropdown>
			<ButtonIcon name="aircraft-add" data-for={tooltipId} data-tip="将回复者添加到其他营销活动" onClick={props.onAddToCampaign} />
			<ButtonIcon
				className="btn-icon-panel"
				name="sign"
				data-for={tooltipId}
				data-tip="将回复者标记状态"
			>
				<div className="dropdown-panel recipient-status-box">
					<Tag size={Sizes.SMALL} className="blacklist" onClick={props.onBlacklist} >黑名单</Tag>
				</div>
			</ButtonIcon>
			<ButtonIcon name="delete-o" data-for={tooltipId} data-tip="删除所选回复内容" onClick={props.onRemoveRecipient} />
			<ReactTooltip effect="solid" id={tooltipId} />
		</div>
	)
}

InboxButtons.propTypes = {
	replyTypes: PropTypes.array,
}
InboxButtons.defaultProps = {
	replyTypes: []
}

export default InboxButtons