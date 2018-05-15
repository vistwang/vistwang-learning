import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { DropdownMenu } from '../m1ui'
import MenuItemList from './MenuItemList'

class CompanyMenu extends Component {
	render() {
		const {queryTermsCompanys, onSelect} = this.props
		return (
			<DropdownMenu>
				<div className="m1-dropdown-menu-content">
					<MenuItemList 
						canClose
						label="公司属性"
						list={queryTermsCompanys} 
						onSelect={onSelect} 
					/>
				</div>
			</DropdownMenu>
		)
	}
}

export default CompanyMenu