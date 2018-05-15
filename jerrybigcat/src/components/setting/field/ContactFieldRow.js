import React from 'react'
import PropTypes from 'prop-types'

import { Tag, Colors, Sizes } from '../../m1ui'
import ButtonIcon from '../../common/ButtonIcon'
import { SysContact } from '../../../base/system'

const ContactFieldRow = ({item, scope, onModify, onRemove}) => { 
	return (
		<tr>
			<td>{item.label}</td>
			<td>{item.anotherName}</td>
			<td>
				<label>{SysContact.filter.customPrefix['field']}{item.id}</label>
				{!item.system && <Tag color={Colors.IGNORE} size={Sizes.SMALL} >自定义</Tag>}
			</td>
			<td>{SysContact.filter.propertyTypes[item.type]}</td>
			<td>{item.description}</td>
			<td>
				{!item.system && <div className="icon-operation">
													<ButtonIcon name="edit-o" onClick={e => onModify(item.id)} />
													<ButtonIcon name="delete-o" onClick={e => onRemove(item.id)} />
												</div>}
			</td>
		</tr>
	)
}

export default ContactFieldRow