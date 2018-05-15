import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Input } from '../m1-ui'
import RadioMix from './RadioMix'

const propTypes = {
	name: PropTypes.string,
	isPopularize: PropTypes.bool
}

// ------------------推广价格----------------
const recharges_popularize = [{type: 1, money: 500,  gift: 0,   checked: false},
															{type: 2, money: 1000, gift: 1000,  checked: false},
															{type: 3, money: 3000, gift: 3000, checked: false},
															{type: 4, money: 5000, gift: 5000, checked: false},
															{type: 5, money: 0, 	 gift: 0,   checked: false}]
// -----------------------------------------

const recharges_default = [{type: 1, money: 500,  gift: 0,   checked: false},
													{type: 2, money: 1000, gift: 60,  checked: false},
													{type: 3, money: 3000, gift: 240, checked: false},
													{type: 4, money: 5000, gift: 500, checked: false},
													{type: 5, money: 0, 	 gift: 0,   checked: false}]

class RechargeMoney extends Component {
	constructor(props) {
		super(props)

		this.customMoney = 0

		this.isUpdate = false

		this.state = {
			recharges: props.isPopularize ? recharges_popularize : recharges_default,
			
			customMoney: ''
		}
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.isPopularize !== this.props.isPopularize) {
			let recharges
			if(nextProps.isPopularize){
				this.handlePopularizeChange(recharges_popularize) 
			} else {
				this.handlePopularizeChange(recharges_default)
			}
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if(this.isUpdate) {
			this.isUpdate = false
			const recharge = prevState.recharges.find(item => item.checked)
			if(recharge) {
				const type = recharge.type
				if(type === 5) {
					this.inputChangeComputed()
				} else {
					this.handleSelect(type)
				}
			}
		}
	}

	handlePopularizeChange(curr_recharges) {
		const recharges = this.state.recharges.map((item, i) => {
			item.gift = curr_recharges.find(currItem => currItem.type === item.type).gift
			return item
		})
		this.isUpdate = true
		this.setState({ recharges })
	}

	handleChange = e => {
		const type = parseInt(e.target.value)
		this.handleSelect(type)
	}

	handleFocus = e => {
		this.handleSelect(5)
	}

	handleInputChange = e => {
		const customMoney = e.target.value.trim()
		this.setState({
			customMoney
		})

		this.customMoney = customMoney !== '' ? parseFloat(parseFloat(customMoney).toFixed(2)) : 0

		this.inputChangeComputed()
	}

	inputChangeComputed() {

		let rechargeItem = this.state.recharges.find(item => item.type === 5)
		rechargeItem.money = this.customMoney

		if(this.props.isPopularize) {
			// ---------临时推广------------
			if(this.customMoney >= 1000) {
				rechargeItem.gift = this.customMoney
			} else {
				rechargeItem.gift = 0
			}
			// ------------------------------
		} else {
			if(this.customMoney >= 5000) {
				rechargeItem.gift = 500
			} else if(this.customMoney >= 3000 && this.customMoney < 5000) {
				rechargeItem.gift = 240
			} else if(this.customMoney >= 1000 && this.customMoney < 3000) {
				rechargeItem.gift = 60
			} else {
				rechargeItem.gift = 0
			}
			
		}

		this.handleSelectEvent(rechargeItem)
	}

	handleBlur = e => {
		const customMoney = e.target.value.trim()
		this.setState({
			customMoney: customMoney !== '' ? parseFloat(customMoney).toFixed(2) : ''
		})
	}

	handleSelect = type => {
		let rechargeItem = {}
		const recharges = this.state.recharges.map((item,i) => {
			if(item.type === type) {
				item.checked = true
				rechargeItem = item
			} else {
				item.checked = false
			}
			return item
		})
		this.setState({
			customMoney: (type === 5 && this.customMoney  > 0) ? this.customMoney  : '',
			recharges
		})

		this.handleSelectEvent(rechargeItem)
	}

	handleSelectEvent(rechargeItem) {
		const { onSelect } = this.props
		if(onSelect) {
			onSelect(rechargeItem)
		}
	}

	render() {
		const name = this.props.name || 'recharge_money'
		const rechargeList = this.state.recharges.map((item,i) => {
			if(item.type !== 5) {
				return (<RadioMix name={name} checked={item.checked}  onChange={this.handleChange} key={item.type} value={item.type}>
									<strong className="money-number">{item.money}</strong>元
									{item.gift === 0 ? null : <span className="gift">{!this.props.isPopularize && '立'}送{item.gift}元</span>}
								</RadioMix>)
				
			} else {
				return (<RadioMix name={name} checked={item.checked}  onChange={this.handleChange} key={item.type} value={item.type}>
									自定义金额：<Input type="number" onFocus={this.handleFocus} onBlur={this.handleBlur} value={this.state.customMoney} onChange={this.handleInputChange} placeholder="最小充值金额为500元" />
								</RadioMix>)
			}
		})

		return (
			<div className="m1-row">
				<h3>充值金额</h3>
				<div className="m1-row">
						{rechargeList}
				</div>
			</div>
		)
	}
}

RechargeMoney.propTypes = propTypes

export default RechargeMoney