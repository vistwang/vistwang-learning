import React from 'react'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'

import {utils} from '../../../utils'
import { Tag, Text, Colors, Sizes } from '../../m1ui'
import StatDetailColumn from './StatDetailColumn'

const StatDetailRows = ({steps, stepOrder, compare}) => {
	const stepLabel = `第${utils.numberToChinese(stepOrder)}步`
	const count = steps.length
	const versions = steps.map((item) => item.version)
	const rows = steps.map((step, i) => {
		const isRowSpan = i === 0
		const stepTitle = count > 1 ? (step.version + ' ' + step.title) : step.title
		const statistics = step.statistics
		return <tr key={i} >
							{isRowSpan && <td rowSpan={count} >{stepLabel} {count > 1 && <Tag size={Sizes.SMALL}>{versions.join('/')}</Tag>}</td>}
							<td>{stepTitle}</td>
							<StatDetailColumn count={statistics.touched} total={statistics.total} isMost={statistics.touchedPrecentage === compare.touchedPrecentage} tip="触达效果最佳" />
							<StatDetailColumn count={statistics.opened} total={statistics.touched} isMost={statistics.openPrecentage === compare.openPrecentage} tip="打开效果最佳" />
							<StatDetailColumn count={statistics.replied} total={statistics.touched} isMost={statistics.replyPrecentage === compare.replyPrecentage} tip="回复效果最佳" />
							<StatDetailColumn count={statistics.clicked} total={statistics.touched} isMost={statistics.clickPrecentage === compare.clickPrecentage} tip="点击效果最佳" />
							<StatDetailColumn count={statistics.interested} total={statistics.touched} isMost={statistics.interestPrecentage === compare.interestPrecentage} tip="感兴趣比例最高" />
							<StatDetailColumn count={statistics.unsubscribed} total={statistics.touched} isMost={statistics.unsubscribePrecentage === compare.unsubscribePrecentage} tip="退订比例最高" />
							<StatDetailColumn count={statistics.untouched} total={statistics.total} isMost={statistics.untouchedPrecentage === compare.untouchedPrecentage} tip="未触达比例最高" />
						</tr>
	})

	return rows
}

export default StatDetailRows