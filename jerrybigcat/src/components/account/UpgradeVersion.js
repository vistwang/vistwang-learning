import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { utils } from '../../utils'
import InputNumber from './InputNumber'
import RadioMix from './RadioMix'

import { user } from '../../base/system'

const propTypes = {
	type: PropTypes.string,
	mouth: PropTypes.number,
	version: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	onSelect: PropTypes.func
}

class UpgradeVersion extends Component {
	constructor(props) {
		super(props)

		this.versionInfo = user.versionPrices[0]

		this.maxMonth = 9
		this.minMonth = 1

		this.toYear = false

		this.state = {
			month: 1,
			type: 'month'
		}
	}

	componentWillMount = () => {
		this.initVersionState()
	}

	initVersionState() {
		const { version, month, type } = this.props
		const versionInfo = user.versionPrices.find((item) => {
			return version == item.version
		})
		const m = month || 1
		const t = type || 'month'
		this.versionInfo = versionInfo
		this.setState({
			month: m,
			version: version || 2,
			type: t,
			monthInfo: versionInfo.month,
			yearInfo: versionInfo.year,
		})

		this.selectSubmit(t, m)

	}

	handleTypeChange = e => {
		let type = e.target.value
			if(this.toYear) {
				this.toYear = false
				type = 'year'
			}
			this.handleTypeSelect(type)
	}

	handleMonthChange = value => {
		const month = parseInt(value || 1)
		if(month >= this.maxMonth && this.state.month === this.maxMonth) {
			this.toYear = true
			this.handleTypeSelect('year')
		} else {
			this.setState({ month })
			this.handleTypeSelect('month')
		}
	}

	handleMonthFocus = e => {
		this.handleTypeSelect('month')
	}
	handleMonthBlur = e => {
		let month = parseInt(e.target.value.trim() || 1)
		month = month < this.minMonth ? this.minMonth : month
		month = month > this.maxMonth ? this.maxMonth : month

		this.setState({month})	
	}

	handleTypeSelect = type => {
		this.setState({
			type
		})

		this.selectSubmit(type)
	}

	selectSubmit(type, m) {
		const { onSelect } = this.props
		if(onSelect) {
			let month, totalPrice
			if(type === 'year') {
				month = 12
				totalPrice = this.versionInfo.year.price
			} else {
				month = m || this.state.month
				totalPrice = this.versionInfo.month.price * month
			}
			onSelect(month, totalPrice)
		}
	}

	render() {

		const { type, month, monthInfo, yearInfo } = this.state

		const yearChecked  = type === 'year'
		const monthChecked = type === 'month'
		const yearPrice = yearInfo.price
		const monthTotalPrice = monthInfo.price * month

		return (
			<div className="m1-row">
				<h3>版本：{user.filter.versionNames[this.versionInfo.version]}</h3>
				<div className="m1-row">

					<RadioMix checked={monthChecked}  onChange={this.handleTypeChange} value="month">
						<InputNumber onChange={this.handleMonthChange} onFocus={this.handleMonthFocus} onBlur={this.handleMonthBlur} value={month} min={this.minMonth} max={this.maxMonth} />月
						<strong className="money-number">{monthTotalPrice}</strong>元
					</RadioMix>
					<RadioMix checked={yearChecked}  onChange={this.handleTypeChange} value="year">
						<strong className="money-number">{yearPrice}</strong>元／年
					</RadioMix>
				</div>

			</div>
		)
	}
}

UpgradeVersion.propTypes = propTypes

export default UpgradeVersion

