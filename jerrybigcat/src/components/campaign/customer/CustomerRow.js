import React from 'react'
import PropTypes from 'prop-types'

import {utils} from '../../../utils'
import { Checkbox, Tag, Icon, Colors, Sizes } from '../../m1ui'

import IconCircle from '../../common/IconCircle'

const CustomerRow = ({customer, onChecked}) => {
	const mark = customer.mark || {}
	const step = customer.currentStep === 0 ? 1 : customer.currentStep //0 表示先保留的  就是还未发送的意思 归位第一步
	const emails = JSON.parse(customer.email || '[{"item": ""}]')
	console.log(JSON.parse(customer.extraFields))
	return (
		<tr>
			<td><Checkbox checked={!!customer.checked} onChange={e => onChecked(!customer.checked, customer.id)} /></td>
			<td>{customer.fullname}</td>
			<td>{emails[0].item}</td>
			<td>
				{mark.touchedCount && <Tag size={Sizes.SMALL} >已触达</Tag>}
				{mark.repliedCount && <Tag size={Sizes.SMALL} color={Colros.SUCCESS} >已回复</Tag>}
				{mark.hardBulletCount && <Tag size={Sizes.SMALL} color={Colros.DANGER} >硬弹</Tag>}
				{mark.softBulletCount && <Tag size={Sizes.SMALL} color={Colros.DANGER} >软弹</Tag>}
			</td>
			<td><IconCircle color={Colors.PRIMARY} /> <span>{customer.touchedCount}</span></td>
			<td><IconCircle color={Colors.WARNING} /> <span>{customer.openedCount}</span></td>
			<td><IconCircle color={Colors.SUCCESS} /> <span>{customer.repliedCount}</span></td>
			<td>第{utils.numberToChinese(step)}步</td>
			<td></td>
		</tr>
	)
}

CustomerRow.propTypes = {
	customer: PropTypes.object,
	onChecked: PropTypes.func,
}

export default CustomerRow