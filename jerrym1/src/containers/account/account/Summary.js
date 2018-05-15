import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Loop, Button, Switch, Icon, Colors, Sizes } from '../../../components/m1-ui'
import { utils, msg } from '../../../utils'
import { user } from '../../../base/account'

import { 
	getSummary,
	editService,
	closeMService, 
	openMService, 
	getBalance ,
	getAccountBalance,
	getCoupons,
	getGoldList,
	getGoldDetail,
	getInviteList
} from '../../../api/account'

import InfoBox from '../InfoBox'
import GoldTaskList from '../../../components/account/GoldTaskList'
import GoldDetail from '../../../components/account/GoldDetail'
import GoldPay from '../../../components/account/GoldPay'
import CouponDetail from '../../../components/account/CouponDetail'


class Summary extends Component {
	constructor(props) {
		super(props)

		this.state = {
			version: 1,
			isOpenLogoVersion: false,
			hideM1Logo: false,
			accountView: null,
			startTime: 1483200000000,
			expireTime: 1483200000000,
			formatExpireTime: '',
			validDay: 0,
			totalDay: 1,
			useDay: 0,
			useDayPercentage: 0,
			money_balance: 0,
			gold_balance: 0,
			email_count: 0,
			sms_count: 0,
			profit: 0,
			coupons: [],
			invites: [],

			goldTasks: [],

			showGoldTaskList: false,
			showGoldDetail: false,
			showGoldPay: false,
			showCouponDetail: false,

			balanceLoading: false,
			accountBalanceLoading: false,
			couponLoading: false,
			inviteLoading: false
		}
	}

	componentWillMount() {
		this.loadSummary()
		this.loadBalance()
		this.loadAccountBalance()
		this.loadCoupons()
		this.loadInvites()
	}

	loadSummary = () => {
		const self = this
		getSummary().then(result => {
			// console.log(data)
			if(result.success) {
				const data = result.data
				const account = data.account
				const version = account.version
				const expireTime = account.expireTime
				const startTime = account.startTime
				const profit = data.profit
				const formatExpireTime = utils.formatDate(expireTime)
				const validDay = expireTime - utils.getTimeStamp() >= 0 ? parseInt((expireTime - utils.getTimeStamp()) / (1000 * 60 * 60 * 24)) : 0
				const totalDay = (expireTime - startTime) / (1000 * 60 * 60 * 24)
				const useDay = totalDay - validDay;
				const useDayPercentage = validDay > 0 ? parseInt((useDay / totalDay) * 100) : 100
				const isOpenLogoVersion = [2,3].indexOf(version) >= 0
				const hideM1Logo =  isOpenLogoVersion ? true : (data.mservice.length && data.mservice[0] === 1)
				
				self.setState({
					version,
					isOpenLogoVersion,
					hideM1Logo,
					startTime,
					expireTime,
					profit,
					formatExpireTime,
					validDay,
					totalDay,
					useDay,
					useDayPercentage
				})
			}
		})
	}

	loadBalance = () => {
		const self = this
		this.setState({
			balanceLoading: true
		})
		getBalance().then(result => {
			if(result.success) {
				self.setState({
					balanceLoading: false,
					money_balance: result.data.money_balance
				})
			}
		})
	}

	loadAccountBalance = () => {
		const self = this
		this.setState({
			accountBalanceLoading: true
		})
		getAccountBalance().then(result => {
			if(result.success) {
				const data = result.data
				self.setState({
					accountBalanceLoading: false,
					gold_balance: data.gold_balance,
					email_count: data.remaining_mail.available_count,
					sms_count: data.remaining_message.available_count
				})
			}
		})
	}

	loadCoupons = () => {
		const self = this
		this.setState({
			couponLoading: true
		})
		getCoupons({}).then(result => {
			if(result.success) {
				self.setState({
					couponLoading: false,
					coupons: result.data
				})
			}
		})
	}

	loadInvites = () => {
		if(user.checkTeamVersion()) {
			return
		}
		this.setState({
			inviteLoading: true
		})
		getInviteList().then(result => {
			if(result.success) {
				this.setState({
					inviteLoading: false,
					invites: result.data.accounts
				})
			}
		})
	}


	handleHideM1LogoChange = (e) => {
		e.preventDefault()
		const boolCheck = e.target.checked
		if(user.cookieInfo.userinfo.accounts[0].version === 1) {
			msg.confirm('免费版无法开启增值服务，请升级版本', () => {
				msg.close()
				this.props.history.push('/price')
			})
			return
		}
		if(this.state.isOpenLogoVersion) {
			msg.info('您当前使用版本已自动开启隐藏M1商标服务')
			return
		}

		if(user.cookieInfo.userinfo.accounts[0].version === 4) {
			msg.confirm('是否确认执行该操作？', () => {
				msg.close()
				msg.loading()
				editService(1, boolCheck).then(result => {
					msg.close()
					if(result.success && result.data) {
						this.loadBalance()
						this.toggleHideM1Logo()
					} else {
						msg.info(result.data)
					}
				})
			})
			return
		}

	}

