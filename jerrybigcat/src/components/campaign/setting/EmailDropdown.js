import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { DropdownMenu, MenuItem } from '../../m1ui'

class EmailDropdown extends Component {

	render() {
		const {title, emails, onSelect, ...props } = this.props
		return (
			<DropdownMenu>
				<div className="m1-dropdown-menu-content">
					<div className="m1-dropdown-optgroup">
						<a>{title}</a>
						<ul>
							{emails.map((item, i) => {
								return (
									<MenuItem {...props} key={i} eventKey={item.task_id} onSelect={onSelect} >{item.subject}</MenuItem>
								)
							})}
						</ul>
					</div>
				</div>
			</DropdownMenu>
		)
	}
}

export default EmailDropdown