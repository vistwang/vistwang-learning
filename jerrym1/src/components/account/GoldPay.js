import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Button, Colors } from '../m1-ui'

import { msg } from '../../utils'
import { goldPay } from '../../api/account'

const gold2Money = gold => {
	return gold / 100
}

const propTypes = {
	gold: PropTypes.number,
	show: PropTypes.bool,
	onClose: PropTypes.func,
	// 支付成功后执行此函数
	onPay: PropTypes.func
}

class GoldPay extends Component {
	constructor(props) {
		super(props)


		this.totalGold = props.gold || 0

		this.state ={
			inputGold: ''
		}
	}

	handleInputGoldChange = e => {
		let inputGold = e.target.value.trim()
		if(inputGold !== '' && parseInt(inputGold) > this.totalGold) {
			msg.info('超出持有金币')
			inputGold = this.totalGold
		}
		this.setState({inputGold})
	}

	handleGoldPayClick = e => {
		const inputGold = parseInt(this.state.inputGold)
		if(isNaN(inputGold) || inputGold <= 0) {
			msg.info('请输入金币数')
		} else {
			goldPay(inputGold).then(this.goldPayResult)
		}
	}

	goldPayResult = result => {
		if(result.success) {
			msg.info('转换成功')
			if(this.props.onClose) {
				this.props.onClose()
			}
			if(this.props.onPay) {
				this.props.onPay(parseInt(this.state.inputGold))
			}
		} else {
			msg.info(result.data)
		}
	}

	render() {
		const { show, onClose, gold, onPay, ...props } = this.props
		const { inputGold } = this.state
		const goldMoney = inputGold === '' ? 0 : gold2Money(inputGold)
		return (
			<Modal 
				{...props}
				className="center"
				show={show}
				onClose={onClose}
				backdrop="static"
				style={{width: '560px'}}
			>
				<Modal.Header>
					<Modal.Title>M币任务列表</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div style={{textAlign: 'center'}}>
						<input type="number" value={this.state.inputGold} onChange={this.handleInputGoldChange} />
						M币 = <span style={{margin: '0 10px'}}>{goldMoney}</span>元
					</div>
						
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={onClose}>取消</Button>
					<Button color={Colors.PRIMARY} onClick={this.handleGoldPayClick}>转换</Button>
				</Modal.Footer>
			</Modal>
		)
	}
}

GoldPay.propTypes = propTypes

export default GoldPay