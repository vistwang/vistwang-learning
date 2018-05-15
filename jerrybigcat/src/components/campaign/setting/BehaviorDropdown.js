import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Dropdown, MenuItem } from '../../m1ui'
import { SysCampaign } from '../../../base/system'

const behaviorList = SysCampaign.behaviorList

class BehaviorDropdown extends Component {

	render() {
		const {event, ...props } = this.props
		const behavior = behaviorList.find(item => item.event === event) || {}
		return (
			<Dropdown
				title={behavior.name || '请选择行为'}
				className="m1-dropdown-form"
			>
				{behaviorList.map((item, i) => {
					return (
						<MenuItem key={i} eventKey={item.event} onSelect={props.onSelect}	>{item.name}</MenuItem>
					)
				})}
			</Dropdown>
		)
	}
}

export default BehaviorDropdown