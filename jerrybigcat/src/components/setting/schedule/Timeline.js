import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Moment from './Moment'

const allMoments = (() => {
	let moments = []
	for(let hour = 0; hour < 24; hour++) {
		for(let minute = 0; minute < 60; minute += 10) {
			moments.push({hour,minute})
		}
	}
	return moments
})()

class Timeline extends Component {

	getTimeScopes = ()=> {
		const scheduleWeek = this.props.scheduleWeek || []
		return scheduleWeek.map(item => {
			const interval = item.split('|')
			const startTime = interval[0].split(':')
			const endTime = interval[1].split(':')
			return {
				start: {hour: parseInt(startTime[0]), minute: parseInt(startTime[1])},
				end: {hour: parseInt(endTime[0]), minute: parseInt(endTime[1])},
			}
		})
	}

	checkTimeScope = (moment) => {
		const timeScopes = this.getTimeScopes()
		return timeScopes.some(item => {
			const start = item.start.hour + item.start.minute / 100
			const end = item.end.hour + item.end.minute / 100
			const curr = moment.hour + moment.minute / 100
			return (start <= curr && curr < end)
		})
	}

	checkStart = (moment) => {
		const timeScopes = this.getTimeScopes()
		return timeScopes.some(item => {
			const start = item.start.hour + item.start.minute / 100
			const curr = moment.hour + moment.minute / 100
			return (start === curr )
		})
	}

	render() {
		const { className } = this.props
		return (
			<div className={classnames(
					'timeline',
					className
				)}>
				{allMoments.map((item, i) => {
					return (
						<Moment key={i} on={this.checkTimeScope(item)} start={this.checkStart(item)} />
					)
				})}
			</div>
		)
	}
	
}

export default Timeline