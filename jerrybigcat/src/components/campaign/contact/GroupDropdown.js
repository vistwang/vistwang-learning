import React from 'react'
import PropTypes from 'prop-types'

import { Dropdown, MenuItem } from '../../m1ui'

const GroupDropdown = ({title, searchKey, groups, placeholder, ...props}) => {
	const filterGroups = searchKey.trim().length === 0 ? groups : groups.filter(group => group.name.toLowerCase().search(searchKey.toLowerCase().trim()) !== -1)
	return (
		<Dropdown
			useInput
			className="m1-dropdown-form full"
			placeholder={placeholder}
			title={searchKey}
			onChange={props.onChange}
		>{filterGroups.map((group, i) => {
				return (
					<MenuItem key={i} eventKey={group.name} onSelect={props.onSelect} >{group.name} ({group.size})</MenuItem>
				)
			})
		}</Dropdown>
	)
}

GroupDropdown.propTypes = {
	title: PropTypes.string,
	searchKey: PropTypes.string,
	groups: PropTypes.array,
}
GroupDropdown.defaultProps = {
	title: '',
	searchKey: '',
	groups: [],
}

export default GroupDropdown