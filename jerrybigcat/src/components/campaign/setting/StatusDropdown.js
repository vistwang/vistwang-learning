import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Dropdown, MenuItem } from '../../m1ui'
import { SysCampaign } from '../../../base/system'

const addresseeStatus = SysCampaign.filter.addresseeStatus

class StatusDropdown extends Component {
	render() {
		const {statusId, ...props } = this.props
		const statusName = addresseeStatus[statusId] || ''

		let statusList = []
		for(let k in addresseeStatus) {
			statusList.push(<MenuItem key={k} eventKey={k} onSelect={props.onSelect}	>{addresseeStatus[k]}</MenuItem>)
		}
		return (
			<Dropdown
				title={statusName || '请选择状态'}
				className="m1-dropdown-form"
			>
				{statusList}
			</Dropdown>
		)
	}
}

export default StatusDropdown