	toggleHideM1Logo = () => {
		this.setState({
			hideM1Logo: !this.state.hideM1Logo
		})
	}

	handleUpgradeClick = e =>{
		this.props.history.push('/upgrade')
	}

	handleRechargeClick = e => {
		this.props.history.push('/recharge')
	}

	handleGoldToBalanceClick = e =>{
		this.setState({
			showGoldPay: true
		})
	}
	handleGoldDetailClick = e =>{
		this.setState({
			showGoldDetail: true
		})
	}
	handleGetGoldClick = e => {
		getGoldList().then(result => {
			if(result.success) {
				this.setState({
					goldTasks: result.data,
					showGoldTaskList: true
				})
			} else {
				msg.info(result.data)
			}
		})
	}
	handleUseCouponClick = e =>{
		this.props.history.push('/price')
	}
	handleViewCouponClick = e =>{
		this.setState({
			showCouponDetail: true
		})
	}
	handleWithdrawCashClick = e =>{
		msg.info('Coming soon')
	}
	handleTransferCashClick = e =>{
		msg.info('Coming soon')
		
	}
	handleInviteTeamClick = e =>{
		this.props.history.push('/team')
	}

	handleGoldTaskListClose = e => {
		this.setState({
			showGoldTaskList: false
		})
	}

	handleGoldDetailClose = e => {
		this.setState({
			showGoldDetail: false
		})
	}
	handleGoldPayClose = e => {
		this.setState({
			showGoldPay: false
		})
	}
	handleGoldPaySuccess = (gold) => {
		this.loadAccountBalance()
	}

	handleCouponDetailClose = e => {
		this.setState({
			showCouponDetail: false
		})
	}

	renderExpire() {
		const { useDayPercentage, validDay, formatExpireTime, version } = this.state

		return (
			<div className="info-box box-large">
				<h2><span className={classNames('icon', user.filter.versionKeys[version])}><Icon name={user.filter.versionIconNames[version]}/></span>M1云端市场部</h2>
				<div className="m1-row">
					<div className="summary-intro-content">
						<Loop cx={100} cy={100} r={90} value={useDayPercentage} width={6} showValue={true} text="已使用" />

						<div className="summary-detail">
							<ul>
								<li className="selected">已使用时间</li>
								<li>剩余时间</li>
							</ul>
							<p>
								{formatExpireTime}到期 剩余{validDay}天
							</p>
							<div className="btn-wrap">
								<Button color={Colors.PRIMARY} onClick={this.handleUpgradeClick} >续费</Button>
							</div>
						</div>
					</div>
				</div>
				{user.cookieInfo.userinfo.accounts[0].version === 1 &&
					<div className="info-box-buttons">
									<Button color={Colors.PRIMARY} onClick={this.handleUpgradeClick} >立即升级</Button>
									<p>您当前使用的版本为免费版</p>
								</div>}
			</div>
		)
	}

	renderMoneyBalance() {
		const { money_balance, balanceLoading } = this.state
		return <InfoBox className="balance" iconName={'purse'} value={money_balance} isLoading={balanceLoading} describe={'当前账户内总余额'} >
						<div className="info-box-buttons">
							<Button color={Colors.PRIMARY} onClick={this.handleRechargeClick} >充值</Button>
						</div>
						</InfoBox>
	}

	renderGoldBalance() {
		const { gold_balance, accountBalanceLoading } = this.state
		return <InfoBox className="gold" iconName={'currency'} value={gold_balance} isLoading={accountBalanceLoading} describe={'当前账户内可用M币总量'} >
						<div className="info-box-buttons">
							<Button color={Colors.TAGPRIMARY} onClick={this.handleGetGoldClick} >获取M币</Button>
							<Button color={Colors.PRIMARY} onClick={this.handleGoldToBalanceClick} >转入余额</Button>
							<Button color={Colors.TAGPRIMARY} onClick={this.handleGoldDetailClick} >M币详情</Button>
						</div>
					 </InfoBox>
	}

