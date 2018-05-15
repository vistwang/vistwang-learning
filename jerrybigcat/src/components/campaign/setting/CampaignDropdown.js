import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Dropdown, MenuItem } from '../../m1ui'

class CampaignDropdown extends Component {

	render() {
		const {campaignId, campaigns, ...props } = this.props
		const campaign = campaigns.find(item => item.id === campaignId) || {}
		return (
			<Dropdown
				title={campaign.name || '请选择活动'}
				className="m1-dropdown-form"
			>
				{campaigns.map((item, i) => {
					return (
						<MenuItem key={i} eventKey={item.id} onSelect={props.onSelect}	>{item.name || '未命名营销活动'}</MenuItem>
					)
				})}
			</Dropdown>
		)
	}
}

CampaignDropdown.propTypes = {
	campaignId: PropTypes.number,
	campaigns: PropTypes.array,
}
CampaignDropdown.defaultProps = {
	campaignId: 0,
	campaigns: []
}

export default CampaignDropdown