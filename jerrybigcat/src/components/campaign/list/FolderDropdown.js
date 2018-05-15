import React from 'react'
import PropTypes from 'prop-types'

import { Dropdown, MenuItem } from '../../m1ui'

const FolderDropdown = ({searchKey, list, placeholder, ...props}) => {
	const filterFolders = searchKey.trim().length === 0 ? list : list.filter(item => item.name.toLowerCase().search(searchKey.toLowerCase().trim()) !== -1)
	return (
		<Dropdown
			useInput
			className="m1-dropdown-form full"
			placeholder={placeholder}
			title={searchKey}
			onChange={props.onChange}
		>{filterFolders.map((item, i) => {
				return (
					<MenuItem key={i} eventKey={item.name} onSelect={props.onSelect} >{item.name}</MenuItem>
				)
			})
		}</Dropdown>
	)
}

FolderDropdown.propTypes = {
	searchKey: PropTypes.string,
	list: PropTypes.array,
}
FolderDropdown.defaultProps = {
	searchKey: '',
	list: [],
}

export default FolderDropdown