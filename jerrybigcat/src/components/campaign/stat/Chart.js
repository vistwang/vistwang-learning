import React from 'react'
import PropTypes from 'prop-types'
import { Bar } from 'react-chartjs-2'
import moment from 'moment'

import {utils} from '../../../utils'

const propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
	data: PropTypes.object,
	options: PropTypes.object
}

const defaultProps = {
	width: 600,
	height: 250,
	options: {
		responsive: true,
    legend: {
      position: 'bottom',
      labels: {}
    },
    tooltips: {
      mode: 'index',
      intersect: true
    },
	},
	report: [],
}


const getData = (report) => {
	const labels = []
	const touchedArray = []
	const openArray = []
	const replyArray = []
	const interestArray = []

	const reportArr = [...report]

	if(reportArr.length > 0) {
		const sDate = reportArr[0].date
		const eDate = reportArr[reportArr.length - 1].date
		const sDateMoment = moment(sDate)
		const eDateMoment = moment(eDate)
		const diffDays = eDateMoment.diff(sDateMoment, 'days')

		let currReport = reportArr.shift()
		for(; eDateMoment.diff(sDateMoment,'days') >= 0; sDateMoment.add(1, 'days')) {
			const currReportDateMoment = moment(currReport.date)
			if(sDateMoment.diff(currReportDateMoment, 'days') === 0) {
				const stat = currReport.statistics
				labels.push(sDateMoment.format('YYYY.MM.DD'))
				touchedArray.push(stat.touched)
				openArray.push(stat.opened)
				replyArray.push(stat.replied)
				interestArray.push(stat.interested)
				currReport = reportArr.shift()
			} else {
				labels.push(sDateMoment.format('YYYY.MM.DD'))
				touchedArray.push(0)
				openArray.push(0)
				replyArray.push(0)
				interestArray.push(0)
			}
		}
	}

	// report.forEach((item,i) => {
	// 	const stat = item.statistics
	// 	labels.push(utils.formatDate(item.date))
	// 	touchedArray.push(stat.touched)
	// 	openArray.push(stat.opened)
	// 	replyArray.push(stat.replied)
	// 	interestArray.push(stat.interested)
	// })

	const data = {
		labels,
		datasets : [
			{
				label: '触达',
				// borderWidth: 1,
				backgroundColor : "rgba(29,172,253, 1)",
				// borderColor : "rgba(29, 172, 253,1)",
				data : touchedArray
			},
			{
				label: '打开',
				// borderWidth:1,
				backgroundColor : "rgba(255,200,0, 1)",
				// borderColor : "rgba(151,187,205,1)",
				data : openArray
			},
			{
				label: '回复',
				// borderWidth: 1,
				backgroundColor : "rgba(167,229,108, 1)",
				// borderColor : "rgba(29, 172, 253,1)",
				data : replyArray
			},
			{
				label: '感兴趣',
				// borderWidth:1,
				backgroundColor : "rgba(116,96,238, 1)",
				// borderColor : "rgba(151,187,205,1)",
				data : interestArray
			},
		]
	}

	return data

}

const Chart = ({width, height, options, report}) => {
	const chartData = getData(report || [])
	return (
		<Bar 
			width={width}
			height={height}
			data={chartData}
			options={options}
		/>
	)
}

Chart.propTypes = propTypes
Chart.defaultProps = defaultProps

export default Chart 