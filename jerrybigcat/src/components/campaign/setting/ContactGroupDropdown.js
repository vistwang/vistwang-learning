import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Dropdown, MenuItem } from '../../m1ui'
import ContactGroupMenu from '../../screening/ContactGroupMenu'

class ContactGroupDropdown extends Component {
	findGroup = (id) => {
		const {queryTermsGroups} = this.props
		let list = queryTermsGroups.list || []
		let groupItem
		for(let i in list) {
			const item = list[i]
			if(item.relations) {
				groupItem =  item.relations.find(relation => relation.id === id)
				if(!!groupItem) {
					break
				}
			}
		}
		return groupItem
	}
	getGroupName = (id) => { 
		const group = this.findGroup(id) || {}
		return group.name || ''
	}
	render() {
		const { groupId, queryTermsGroups, onSelect } = this.props
		return (
			<Dropdown
				title={this.getGroupName(groupId) || '请选择群组'}
				className="m1-dropdown-form"
			>
				<ContactGroupMenu
					isStatic
					queryTermsGroups={queryTermsGroups}
					onSelect={onSelect}
				/>
			</Dropdown>
		)
	}
}

export default ContactGroupDropdown