	renderEmail() {
		const { email_count, accountBalanceLoading } = this.state
		return <InfoBox className="email" iconName={'mail'} value={email_count} isLoading={accountBalanceLoading} describe={'当前可用邮件余量'} >
							<div className="info-box-buttons">
								<Button color={Colors.PRIMARY} href="http://edm.m1world.com/v2/" target="_blank" >发送邮件</Button>
							</div>
						 </InfoBox>
	}

	renderSMS() {
		const { sms_count, accountBalanceLoading } = this.state
		return <InfoBox className="sms" iconName={'sms'} value={sms_count} isLoading={accountBalanceLoading} describe={'当前可用短信余量'} >
							<div className="info-box-buttons">
								<Button color={Colors.PRIMARY} href="http://sms.m1world.com/index.html" target="_blank" >发送短信</Button>
							</div>
						 </InfoBox>
	}

	renderCoupon() {
		const { coupons, couponLoading } = this.state
		return <InfoBox className="coupon" iconName={'voucher'} value={coupons.length} isLoading={couponLoading} describe={'我的优惠券'} >
							<div className="info-box-buttons">
								<Button color={Colors.TAGPRIMARY} onClick={this.handleUseCouponClick} >立即使用</Button>
								<Button color={Colors.PRIMARY} onClick={this.handleViewCouponClick} >查看</Button>
							</div>
						 </InfoBox>
	}

	renderProfit() {
		const { profit } = this.state
		return <InfoBox className="profit" iconName={'wallet'} value={profit} describe={'我的收益'} >
							<div className="info-box-buttons">
								<Button color={Colors.TAGPRIMARY} onClick={this.handleWithdrawCashClick} >提现</Button>
								<Button color={Colors.PRIMARY} onClick={this.handleTransferCashClick} >转入余额</Button>
							</div>
						 </InfoBox>
	}

	renderInvites() {
		const { invites, inviteLoading } = this.state
		return <InfoBox iconName={'cooperation'} describe={'已加入的协作成员'} isLoading={inviteLoading} hasMember={true} members={invites} >
							<div className="info-box-buttons">
								<Button color={Colors.PRIMARY} onClick={this.handleInviteTeamClick} >邀请协作</Button>
							</div>
						 </InfoBox>
	}

	render() {

		return (
			<div className="m1-panel panel-nostyle">
				<div className="m1-panel-content panel-nostyle">
					<div className="summary-container">
						<div className="m1-row">
							<div className="m1-col-6">
								{this.renderExpire()}
							</div>

							<div className="m1-col-6">
								<div className="m1-row">
									<div className="m1-col-6">
										{this.renderMoneyBalance()}
									</div>
									<div className="m1-col-6">
										{this.renderGoldBalance()}
									</div>
								</div>
								<div className="m1-row">
									<div className="m1-col-6">
										{this.renderCoupon()}
									</div>
									<div className="m1-col-6">
										{this.renderProfit()}
									</div>
								</div>
							</div>
						</div>

						<div className="m1-row">
							<div className="m1-col-3">
								{this.renderSMS()}
							</div>
							<div className="m1-col-3">
								{this.renderEmail()}
							</div>
							<div className="m1-col-6">
								{this.renderInvites()}
							</div>
						</div>

						<div className="m1-row">
							<div className="info-box service">
								<div className="m1-col-8">
									<div className="service-box">
										<h3><span className="icon"><Icon name="praise" /></span> 增值服务</h3>
										<p>
											标准版套餐用户可根据需要单独购买增值服务，如需开启，请保障账户余额充足，开启后，系统将自动从余额按月扣费（从开启当日算起）。
										</p>
									</div>
								</div>
								<div className="m1-col-4">
									<div className="logo-box">
										<span>隐藏M1商标</span>
										<Switch size={Sizes.LARGE} checked={this.state.hideM1Logo} onChange={this.handleHideM1LogoChange}  />
									</div>
								</div>
							</div>
						</div>
					</div>

				</div>
				{this.state.showGoldTaskList &&
					<GoldTaskList 
						show={this.state.showGoldTaskList} 
						onClose={this.handleGoldTaskListClose} 
						tasks={this.state.goldTasks} 
					/>}
				{this.state.showGoldDetail &&
					<GoldDetail 
						show={this.state.showGoldDetail}
						onClose={this.handleGoldDetailClose}
					/>}
				{this.state.showGoldPay &&
					<GoldPay
						show={this.state.showGoldPay}
						onClose={this.handleGoldPayClose}
						gold={this.state.gold_balance}
						onPay={this.handleGoldPaySuccess}
					/>
				}
				{this.state.showCouponDetail &&
					<CouponDetail 
						show={this.state.showCouponDetail}
						onClose={this.handleCouponDetailClose}
						coupons={this.state.coupons}
					/>}
			</div>
		)
	}
}

export default Summary