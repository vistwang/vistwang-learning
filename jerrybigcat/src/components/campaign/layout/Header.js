import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Icon, Colors } from '../../m1ui'
import { CampaignStatus } from '../../../base/enums'

const Header = ({campaignName, status, ...props}) => {
	const isRunning = status === CampaignStatus.RUNNING
	const isStopped = status === CampaignStatus.STOP
	const nextStatus = isRunning ? CampaignStatus.STOP : CampaignStatus.RUNNING
	const statusLabel = isRunning ? '进行中' : (isStopped ? '停止运行' : '草稿') 
	return (
		<div className="header">
			<h2 className="title">
				<input 
					placeholder="这里是本次活动名称" 
					value={campaignName} 
					onChange={props.onCampaignNameChange} 
					onBlur={props.onCampaignNameBlur}
				/>
			</h2>
			<Icon name="edit-o" />
			<span className="btn-save">
				{statusLabel} <Switch checked={isRunning} onChange={e => props.onCampaignStatusChange(nextStatus)} />
			</span>
		</div>
	)
}

Header.propTypes = {
	campaignName: PropTypes.string,
	status: PropTypes.number,
	onCampaignNameChange: PropTypes.func,
	onCampaignNameBlur: PropTypes.func,
	onCampaignStatusChange: PropTypes.func,
}

export default Header