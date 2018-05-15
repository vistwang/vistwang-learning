import React, { Component } from 'react'

import { msg, utils, config } from '../../utils'
import { Button, Text, Colors, Sizes } from '../../components/m1ui'

import payment_status_image from '../../assets/images/payment.svg'


export default class Payment extends Component {
	constructor(props) {
		super(props)

		this.cbUrl = ''

		this.state = {
			countdown: 5,
			ref: ''
		}
	}

	componentDidMount() {
		this.init()
	}

	init() {
		this.cbUrl = utils.getUrlParam('c') || utils.getUrlParam('callback') || '/'
		const ref = utils.getUrlParam('ref') === 'charge' ? '支付' : utils.getUrlParam('ref') === 'upgrade' ? '版本升级' : '操作'
		this.setState({ref})

		this.handleCountdown()
	}

	handleCountdown() {
		const timer = setInterval(() => {
			let countdown = this.state.countdown
			if(countdown === 0) {
				clearInterval(timer)
				utils.redirectTo(this.cbUrl)
			} else {
				countdown--
				this.setState({countdown})
			}
		}, 1000)
	}

	render() {
		return (
			<div className="m1-panel">
				<div className="m1-panel-content">
					<div className="container">
						<div className="status-image">
							<img src={payment_status_image}/>
						</div>
						<h2>{this.state.ref}成功，<Text color={Colors.PRIMARY}>{this.state.countdown}</Text> 秒后页面跳转</h2>
						<p>若无法跳转，请点击返回首页</p>
						<div className="btns">
							<Button size={Sizes.LARGE} href="/">返回首页</Button>
							<Button color={Colors.PRIMARY} size={Sizes.LARGE} href="/account/">账户中心</Button>
						</div>
					</div>
				</div>
			</div>
		)
	}
}