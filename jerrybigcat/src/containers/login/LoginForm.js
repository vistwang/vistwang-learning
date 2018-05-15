import React, { Component } from 'react'
import { Base64 } from 'js-base64' 

import { Button, Icon, Checkbox, Colors, Sizes } from '../../components/m1ui'
import { utils, msg, cookie, config } from '../../utils'
import m1 from '../../base/soup'
import { login, bindCoupon, sendActiveEmail } from '../../api/sign'

import ResendEmail from './ResendEmail'

class LoginForm extends Component {
	constructor(props) {
		super(props)

		this.accountUrl = '/account/'
		this.refCode = utils.getUrlParam('refCode')
		this.ref = utils.getUrlParam('ref')
		this.version = utils.getUrlParam('v')
		this.unit = utils.getUrlParam('u')
		this.prevPage = utils.getUrlParam('c') ? decodeURIComponent(utils.getUrlParam('c')) : null
		this.sem = utils.getUrlParam('ref') ? (utils.getUrlParam('ref') === 'sem' ? 'soup-sem' : utils.getUrlParam('ref')) : 'soup'

		this.token = null

		this.state = {
			username: '',
			password: '',
			passwordShow: false,

			usernameError: '',
			passwordError: '',

			rememberPwd: false,

			showResendEmail: false,

			showThreeBind: false,

			registerUrl: '/register.html',

			forgetUrl: 'http://www.meihua.info/forget',

			threeBinds: [
			// { icon: 'sina', url: '' },
			// { icon: 'wechat', url: '' },
			// { icon: 'qq', url: '' },
			{ icon: 'mingdao', url: 'https://api.mingdao.com/oauth2/authorize?app_key=62DBBFA36525&redirect_uri=http://www.m1world.com/oauth2.html&response_type=code' },
			]
		}
	}

	componentDidMount() {
		this.init()
	}

	init() {
		if(this.refCode || this.prevPage) {
			let registerUrl = '/register.html'
			let paramUrl = ''
			paramUrl += this.refCode ? `refCode=${this.refCode}` : ''
			paramUrl += this.prevPage ? `${paramUrl.length > 0 ? '&' : ''}c=${this.prevPage}` : ''
			registerUrl += paramUrl.length > 0 ? `?${paramUrl}` : ''
			this.setState({registerUrl})
		}

		if(cookie.get(config.COOKIE_SOUPAI_TOKEN)) {
			this.token = cookie.get(config.COOKIE_SOUPAI_TOKEN)
			this.bindCoupon()
		} else if(this.ref) {
			this.accountUrl += '?ref=' + this.ref
			// 来自价格页面附带参数版本和时限
			if(this.version) {
				this.accountUrl += '&v=' + this.version + '&u=' + this.unit
			}
		}

		const rememberPwd = this.isRememberPwd()
		this.setState({rememberPwd})
	}

	isRememberPwd() {
		return localStorage.getItem(config.COOKIE_SOUPAI_AUTO_LOGIN) === 'true'
	}

	setRememberPwd(bool) {
		if(bool) {
			localStorage.setItem(config.COOKIE_SOUPAI_AUTO_LOGIN, 'true')
		} else {
			localStorage.removeItem(config.COOKIE_SOUPAI_AUTO_LOGIN)
		}
	}



	handleUserNameChange = e => {
		this.setState({
			username: e.target.value.trim()
		})
	}

	handlePasswordChange = e => {
		this.setState({
			password: e.target.value.trim()
		})
	}

	handleTogglePwdEyeClick = e => {
		this.setState({
			passwordShow: !this.state.passwordShow
		})
	}

	handleRememberPwdChange = e => {
		const rememberPwd = !this.state.rememberPwd
		this.setState({
			rememberPwd
		})

		this.setRememberPwd(rememberPwd)
	}

	handleInputKeyup = e => {
		if(e.keyCode === 13) {
			this.submitLogin()
		}
	}

	handleLoginClick = e => {
		this.submitLogin()
	}

	submitLogin = () => {
		const { username, password } = this.state
		let usernameError = ''
		let passwordError = ''
		if(username.length === 0) {
			usernameError = '请输入邮箱或用户名'
		} else if(password.length === 0) {
			passwordError = '请输入密码'
		} else {
			msg.loading()
			login(username, password, this.sem).then(this.loginResult)
		}

		this.setState({
			usernameError,
			passwordError
		})
	}

	loginResult = (result) => {
		msg.close()
		this.setState({
			password:'',
			passwordError: ''
		})
		if(result.success) {
			const expires = this.state.rememberPwd ? 30 : 7
			const domain = config.COOKIE_SOUPAI_DOMAIN
			const token = result.data.token.toString()
			const user = encodeURIComponent(JSON.stringify(m1.arrangeUserInfo(result.data)))
			const username = Base64.encode(result.data.user.userName)
			const cookieOption = {expires, path: '/', domain}


			cookie.set(config.COOKIE_SOUPAI_TOKEN, token, cookieOption)
			cookie.set(config.COOKIE_SOUPAI_USER_NAME, username, cookieOption)
			cookie.set(config.COOKIE_SOUPAI_USER, user, cookieOption)

			localStorage.setItem(config.COOKIE_SOUPAI_USER_NAME, username)

			this.token = token
			this.bindCoupon()
		} else {
			if(result.data === '-1' || result.data === -1) {
				this.handleResendEmailOpen()
			} else if(result.data === '用户名不存在') {
				this.setState({
					usernameError: result.data
				})
			} else if(result.data === '密码输入不正确') {
				this.setState({
					passwordError: result.data
				})
			} else {
				this.setState({
					password: ''
				})
				msg.info(result.data)
			}
		}
	}

