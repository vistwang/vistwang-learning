import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Dropdown, MenuItem } from '../../m1ui'

class AutoResponseDropdown extends Component {

	render() {
		const {actionId, autoResponseActions, ...props } = this.props
		const responseAction = autoResponseActions.find(item => item.id === actionId) || {}
		return (
			<Dropdown
				title={responseAction.name || '请选择自动化'}
				className="m1-dropdown-form"
			>
				{autoResponseActions.map((item, i) => {
					return (
						<MenuItem key={i} eventKey={item.id} onSelect={props.onSelect} >{item.name}</MenuItem>
					)
				})}
			</Dropdown>
		)
	}
}

export default AutoResponseDropdown