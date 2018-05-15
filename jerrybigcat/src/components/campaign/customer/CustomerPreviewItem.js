import React from 'react'
import PropTypes from 'prop-types'

import { Checkbox, Tag, Icon, Colors, Sizes } from '../../m1ui'

import IconCircle from '../../common/IconCircle'

const CustomerPreviewItem = ({avatar, name, telephone}) => {
	const hasAvatar = avatar ? avatar.trim().length > 0 : false
	let avatarNode
	if(avatar && avatar.trim().length > 0) {
		avatarNode = <img src={avatar} />
	} else {
		let nameInitial = name.substring(0,1).toUpperCase()
		avatarNode = <span>{nameInitial}</span>
	}
	return (
		<tr>
			<td>
				<div className="avatar">
					{avatarNode}
				</div>
			</td>
			<td>{name}</td>
			<td>{telephone}</td>
		</tr>
	)
}

export default CustomerPreviewItem