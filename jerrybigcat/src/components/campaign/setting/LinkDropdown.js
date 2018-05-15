import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Dropdown, MenuItem } from '../../m1ui'
import LinkDropdownMenu from '../../screening/LinkDropdownMenu'

class LinkDropdown extends Component {

	render() {
		const { linkId, emails, links, onSelect } = this.props
		const link = links.find(item => item.id === linkId) || {}
		return (
			<Dropdown
				isMulti
				title={link.link_name || '请选择链接'}
				className="m1-dropdown-form"
			>
				<LinkDropdownMenu 
					isStatic
					emails={emails}
					links={links}
					onSelect={onSelect}
				/>
			</Dropdown>
		)
	}
}

export default LinkDropdown