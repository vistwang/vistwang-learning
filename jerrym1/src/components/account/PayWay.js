import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Icon } from '../m1-ui'
import RadioMix from './RadioMix'

import unionpay from '../../assets/images/unionpay.png'

const propTypes = {
	name: PropTypes.string
}

const getPayIcon = name => {
	let icon = ''
	switch(name) {
		case 'alipay':
			icon = <Icon name="alipay" />
			break;
		case 'wxpay':
			icon = <Icon name="wechat-payment" />
			break;
		case 'bankpay':
			icon = <img src={unionpay} />
			break
	}
	return icon
}

class PayWay extends Component {
	constructor(props) {
		super(props)

		this.state = {
			payWays: [{name: 'alipay',text: '支付宝', checked: false},
								{name: 'wxpay',text: '微信支付', checked: false},
								{name: 'bankpay',text: '银行电汇／转账', checked: false}]
		}
	}

	selectHandler = (e) => {
		const { onSelect } = this.props
		const currPay = e.target.value
		const payWays = this.state.payWays.map((item) => {
			item.checked = item.name === currPay ? true : false
			return item;
		})
		this.setState({payWays})
		if(onSelect) {
			onSelect(currPay)
		}
	}

	render() {
		const name = this.props.name || 'pay_way'
		const payWays = this.state.payWays.map((item) => {
			return (<RadioMix className={'payway ' + item.name} name={name} key={item.name} value={item.name} checked={item.checked} onChange={this.selectHandler} >
								<span className={'icon'}>{getPayIcon(item.name)}</span>
								<span className="text">{item.text}</span>
							</RadioMix>)
		})

		return (
			<div className="m1-row">
				<h3>支付方式</h3>
				<div className="m1-row">
					{payWays}
				</div>
			</div>
		)
	}
}

PayWay.propTypes = propTypes

export default PayWay