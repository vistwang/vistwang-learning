import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { utils, msg, config } from '../../../utils'
import { Radio, Checkbox, Button, Input, Icon, Text, Alert, Colors, Sizes } from '../../../components/m1-ui'
import PayWay from '../../../components/account/PayWay'
import UpgradeVersion from '../../../components/account/UpgradeVersion'
import WxPay from '../../../components/account/WxPay'
import BankPayInfo from '../../../components/account/BankPayInfo'
import BankPay from '../../../components/account/BankPay'

import { getBalance, getCoupons, wxpay, alipay, bankpay, checkOrderStatus, upgrade, goldPay } from '../../../api/account'
import { user } from '../../../base/account'

const gold2money = gold => {
	return gold / 100
}

const payWayName = {
	alipay: '支付宝支付',
	wxpay:  '微信支付',
	bankpay: '银行电汇／转账'
}

class Renew extends Component {
	constructor(props) {
		super(props)

		this.state = {
			version: 1,
			month: 1,

			upgradeType: 'year',

			// 支付总额
			totalPayMoney: 0, 
			// 余额抵扣
			balancePayMoney: 0,
			// 金币抵扣对应钱
			goldPayMoney: 0,
			// 需要支付的金币
			payGold: 0,
			// 额外支付
			otherPayMoney: 0,
			// 赠送礼品
			gift: 0,
			// 支付方式
			payWay: '',
			// 账户余额
			balance: 0,
			// 账户M币
			gold: 0,
			// 账户优惠券
			coupon: 0,
			// 账户M币对应可抵扣额度
			goldMoney: 0,

			balanceChecked: false,
			goldChecked: false,
			couponChecked: false,

			balanceDisabled: false,
			goldDisabled: false,
			couponDisabled: true,

			showWxPayQrcode: false,
			wxpayQrcodeUrl: '',
			trade_id: '',

			showBankPayModal: false,
		}
	}

	componentWillMount() {
		this.initVersionState()
	}

	componentDidMount() {
		this.getBalance()
		this.getCoupons()
	}

	initVersionState(v) {
		const { location } = this.props
		const qs = utils.getSearchParams(location.search)
		const u = qs.get('u') || 'year'
		if(!v) {
			const currVersion = user.cookieInfo.userinfo.accounts[0].version
			v = qs.get('v') || (currVersion === 1 ? 2 : currVersion)	// 	默认当前版本, 免费版默认为黄金版
			
		}
		this.setState({
			version: v,
			upgradeType: u
		})
	}

	getBalance = () => {
		msg.loading()
		getBalance().then(result => {
			msg.close()
			if(result.success) {
				this.computedMoney({
					...this.state,
					balance: result.data.money_balance,
					gold: result.data.coin_balance,
					goldMoney: gold2money(result.data.coin_balance)
				})
			}
		})
	}

	getCoupons = result => {
		getCoupons({status: 1}).then(result => {
			if(result.success) {
				this.setState({
					coupon: result.data.length
				})
			}
		})
	}

	handleWxPayClose = (e) => {
		this.setState({
			showWxPayQrcode: false
		})
	}

	handleSelectPayWay = payWay => {
		this.setState({
			payWay
		})
	}

	handleUpgradeVersionSelect = (month, price) => {
		this.computedMoney({
			...this.state,
			totalPayMoney: price,
			month
		})
	}

	handleBalanceChecked = e => {
		this.computedMoney({
			...this.state,
			balanceChecked: e.target.checked
		})
	}

	handleGoldChecked = e => {
		this.computedMoney({
			...this.state,
			goldChecked: e.target.checked
		})
	}
	handleCouponChecked = e => {
		this.computedMoney({
			...this.state,
			couponChecked: e.target.checked
		})
	}

	handlePaySubmitClick = e => {
		if(!this.checkPaySubmit()) {
			return
		}
		if(this.state.otherPayMoney > 0) {
			this.otherPay()
		} else {
			this.upgradeConfirm()
		}
	}

