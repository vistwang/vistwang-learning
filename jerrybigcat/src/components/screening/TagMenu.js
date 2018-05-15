import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { DropdownMenu } from '../m1ui'
import MenuItemList from './MenuItemList'

class TagMenu extends Component {
	render() {
		const {queryTermsTags, onSelect} = this.props
		return (
			<DropdownMenu>
				<div className="m1-dropdown-menu-content">
					<MenuItemList 
						canClose
						label="标签属性"
						list={queryTermsTags} 
						onSelect={onSelect} 
					/>
				</div>
			</DropdownMenu>
		)
	}
}

export default TagMenu