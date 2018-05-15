import React from 'react'
import PropTypes from 'prop-types'

import {Dropdown, MenuItem} from '../m1ui'

const hours = (() => {
	const h = []
	for(let i = 0; i <= 12; i++) {
		h.push(i)
	}
	return h
})()

const minutes = (() => {
	const m = []
	for(let i = 0; i < 60; i += 10) {
		m.push(i)
	}
	return m
})()


const TimePicker = ({...props}) => {
	return (
		<div className="time-picker">
			<Dropdown className="m1-dropdown-form" title={props.ampm === 'am' ? '上午' : '下午'}>
				<MenuItem onSelect={e => props.onAmPm('am')}>上午</MenuItem>
				<MenuItem onSelect={e => props.onAmPm('pm')}>下午</MenuItem>
			</Dropdown>
			<Dropdown className="m1-dropdown-form" title={String(props.hour)}>
				{hours.map((h) => (
					<MenuItem key={h} eventKey={h} onSelect={e => props.onHour(h)}>{h}</MenuItem>
				))}
			</Dropdown>
			<Dropdown className="m1-dropdown-form" title={String(props.minute)}>
				{minutes.map(m => (
					<MenuItem key={m} eventKey={m} onSelect={e => props.onMinute(m)} >{m}</MenuItem>
				))}
			</Dropdown>
		</div>
	)
}

export default TimePicker