	checkPaySubmit() {
		const { totalPayMoney, otherPayMoney, payWay, balance, gold, coupon } = this.state

		let isOk = true
		if(totalPayMoney === undefined || totalPayMoney <= 0) {
			msg.info('请选择充值金额')
			isOk = false
		} else if(totalPayMoney < this.minMoney) {
			msg.info(`最小充值金额为${this.minMoney}元`)
			isOk = false
		} else if(otherPayMoney > 0 && payWay === '') {
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
		const { version, month, payGold, totalPayMoney, otherPayMoney } = this.state
		let paramUrl = `&v=${version}&u=${month}` + (payGold > 0 ? `&gold=${payGold}` : '')
		const param = {
			total_fee: totalPayMoney,
			callback_url: config.DOMAIN + '/account/price/alipay.html?',
			scope: paramUrl,
			for: 'upgrade'
		}
		alipay(param)
	}
	/**
	 * 微信支付
	 */
	wxpay() {
		const { version, month, otherPayMoney, payGold } = this.state
		const paramUrl = `&v=${version}&u=${month}` + (payGold > 0 ? `&gold=${payGold}` : '')
		msg.loading()
		wxpay({
			total_fee:otherPayMoney, 
			type: 'upgrade', 
			scope: paramUrl
		}).then(result => {
			msg.close()
			if(result.success) {
				this.setState({
					trade_id: result.data.trade_id,
					wxpayQrcodeUrl: result.data.qr_code_url,
					showWxPayQrcode: true
				})
				// this.openCheckOrderStatus(result.data.trade_id)
			} else {
				msg.info(result.data)
			}
		})
		
	}

	/**
	 * 银行支付
	 */
	bankpay() {
		const { version, month, otherPayMoney, payGold } = this.state
		const paramUrl = `&v=${version}&u=${month}` + (payGold > 0 ? `&gold=${payGold}` : '')
		msg.loading()
		bankpay({
			total_fee: otherPayMoney,
			type: 'upgrade',
			scope: paramUrl
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

	upgradeConfirm() {
		if(this.state.payGold > 0) {
			goldPay(this.state.payGold).then(this.upgradeVersion)
		} else {
			this.upgradeVersion()
		}
	}

	upgradeVersion = () => {
		const {version, month } = this.state
		msg.loading()
		user.upgradeVersion({version, unit: month}, result => {
			msg.close()
			if(result.success) {
				msg.info('升级成功')
				setTimeout(() => {
					const c = user.prevPage || (config.DOMAIN + '/account/')
					utils.redirectTo(config.DOMAIN + '/payment.html?ref=upgrade&c=' + c)
				}, 2000)
			} else {
				msg.info(result.data)
			}
		})
	}

	/**
	 * 计算各个价格属性，并设置state
	 * @param  {Object} state
	 */
	computedMoney(state) {
		const { totalPayMoney, gift, payWay, balance, gold, coupon, balanceChecked, goldChecked, couponChecked } = state
		const goldMoney = gold2money(gold)

		const balanceDisabled = balance <= 0
		const goldDisabled = gold < 1000
		const couponDisabled = coupon <= 0
		let otherPayMoney = totalPayMoney
		let goldPayMoney = 0
		let balancePayMoney = 0

		if(goldChecked && otherPayMoney > 0) {
			if(otherPayMoney >= goldMoney){
				goldPayMoney = goldMoney
				// otherPayMoney = otherPayMoney - goldMoney
				otherPayMoney = utils.sub(otherPayMoney, goldMoney) // 相减 解决浮点数计算精确丢失问题
			} else {
				goldPayMoney = otherPayMoney
				otherPayMoney = 0
			}
		}
		if(balanceChecked && otherPayMoney > 0) {
			if(otherPayMoney >= balance) {
				balancePayMoney = balance
				// otherPayMoney = otherPayMoney - balance
				otherPayMoney = utils.sub(otherPayMoney, balance)  // 相减 解决浮点数计算精确丢失问题
			} else {
				balancePayMoney = otherPayMoney
				otherPayMoney = 0
			}
		}

		const payGold = goldPayMoney * 100

		this.setState({
			...state,
			goldMoney,
			balanceDisabled,
			goldDisabled,
			couponDisabled,
			otherPayMoney,
			goldPayMoney,
			payGold,
			balancePayMoney,
		})
	}

	render() {
		const { version, month, trade_id, upgradeType, totalPayMoney, gift, otherPayMoney, balancePayMoney, goldPayMoney, goldMoney, payGold, payWay, balance, gold, coupon, 
			balanceChecked, goldChecked, couponChecked, balanceDisabled, goldDisabled, couponDisabled, showWxPayQrcode, wxpayQrcodeUrl, showBankPayModal } = this.state

		
		const outerPayView = (otherPayMoney > 0) && <span>，{payWayName[payWay]}<span className="num">{otherPayMoney}</span>元</span>
		const debtMoneyView = ((otherPayMoney > 0 && totalPayMoney !== otherPayMoney) && <span>，还需支付<span className="num">{otherPayMoney}</span>元</span>)

		const settleView = (totalPayMoney > 0 && <div className="m1-row">
												<h3>结算</h3>
												<p className="settle">
													需支付总额 <span className="num">{totalPayMoney}</span>元
													{goldChecked && <span>，金币抵扣<span className="num">{goldPayMoney}</span>元</span>}
													{balanceChecked && <span>，余额抵扣<span className="num">{balancePayMoney}</span>元</span>}
													{(payWay === '') ? debtMoneyView : outerPayView}
												</p>
											</div>)
		const bankPayView = (payWay === 'bankpay' && <BankPayInfo />)


		return (
			<div className="m1-panel">
				<div className="m1-panel-header">
					<h2>升级套餐</h2>
				</div>
				<div className="m1-panel-content">
					<div className="recharge-content">
						<UpgradeVersion version={version} type={upgradeType} onSelect={this.handleUpgradeVersionSelect} />
						<PayWay name="pay_way" onSelect={this.handleSelectPayWay} />

						<div className="m1-row">
							<h3>抵扣方式</h3>
							<p className="deduct">
								<Checkbox checked={balanceChecked} onChange={this.handleBalanceChecked} disabled={balanceDisabled} >余额抵扣（当前可抵扣<span className="num">{balance}</span>元）</Checkbox>
								<Checkbox checked={goldChecked} onChange={this.handleGoldChecked} disabled={goldDisabled} >使用M币抵扣（当前有<span className="num">{gold}</span>M币可抵扣人民币<span className="num">{goldMoney}</span>元）</Checkbox>
								<Checkbox checked={couponChecked} onChange={this.handleCouponChecked} disabled={couponDisabled}>可用优惠券<span className="num">{coupon}</span>张</Checkbox>
							</p>
						</div>
						{settleView}
						{bankPayView }

						<div className="m1-row">
							<Alert color={Colors.PRIMARY}>
								<h4>升级须知</h4>
								<ul className="m1-ul">
									<li>如当月邮件发送量超过赠送量可使用充值余额抵扣，当月赠送量不可累计到下月。</li>
									<li>无论是版本赠送或者是充值余额，用户均须遵守全部中国法律、法规和规章，不得发布非法、歧视、恐吓、诽谤、色情、淫秽、赌博等违反中国法律的内容，不得上传或者发布垃圾邮件、计算机病毒程序或者恶意代码等，否则M1云端市场部将有权立即终止服务，并不予返还账号充值费用，详细条款请<a href="http://www.m1world.com/terms.html" target="_blank">点击这里</a>进行阅读。</li>
								</ul>
							</Alert>
						</div>

						<div className="m1-row">
							<p>
								<Button color={Colors.PRIMARY} size={Sizes.LARGE} onClick={this.handlePaySubmitClick}>立即支付</Button>
							</p>
						</div>
					</div>

				</div>

				{showWxPayQrcode &&
					<WxPay 
						trade_id={trade_id}
						version={version}
						unit={month}
						gold={payGold}
						show={showWxPayQrcode} 
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

export default Renew
