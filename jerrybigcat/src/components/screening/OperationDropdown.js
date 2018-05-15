import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Dropdown, MenuItem } from '../m1ui'

class OperationDropdown extends Component {

	render() {
		const {operations, title, ...props} = this.props
		return (
			<Dropdown className="m1-dropdown-form" title={title || ' '}>
				{operations.map((item, i) => {
					return (
						<MenuItem 
							key={i} 
							eventKey={item.operation} 
							onSelect={props.onSelectOperation} 
						>
							{item.name}
						</MenuItem>
					)
				})}
			</Dropdown>
		)
	}
}

export default OperationDropdown