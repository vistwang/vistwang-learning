import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Radio, Checkbox, Button, Input, Icon, Text, Alert, Colors, Sizes } from '../../../components/m1ui'
import PayWay from '../../../components/account/PayWay'
import RechargeMoney from '../../../components/account/RechargeMoney'
import WxPay from '../../../components/account/WxPay'
import BankPayInfo from '../../../components/account/BankPayInfo'
import BankPay from '../../../components/account/BankPay'

import { PayFor } from '../../../base/enums'
import { msg, utils, config } from '../../../utils'
import { wxpay, alipay, bankpay, checkOrderStatus, getTradeGift } from '../../../api/account'
import m1 from '../../../base/soup'

const gold2money = (gold) => {
	return gold / 100
}

class Recharge extends Component {
	constructor(props) {
		super(props)

		this.gifts = []

		this.adItem = null

		// 最小充值金额
		this.minMoney = 500  
		// 最大充值额
		this.maxMoney = 100000
		// 最小抵扣金币数
		this.minGold = 1000

		this.state = {
			// 支付总额
			totalPayMoney: 0, 
			// 支付方式
			payWay: '',

			showWxPay: false,
			wxpayQrcodeUrl: '',
			trade_id: '',

			showBankPayModal: false,

			// 是否是推广价格
			isPopularize: false,
			// 充值赠送活动列表
			gifts: [],

			adImage: '',
			adLink: '',
			adName: ''
		}
	}

	componentDidMount() {
		// this.startPopularizeCountdown()
		this.getTradeGift()
		// this.getAd()
	}

	getTradeGift() {
		getTradeGift().then(result => {
			if(result.success && result.data.length > 0) {
				this.gifts = result.data
				this.startPopularizeCountdown(result.data)
			}
		})
	}

	startPopularizeCountdown(data) {
		const gift = data[0]
		const timer = setInterval(() => {
			const start = utils.getTimeStamp(gift.starttime)
			const end = utils.getTimeStamp(gift.endtime)
			// const start = utils.getTimeStamp('2017/08/16 00:00:00')
			// const end = utils.getTimeStamp('2017/08/24 00:00:00')
			// const end = utils.getTimeStamp('2017-08-15 21:11:15')
			const now = utils.getTimeStamp() 
			// console.log(start, end, start >= end)
			if(now >= start && now < end) {
				clearInterval(timer)
				this.setState({
					isPopularize: true,
					gifts: data
				})
			} else if(now >= end) {
				clearInterval(timer)
				this.setState({
					isPopularize: false,
					gifts: []
				})
			}
		}, 1000)
	}

	getAd() {
		const startAd = (item) => {
			const timer = setInterval(() => {
				const start = utils.getTimeStamp(item.startTime)
				const end = utils.getTimeStamp(item.endTime)
				const now = utils.getTimeStamp()
				if(now >= start && now < end) {
					clearInterval(timer)
					this.setState({
						adImage: item.image,
						adLink: item.link,
						adName: item.name
					})
				this.adItem = item
				} else if(now >= end) {
					clearInterval(timer)
					this.setState({
						adImage: '',
						adLink: '',
						adName: ''
					})
				this.adItem = null
				}
			}, 1000)
		}
		m1.getAdList(list => {
			if(list.length > 0) {
				startAd(list[0])
			}
		}, {fieldId: 61})
	}

	handleAdClick = e => {
		if(this.adItem) {
			m1.setAdClick(this.adItem.id)
		}
	}


	handleWxPayClose = () => {
		this.setState({
			showWxPay: false
		})
		this.closeCheckOrderState()
	}

	handleSelectPayWay = payWay => {
		this.setState({
			payWay
		})
	}

	handleSelectRechargeMoney = rechargeItem => {
		this.setState({
			totalPayMoney: rechargeItem.money,
			gift: rechargeItem.gift
		})
	}

	handleBalanceChecked = e => {
		this.setState({
			balanceChecked: e.target.checked
		})
	}

	handleGoldChecked = e => {
		this.setState({
			goldChecked: e.target.checked
		})
	}

	handleCouponChecked = e => {
		this.setState({
			couponChecked: e.target.checked
		})
	}

	handlePaySubmitClick = e => {
		if(!this.checkPaySubmit()) {
			return
		}

		if(this.state.totalPayMoney > 0) {
			this.otherPay()
		}
	}

	checkPaySubmit() {
		const { totalPayMoney, payWay, balance, gold, coupon } = this.state

		let isOk = true
		if(totalPayMoney === undefined || totalPayMoney <= 0) {
			msg.info('请选择充值金额')
			isOk = false
		} else if(totalPayMoney < this.minMoney) {
			msg.info(`最小充值金额为${this.minMoney}元`)
			isOk = false
		} else if(totalPayMoney > this.maxMoney) {
			msg.info(`最大充值金额为${this.maxMoney}元`)
			return
		} else if(totalPayMoney > 0 && payWay === '') {
			msg.info('请选择支付方式')
			isOk = false	
		}

		return isOk
	}

	/**
	 * 第三方支付分支
	 */
	otherPay() {
		switch(this.state.payWay) {
			case 'alipay':
				this.alipay()
				break
			case 'wxpay':
				this.wxpay()
				break
			case 'bankpay':
				this.handleBankPayOpen()
				break
		}
	}

	/**
	 * 支付宝支付
	 */
	alipay() {
		const param = {
			totalFee: this.state.totalPayMoney,
			callbackUrl: config.DOMAIN + '/payment.html?',
			scope: '&ref=charge&c=' + config.DOMAIN + '/account/',
			for: PayFor.CHARGE
		}
		alipay(param)
	}

