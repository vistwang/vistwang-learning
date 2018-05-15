import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { MenuItem } from '../m1ui'

const MenuItemList = ({list, label, onSelect, ...props}) => {
	return (
		<div className="m1-dropdown-optgroup">
			<a>{label}</a>
			<ul>
				{list.map((item, i) => {
					return (
						<MenuItem {...props} key={i} eventKey={item.field} onSelect={onSelect} >{item.name}</MenuItem>
					)
				})}
			</ul>
		</div>
	)
}

export default MenuItemList