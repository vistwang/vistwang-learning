import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Dropdown, MenuItem } from '../../m1ui'

class TagDropdown extends Component {

	render() {
		const {queryTermsTags, tagId, ...props} = this.props
		const tag = queryTermsTags.find(item => item.id === tagId) || {}
		return (
			<Dropdown className="m1-dropdown-form" title={tag.name || '请选择标签'}>
				{queryTermsTags.map((item, i) => {
					return (
						<MenuItem 
							key={i} 
							eventKey={item.id} 
							onSelect={props.onSelect} 
						>
							{item.name}
						</MenuItem>
					)
				})}
			</Dropdown>
		)
	}
}

export default TagDropdown