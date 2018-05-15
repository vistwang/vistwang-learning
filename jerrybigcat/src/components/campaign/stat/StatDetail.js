import React from 'react'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'

import { Tag, Text, Colors, Sizes } from '../../m1ui'
import StatDetailRows from './StatDetailRows'

const computPrecentage = (count, total) => {
	return total === 0 ? 0 : parseInt(((count / total) * 100).toFixed(2))
}

const checkMost = (reports) => {
	let statIndex = 0
	let indexs = {
		touchedIndex: 0,
		openIndex: 0,
		clickIndex: 0,
		replyIndex: 0,
		interestIndex: 0,
		unsubscribeIndex: 0,
		untouchedIndex: 0,
	}
	let compare = {
		touchedPrecentage: 0,
		openPrecentage: 0,
		clickPrecentage: 0,
		replyPrecentage: 0,
		interestPrecentage: 0,
		unsubscribePrecentage: 0,
		untouchedPrecentage: 0,
	}
	let resultIndexs = {}
	for(let key in reports) {
		if(reports[key]) {
			resultIndexs = reports[key].steps.reduce((prev,step) => {
				const { indexs, compare } = prev
				const item = step.statistics
				item.index = statIndex
				item.touchedPrecentage = computPrecentage(item.touched, item.total)
				item.openPrecentage = computPrecentage(item.opened, item.touched)
				item.clickPrecentage = computPrecentage(item.clicked, item.touched)
				item.replyPrecentage = computPrecentage(item.replied, item.touched)
				item.interestPrecentage = computPrecentage(item.interested, item.touched)
				item.unsubscribePrecentage = computPrecentage(item.unsubscribed, item.touched)
				item.untouchedPrecentage = computPrecentage(item.untouched, item.total)

				if(item.touchedPrecentage > compare.touchedPrecentage) {
					indexs.touchedIndex = statIndex 
					compare.touchedPrecentage = item.touchedPrecentage
				}
				if(item.openPrecentage > compare.openPrecentage) {
					indexs.openIndex =  statIndex
					compare.openPrecentage = item.openPrecentage
				}
				if(item.clickPrecentage > compare.clickPrecentage) {
					indexs.clickIndex =   statIndex 
					compare.clickPrecentage = item.clickPrecentage
				}
				if(item.replyPrecentage > compare.replyPrecentage) {
					indexs.replyIndex =  statIndex
					compare.replyPrecentage = item.replyPrecentage
				}
				if(item.interestPrecentage > compare.interestPrecentage) {
					indexs.interestIndex =  statIndex
					compare.interestPrecentage = item.interestPrecentage
				}
				if(item.unsubscribePrecentage > compare.unsubscribePrecentage) {
					indexs.unsubscribeIndex = statIndex 
					compare.unsubscribePrecentage = item.unsubscribePrecentage 
				}
				if(item.untouchedPrecentage > compare.untouchedPrecentage) {
					indexs.untouchedIndex = statIndex
					compare.untouchedPrecentage = item.untouchedPrecentage
				}
				statIndex++
				return {indexs, compare}
			}, {indexs, compare })
		}
	}
	// console.log(resultIndexs, reports)
	return resultIndexs
}

const StatDetail = ({reports, ...props}) => {
	const {indexs, compare} = checkMost(reports)
	return (
		<div className="stat-detail">
			<h2>详细统计</h2>
			<table className="m1-table">
				<thead>
					<tr>
						<th>步骤</th>
						<th>内容</th>
						<th>触达</th>
						<th>打开</th>
						<th>回复</th>
						<th>点击</th>
						<th>感兴趣</th>
						<th>退订</th>
						<th>未触达</th>
					</tr>
				</thead>
				<tbody>
					{reports.map((report, i) => {
						return (
							<StatDetailRows key={i} steps={report.steps} stepOrder={report.stepOrder} compare={compare} />
						)
					})}
				</tbody>
			</table>
			<ReactTooltip effect='solid'/>
		</div>
	)
}

StatDetail.propTypes = {
	reports: PropTypes.array
}
StatDetail.defaultProps = {
	reports: []
}

export default StatDetail