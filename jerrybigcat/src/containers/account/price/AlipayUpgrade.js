import React, { Component } from 'react'

import { msg, utils, config } from '../../../utils'
import { user } from '../../../base/system'
import {
	goldPay
} from '../../../api/account'

export default class AlipayUpgrade extends Component {
	constructor(props) {
		super(props)

		this.version = null
		this.unit = null
		this.gold = null
		this.code = null

		this.cbUrl = ''
	}

	componentDidMount() {
		this.init()
	}

	init() {

		this.version = utils.getUrlParam('v')
		this.unit = utils.getUrlParam('u')
		this.gold = utils.getUrlParam('gold')
		this.code = utils.getUrlParam('code')
		this.cbUrl = utils.getUrlParam('c')

		if(this.gold !== undefined && this.gold !== null && this.gold !== '0' && this.gold !== 0) {
			this.handleGoldPay()
		} else {
			this.handleUpgradeVersion()
		}
	}

	handleGoldPay = () => {
		goldPay(this.gold).then(result => {
			if(result.success) {
				this.handleUpgradeVersion()
			} else {
				msg.info(result.data)
				this.handleFailed()
			}
		})
	}

	handleUpgradeVersion = () => {
		let param = {
			version: this.version,
			unit: this.unit
		}
		if(this.code) {
			param.code = this.code
		}
		user.upgradeVersion(param, result => {
			if(result.success) {
				this.handleIntercomEvent()
				if(this.cbUrl) {
					utils.redirectTo(config.DOMAIN + '/payment.html?ref=upgrade&c=' + this.cbUrl)
				} else {
					utils.redirectTo(config.DOMAIN + '/payment.html?ref=upgrade&c=' + config.DOMAIN + '/account/')
				}
			} else {
				msg.info(result.data)
				this.handleFailed()
			}
		})
	}

	handleIntercomEvent() {
		const eventMsg = {
			4: '/M1/PAID STANDARD',
			2: '/M1/PAID GOLD',
			3: '/M1/PAID DIAMONDS'
		}
		eventMsg[this.version] && user.intercomEvent(eventMsg[this.version])
		user.intercomEvent('/M1/PAID')
	}

	handleFailed() {
		setTimeout(() => {
			if(this.cbUrl !== '' && this.cbUrl !== null && this.cbUrl !== undefined) {
				utils.redirectTo(this.cbUrl)
			} else {
				utils.redirectTo('/account/')
			}
		}, 2000)
	}

	render() {
		return (
			<div>
				正在升级...
			</div>
		)
	}
}
