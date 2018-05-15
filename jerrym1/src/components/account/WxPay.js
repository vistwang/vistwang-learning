import React, { Component } from 'react'
import PropTypes from 'prop-types'
import QRCode from 'qrcode.react'
import { Modal } from '../m1-ui'
import { utils, config, msg } from '../../utils'
import { checkOrderStatus } from '../../api/account'
import { user } from '../../base/account'

const propTypes = {
	show: PropTypes.bool,
	onClose: PropTypes.func,
	qrcodeUrl: PropTypes.string,
	trade_id: PropTypes.string
}

class WxPay extends Component {
	constructor(props) {
		super(props)

		this.timer = null

		this.init()
	}

	init() {
		this.openCheckOrderStatus()
	}

	openCheckOrderStatus() {
		const { trade_id } = this.props
		this.timer = setInterval(() => {
			if(this.timer) {
				checkOrderStatus(trade_id).then(result => {
					if(result.success && result.data.order_status === 1) {
						this.closeCheckOrderState()
						this.handleOrder()
					}
				})
			}
		}, 2000)
	}

	closeCheckOrderState() {
		if(this.timer) {
			clearInterval(this.timer)
		}
	}

	checkConfirm() {
		const { version, unit } = this.props
		if(version || unit) {
			const message = '请确保您的订单支付完成，并显示版本升级成功后关闭二维码弹窗，否则可能导致版本升级失败！ \r\n 如果您已付款成功，版本升级失败，请联系客服 021-51602866-789 \r\n 确认关闭？'
			return confirm(message)
		}
		return true
	}

	handleClose = e => {
		if(this.checkConfirm()) {
			this.closeCheckOrderState()

			if(this.props.onClose) {
				this.props.onClose(e)
			}
		}
	}

	handleOrder() {
		const { version, unit, gold } = this.props
		if(version || unit) {
			if(gold && gold > 0) {
				goldPay(gold).then(result => {
					if(result.success) {
						this.upgradeVersion()
					} else {
						msg.info(result.data)
					}
				})
			} else {
				this.upgradeVersion()
			}
		} else {
			user.intercomEvent('/M1/PAID RECHARGE')
			user.intercomEvent('/M1/PAID')

			const c = user.prevPage || config.DOMAIN + '/account/'
			utils.redirectTo('/payment.html?ref=charege&c=' + c)
		}
	}

	upgradeVersion = () => {
		const {version, unit } = this.props
		msg.loading()
		user.upgradeVersion({version, unit}, result => {
			msg.close()
			this.handleIntercomEvent()

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

	handleIntercomEvent() {
		const eventMsg = {
			4: '/M1/PAID STANDARD',
			2: '/M1/PAID GOLD',
			3: '/M1/PAID DIAMONDS'
		}
		const { version } = this.props
		eventMsg[version] && user.intercomEvent(eventMsg[version])
		user.intercomEvent('/M1/PAID')
	}

	render() {
		const { show, onClose, qrcodeUrl } = this.props
		return (
			<Modal 
				show={show} 
				onClose={this.handleClose} 
				className="center"
				backdrop="static" 
				style={{width: '252px'}} 
			>
				<Modal.Body style={{paddingTop: '30px', paddingBottom: '30px'}}>
					<div className="wxqrcode-container">
						<div className="wxqrcode-header">请扫描下方二维码完成支付</div>
						<QRCode value={qrcodeUrl} size={150} />
						<div className="wxqrcode-footer">打开微信，点击底部的“发现”，<br/>
								使用“扫一扫”进行支付。</div>
					</div>
				</Modal.Body>
			</Modal>
		)
	}
}

WxPay.propTypes = propTypes

export default WxPay