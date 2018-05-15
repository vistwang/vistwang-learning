import React from 'react'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'

import { Dropdown, MenuItem, Tag, Colors, Sizes } from '../../m1ui'
import ButtonIcon from '../../common/ButtonIcon'
import IconDropdownPanel from '../../common/IconDropdownPanel'

let currentId = 0

const CustomerButtons = ({id, ...props}) => {
	const tooltipId = id || `tooltip${currentId++}`
	return (
		<div className="inbox-btns">
			<ButtonIcon name="email-o" data-for={tooltipId} data-tip="发送邮件" onClick={props.onSendEmail} />
			<ButtonIcon name="people-add" data-for={tooltipId} data-tip="将回复者添加到群组" onClick={props.onAddToGroup} />
			<ButtonIcon name="aircraft-add" data-for={tooltipId} data-tip="将回复者添加到其他营销活动" onClick={props.onAddToCampaign} />
			<ButtonIcon
				className="btn-icon-panel"
				name="sign"
				data-for={tooltipId}
				data-tip="将回复者标记状态"
				onClick={props.onSignState}
			>
				<div className="dropdown-panel recipient-status-box">
					<Tag size={Sizes.SMALL} className="blacklist" onClick={props.onBlacklist} >黑名单</Tag>
				</div>
			</ButtonIcon>
			<ButtonIcon name="delete-o" data-for={tooltipId} data-tip="将回复者从本活动移除" onClick={props.onRemoveRecipient} />
			<ReactTooltip effect="solid" id={tooltipId} />
		</div>
	)
}

CustomerButtons.propTypes = {
	onSendEmail: PropTypes.func,
	onAddToGroup: PropTypes.func,
	onAddToCampaign: PropTypes.func,
	onSignState: PropTypes.func,
	onRemoveRecipient: PropTypes.func,
}

export default CustomerButtons