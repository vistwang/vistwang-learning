import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Colors, Sizes } from '../../components/m1ui'
import { msg } from '../../utils'
import { sendActiveEmail } from '../../api/sign'

//发送邮件Map
const EMAIL_MAP = {
        'qq.com': 'http://mail.qq.com',
        'gmail.com': 'http://mail.google.com',
        'sina.com': 'http://mail.sina.com.cn',
        '163.com': 'http://mail.163.com',
        '126.com': 'http://mail.126.com',
        'yeah.net': 'http://www.yeah.net/',
        'sohu.com': 'http://mail.sohu.com/',
        'tom.com': 'http://mail.tom.com/',
        'sogou.com': 'http://mail.sogou.com/',
        '139.com': 'http://mail.10086.cn/',
        'hotmail.com': 'http://www.hotmail.com',
        'live.com': 'http://login.live.com/',
        'live.cn': 'http://login.live.cn/',
        'live.com.cn': 'http://login.live.com.cn',
        '189.com': 'http://webmail16.189.cn/webmail/',
        'yahoo.com.cn': 'http://mail.cn.yahoo.com/',
        'yahoo.cn': 'http://mail.cn.yahoo.com/',
        'eyou.com': 'http://www.eyou.com/',
        '21cn.com': 'http://mail.21cn.com/',
        '188.com': 'http://www.188.com/',
        'foxmail.com': 'http://www.foxmail.com'
    }


const propTypes = {
	email: PropTypes.string.isRequired
}

class ActiveEmail extends Component {

	handleLoginEmailClick = e => {
		const { email } = this.props 
		let emailExp = email.split('@')[1]
		emailExp = emailExp.toLowerCase()
		for(let key in EMAIL_MAP) {
			if(emailExp === key) {
				window.open(EMAIL_MAP[key])
				return
			}
		}

		msg.info('如果您是企业邮箱，请自行登录')
	}

	handleBackHomeClick = e => {
		window.location.href = 'http://www.m1world.com'
	}

	handleResendEmailClick = e => {
		const { email } = this.props
		msg.loading()
		sendActiveEmail(email)
		.then(result => {
			msg.close()
			msg.info(result.data)
		})
	}

	render() {
		return (
			<div className="m1-body">
				<div className="body-container">
					<div className="m1-panel">
						<div className="m1-panel-header active-email-header">
							<Button color={Colors.PRIMARY} onClick={this.handleResendEmailClick}>重新发送邮件</Button>
							<h2>邮箱激活</h2>
						</div>
						<div className="m1-panel-content">
							<div className="active-email-content">
								<h3>验证邮件已经发送到你的邮箱，请前往激活</h3>
								<p>为保证您可以正常登录和使用M1云端市场部，请及时通过邮箱激活账号，未激活账号将无法正常登录M1及使用其他服务。</p>
								<div className="btns">
									<Button color={Colors.PRIMARY} size={Sizes.LARGE} onClick={this.handleLoginEmailClick}>登录邮箱</Button>
									<Button size={Sizes.LARGE} onClick={this.handleBackHomeClick}>返回首页</Button>
								</div>
								<p>如果您无法正常登录，请点击右下角的气泡或以下方式反馈客服人员处理。</p>
								<p>邮箱：m1service@meihua.info 电话：021-51602866-789</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

ActiveEmail.propTypes = propTypes

export default ActiveEmail