	/**
	 * 微信支付
	 */
	wxpay() {
		msg.loading()
		wxpay({
			total_fee: this.state.totalPayMoney, 
			type: 'charge'
		}).then(result => {
			msg.close()
			if(result.success) {
				this.setState({
					trade_id: result.data.trade_id,
					wxpayQrcodeUrl: result.data.qr_code_url,
					showWxPay: true
				})
			} else {
				msg.info(result.data)
			}
		})
		
	}

	/**
	 * 银行支付
	 */
	bankpay() {
		msg.loading()
		bankpay({
			totalFee: this.state.totalPayMoney,
			type: PayFor.CHARGE
		}).then(result => {
			msg.close()
			if(result.success) {
				this.props.history.push('/bill')
			} else {
				msg.info(result.data)
			}
		})
	}

	handleBankPayOpen() {
		this.setState({
			showBankPayModal: true
		})
	}

	handleBankPayClose = e => {
		this.setState({
			showBankPayModal: false
		})
	}

	handleBankPaySubmit = e => {
		this.bankpay()
	}

	/**
	 * 计算赠送价格
	 * @param  {Array} gifts 赠送活动列表
	 * @param  {Number} money 当前价格
	 */
	computedGift(gifts, money) {
		let gift = 0
		gifts.forEach(item => {
			const terms = item.term.split(',')
			const minMoney = parseInt(terms[0])
			const maxMoney = parseInt(terms[1])
			if(money >= minMoney && money <= maxMoney) {
				gift =  item.amount ? item.amount : (money * item.percent)
			}
		})
		return gift
	}

	isShowGiftView() {
		const { isPopularize, totalPayMoney } = this.state
		if(isPopularize && this.computedGift(this.gifts, totalPayMoney) > 0) {
			return true
		}
		return false
	}

	renderSettleGift(){
		const { gift, totalPayMoney } = this.state
		const giftItem = this.gifts[0]
		const time = giftItem.time
		const currentGift = time > 0 ? (gift / time) : gift
		const leftTime = time - 1
		return (
			<p className="settle">
				需支付 <span className="num">{totalPayMoney}</span>元
				{gift > 0 && <span>，{leftTime > 0 ? '当次' : ''}赠送<span className="num">{currentGift}</span>元</span>}
				，{leftTime > 0 ? '当次' : '实际'}到账<span className="num">{totalPayMoney + (currentGift)}</span>元
				{leftTime > 0 && <span>，剩余赠送金额分{leftTime}次返还</span>}
				。
			</p>
		)
	}

	renderSettleDefault() {
		const { gift, totalPayMoney } = this.state
		return (
			<p className="settle">
				需支付 <span className="num">{totalPayMoney}</span>元
				{gift > 0 && <span>，赠送<span className="num">{gift}元</span></span>}
				，实际到账<span className="num">{totalPayMoney + gift}</span>元
			</p>
		)
	}

	render() {
		const { totalPayMoney, gift, payWay, trade_id, showWxPay, wxpayQrcodeUrl, showBankPayModal, isPopularize, gifts, adImage, adLink, adName } = this.state

		const settleView = (totalPayMoney > 0 && <div className="m1-row">
												<h3>结算</h3>
												{this.isShowGiftView() ? this.renderSettleGift() : this.renderSettleDefault()}
											</div>)
		const bankPayView = (payWay === 'bankpay' && <BankPayInfo type="charge" />)

		return (
			<div className="m1-panel">
				<div className="m1-panel-header">
					<h2>账户充值</h2>
				</div>
				<div className="m1-panel-content">
					<div className="recharge-content">
						{adImage && 
							<div className="ad">
								<a href={adLink || null} target="_blank" >
									<img src={adImage} title={adName} onClick={this.handleAdClick}/>
								</a>
							</div>}
						<RechargeMoney name="recharge_money" isPopularize={isPopularize} gifts={gifts} onSelect={this.handleSelectRechargeMoney} />

						<PayWay name="pay_way" onSelect={this.handleSelectPayWay} />

						{settleView}
						{bankPayView}

						<div className="m1-row">
							<Alert color={Colors.PRIMARY}>
								<h4>充值须知</h4>
								<ul className="m1-ul">
									<li>账户充值余额可用于补充所选套餐内超额邮件发送量的消费等</li>
									<li>账户充值金额将永久保留在当前充值账户，如无特殊情况，不能转出或提现。</li>
									<li>无论是版本赠送或者是充值余额，用户均须遵守全部中国法律、法规和规章，不得发布非法、歧视、恐吓、诽谤、色情、淫秽、赌博等违反中国法律的内容，不得上传或者发布垃圾邮件、计算机病毒程序或者恶意代码等，否则M1云端市场部将有权立即终止服务，并不予返还账号充值费用，详细条款请<a href="http://www.m1world.com/terms.html" target="_blank">点击这里</a>进行阅读。</li>
								</ul>
							</Alert>
						</div>
						<div className="m1-row">
							<Button color={Colors.PRIMARY} size={Sizes.LARGE} onClick={this.handlePaySubmitClick}>立即支付</Button>
						</div>
					</div>

				</div>

				{showWxPay &&
					<WxPay 
						trade_id={trade_id}
						show={showWxPay} 
						onClose={this.handleWxPayClose} 
						qrcodeUrl={wxpayQrcodeUrl} 
					/>}

				{showBankPayModal && 
					<BankPay
						show={showBankPayModal}
						onClose={this.handleBankPayClose}
						onSubmit={this.handleBankPaySubmit}
					/>}
			</div>
		)
	}
}

export default Recharge
