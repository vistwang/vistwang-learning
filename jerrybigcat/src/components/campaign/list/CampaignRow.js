import React from 'react'
import PropTypes from 'prop-types'

import { Checkbox, Icon, Text, Switch, Dropdown, MenuItem, Colors } from '../../m1ui'

import { SysCampaign } from '../../../base/system'
import { CampaignStatus } from '../../../base/enums'

const campaignTypes = SysCampaign.filter.campaignTypes


const propTypes = {
	onEdit: PropTypes.func,
	item: PropTypes.object,
}

const defaultProps = {
	item: {
		id: 0,
		name: "",
		target_count: 0,
		edm_opened_count: 0,
		edm_clicked_count: 0,
		edm_reply_count: 0,
		type: 0,
		target_condition: '',
		status: 0,
		checked: false,
	}
}

const getReplyColor = (precentage) => {
	let color
	if(precentage >= 5) {
		color = Colors.SUCCESS
	} else if(precentage >= 3 && precentage < 5) {
		color = null
	} else {
		color = Colors.DANGER
	}
	return color
}

const CampaignRow = ({onEdit, onCheck, onRemove, onStatus, item, onStatistic, ...props}) => {
	const status = CampaignStatus.RUNNING === item.status 
	const nextStatus = status ? CampaignStatus.STOP : CampaignStatus.RUNNING
	const openedPercentage = !item.target_count ? 0 : item.edm_opened_count / item.target_count * 100
	const clickedPercentage = !item.target_count ? 0 : item.edm_clicked_count / item.target_count * 100
	const repliedPrecentage = !item.target_count ? 0 : item.edm_reply_count / item.target_count * 100
	return (
		<tr>
			<td><span><Checkbox checked={!!item.checked} onClick={e => onCheck(item.id)}/></span></td>
			<td><a onClick={e => onStatistic(item.id)} >{item.name || '未命名营销活动'}</a></td>
			<td>{item.target_count || 0}</td>
			<td>{openedPercentage}% ({item.edm_opened_count || 0})</td>
			<td>{clickedPercentage}% ({item.edm_clicked_count || 0})</td>
			<td><Text color={getReplyColor(repliedPrecentage)} >{repliedPrecentage}% ({item.edm_reply_count || 0})</Text></td>
			<td>{campaignTypes[item.type]}</td>
			<td>
				<Switch 
					checked={status}
					onChange={e => onStatus(item.id, nextStatus)} 
					onClick={e => onStatus(item.id, nextStatus)} 
					/>
			</td>
			<td className="col-operation">
				<Dropdown
					color={Colors.TEXT}
					title="编辑"
				>
					<MenuItem eventKey={item.id} onSelect={onEdit}>编辑</MenuItem>
					<MenuItem eventKey={item.id} onSelect={onRemove} >删除</MenuItem>
				</Dropdown>
			</td>
		</tr>
	)
}

CampaignRow.propTypes = propTypes
CampaignRow.defaultProps = defaultProps

export default CampaignRow