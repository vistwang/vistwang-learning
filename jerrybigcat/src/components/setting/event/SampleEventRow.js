import React, {Component} from 'react'
import PropTypes from 'prop-types'

import { Button, Icon, Colors, Sizes } from '../../m1ui'

import { SysContact } from '../../../base/system'

const eventTypes = SysContact.filter.eventTypes

class SampleEventRow extends Component {

	render() {
		const {item, onUse} = this.props

		return (
			<tr>
				<td>{item.name}</td>
				<td>{item.uniqueId}</td>
				<td>{item.description}</td>
				<td>{eventTypes[item.type]}</td>
				<td>
					<Button color={Colors.TEXT} size={Sizes.SMALL} onClick={e => onUse(item)} ><Icon name="add-to" /> 添加使用</Button>
				</td>
			</tr>
		)
	}
}

export default SampleEventRow