	bindCoupon() {
		let coupon = cookie.get(config.COOKIE_SOUPAI_COUPON)
		if(!!coupon) {
			coupon = JSON.parse(decodeURIComponent(coupon))
			if(coupon.name === 'coupon1') {
				if(!coupon.value[0].isBind) {
					bindCoupon(coupon.value[0].id, coupon.value[0].coupon_code).then(this.bindCouponResult)
					return
				}
			}
		}
		this.redirect()
	}

	bindCouponResult = result => {
		if(result.success) {
			let coupon = cookie.get(config.COOKIE_SOUPAI_COUPON)
			if(!!coupon) {
				coupon = JSON.parse(decodeURIComponent(coupon))
				if(coupon.name === 'coupon1') {
					coupon.value[0].isBind = true
					cookie.set(config.COOKIE_SOUPAI_COUPON, encodeURIComponent(JSON.stringify(coupon)), {expires: 365, path: '/', domain: config.COOKIE_SOUPAI_DOMAIN})
				}
			}
		}
		redirect()
	}

	redirect() {
		if(this.prevPage) {
			utils.redirectTo(this.prevPage)
		} else {
			utils.redirectTo(this.accountUrl)
		}
	}

	handleResendEmailOpen = () => {
		this.setState({
			showResendEmail: true
		})
	}

	handleResendEmailClose = e => {
		this.setState({
			showResendEmail: false
		})
	}

	handleResendEmailConfirm = e => {
		this.handleResendEmailClose()
		msg.loading()
		sendActiveEmail(this.state.username).then(result => {
			msg.close()
			if(result.success) {
				msg.info(result.data)
			} else {
				msg.info(result.data)
			}
		})
	}

	handleThreeBindShadowOpen = e => {
		this.setState({
			showThreeBind: true
		})
	}

	handleThreeBindShadowClose = e => {
		this.setState({
			showThreeBind: false
		})
	}

	render() {
		const { username, password, passwordShow, rememberPwd, registerUrl, usernameError, passwordError, showResendEmail, threeBinds, forgetUrl, showThreeBind } = this.state
		const { mobileModel } = this.props
		return (
			<div className="sign-form">
				<div className="sign-form-content">
					<div className="sign-logo">
						<Icon name="logo-thin" />
					</div>
					<div className="m1-form">
						<div className="m1-form-row">
							<div className="m1-form-content">
								<Icon name="user" />
								<input className={'m1-form-input' + (usernameError.length > 0 ? ' error' : '')} placeholder="邮箱或用户名" value={username} onChange={this.handleUserNameChange} onKeyUp={this.handleInputKeyup}/>
							</div>
						  {usernameError && 
						  	<span className="form-error">
  						  	{usernameError}
  						  </span>}
						</div>
						<div className="m1-form-row">
							<div className="m1-form-content">
								<Icon name="lock-o" />
								<input className={'m1-form-input' + (passwordError.length > 0 ? ' error' : '')} type={passwordShow ? 'text' : 'password'} autoComplete="off" placeholder="密码" value={password} onChange={this.handlePasswordChange} onKeyUp={this.handleInputKeyup} />
								<span className="form-icon-right" onClick={this.handleTogglePwdEyeClick}>
									<Icon name={passwordShow ? 'eye' : 'eye-close'} />
								</span>
							</div>
						  {passwordError.length > 0 && 
						  	<span className="form-error">
  						  	{passwordError}
  						  </span>}
						</div>
						{!mobileModel && <div className="m1-form-row">
													<div className="m1-form-content login-box">
														<span className="forget-pwd">
															<Checkbox checked={rememberPwd} onChange={this.handleRememberPwdChange} >记住密码</Checkbox><a href={forgetUrl} target="_blank">忘记密码？</a>
														</span>
													</div>
												</div>}

						<div className="m1-form-row">
							<div className="m1-form-content login-box full">
								<Button color={Colors.PRIMARY} onClick={this.handleLoginClick} >登录</Button>
							</div>
						</div>

						{!mobileModel && <div className="m1-form-row separator">
													<hr/>
													<span className="or">or</span>
												</div>}
						{!mobileModel && <div className="m1-form-row three-bind-login">
												{
													threeBinds.map((item, i) => {
														return <a key={i} className={item.icon} href={item.url}><Icon name={item.icon} /></a>
													})
												}
												</div>}
						{!mobileModel && <div className="m1-form-row">
													<p className="no-account">还没有账号？<a href={registerUrl}>免费注册</a></p>
												</div>}

						{mobileModel && <div className="m1-form-row">
													<div className="m1-form-content">
														<p onClick={this.handleThreeBindShadowOpen}>使用第三方登录</p>
													</div>
												</div>}
						{mobileModel && <div className="m1-form-row">
													<p className="login-bottom"><a href={registerUrl}>免费注册</a><a href={forgetUrl} target="_blank">忘记密码？</a></p>
												</div>}

						{mobileModel && showThreeBind && <div className="three-bind-box" onClick={this.handleThreeBindShadowClose}>
											<div className="m1-form-row three-bind-login fixed">
												{
													threeBinds.map((item, i) => {
														return <a key={i} className={item.icon} href={item.url}><Icon name={item.icon} /></a>
													})
												}
												</div>
											</div>}
					</div>
				</div>
				{showResendEmail && <ResendEmail 
									show={showResendEmail}
									onClose={this.handleResendEmailClose}
									onConfirm={this.handleResendEmailConfirm}
								/>}
			</div>
		)
	}
}

export default LoginForm