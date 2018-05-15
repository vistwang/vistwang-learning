import React from 'react'
import PropTypes from 'prop-types'
import {utils} from '../../../utils'
import ButtonIcon from '../../common/ButtonIcon'

import { SysContact } from '../../../base/system'

const EventRow = ({item, onEdit, onRemove}) => {
	return (
		<tr>
			<td>{item.name}</td>
			<td>{SysContact.filter.customPrefix['event']}{item.uniqueId}</td>
			<td>{item.description}</td>
			<td>{item.source || ''}</td>
			<td>{utils.formatDateTime(item.gmtCreate)}</td>
			<td>
				<div className="icon-operation">
					<ButtonIcon name="edit-o" onClick={e => onEdit(item.id)} />
					<ButtonIcon name="delete-o" onClick={e => onRemove(item.id)} />
				</div>
			</td>
		</tr>
	)
}

EventRow.propTypes = {
	item: PropTypes.object,
	onEdit: PropTypes.func,
	onRemove: PropTypes.func,
}

export default EventRow