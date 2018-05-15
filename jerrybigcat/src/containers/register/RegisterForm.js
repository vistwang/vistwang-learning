import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Geetest from './Geetest'
import { Button, Icon, Checkbox, Colors, Sizes } from '../../components/m1ui'
import { utils, msg, config, cookie } from '../../utils'
import { register, checkEmail, getGTVerifyCode, sendTelCode } from '../../api/sign'

const propTypes = {
	onRegisterSubmit: PropTypes.func,
	mobileModel: PropTypes.bool
}

class RegisterForm extends Component {
	constructor(props) {
		super(props)

		this.refCode = utils.getUrlParam('refCode')
		this.sem = utils.getUrlParam('ref') || 'm1'

		this.gt = null
		this.verifyCodeTimer = null

		this.validUsername = true
		this.validPassword = true
		this.validPhone = true
		this.validVerifyCode = true

		this.state = {
			username: '',
			password: '',
			phone: '',
			verifyCode: '',
			inviteCode: '',

			gt: '',
			gt_challenge: '',
			gt_new_captcha: '',
			gt_success: 0,

			usernameError: '',
			passwordError: '',
			phoneError: '',
			verifyCodeError: '',
			inviteCodeError: '',

			verifyCodeBtnText: '发送验证码',
			verifyCodeBtnDisabled: false,

			checkEmailLoading: false,
			passwordShow: false,
			showVerifyCode: false,
			showInviteCode: false,
			showGt: false,
			gtLoading: false,

			isBaiduSem: false,

			loginUrl: '/login.html'
		}
	}

	componentDidMount() {
		this.init()
	}

	init() {
		if(this.refCode) {
			this.setState({
				inviteCode: this.refCode,
				showInviteCode: true,
				loginUrl: '/login.html?refCode=' + this.refCode
			})
		}

		if(this.sem === 'sem') {
			cookie.set(config.COOKIE_BAIDU_SEM, this.sem , {expires: 365, path: '/', domain: config.COOKIE_SOUPAI_DOMAIN})
		}

		this.setState({
			isBaiduSem: this.isBaiduSem()
		})

		// this.getGTVerifyCode()
	}

	getSem() {
		let formSem = ''
		const sem = cookie.get(config.COOKIE_BAIDU_SEM)
		if(sem === 'sem') {
			formSem = 'm1-sem'
		} else if(sem && sem !== '') {
			formSem = sem
		}
		return formSem
	}

	isBaiduSem() {
		const sem = cookie.get(config.COOKIE_BAIDU_SEM)
		return sem === 'sem'
	}

	getGTVerifyCode = () => {
		this.gt = null
		this.setState({
			showGt:false,
			gtLoading: true
		})
		getGTVerifyCode().then(data => {
			this.setState({
				gt: data.gt,
				gt_challenge: data.challenge,
				gt_new_captcha: data.new_captcha,
				gt_success: data.success,
				showGt:true,
				gtLoading: false
			})
		})
	}

	handleUserNameChange = e => {
		this.setState({
			username: e.target.value.trim()
		})
	}
	handleUserNameKeyUp = e => {
		if(e.keyCode === 13) {
			this.submitRegister()
			return
		}
		if(e.keyCode === 39 || e.keyCode === 37) {
			return
		}
		this.setState({
			usernameError: ''
		})
	}
	handleUserNameBlur = e => {
		const { username } = this.state
		if(username.length === 0) {
			return
		}

		if(this.checkUserName()) {
			this.setState({
				checkEmailLoading: true
			})
			checkEmail(username).then(this.checkEmailResult)
		}
	}

	handlePasswordChange = e => {
		this.setState({
			password: e.target.value.trim()
		})
	}
	handlePasswordKeyUp = e => {
		if(e.keyCode === 13) {
			this.submitRegister()
			return
		}
		if(e.keyCode === 39 || e.keyCode === 37) {
			return
		}

		this.setState({
			passwordError: ''
		})
	}
	handlePasswordBlur = e => {
		const { password } = this.state
		if(password.length === 0) {
			return
		}
		this.checkPassword()
	}

	handleTogglePwdEyeClick = e => {
		this.setState({
			passwordShow: !this.state.passwordShow
		})
	}

	handlePhoneChange = e => {
		this.setState({
			phone: e.target.value.trim()
		})
	}
	handlePhoneKeyUp = e => {
		if(e.keyCode === 13) {
			this.submitRegister()
			return
		}
		if(e.keyCode === 39 || e.keyCode === 37) {
			return
		}
		this.setState({
			phoneError: ''
		})
	}
	handlePhoneBlur = e => {
		const { phone } = this.state
		if(phone.length === 0) {
			return
		}
		if(this.checkPhone()) {
			this.setState({
				showVerifyCode: true
			})
		}
	}

	handleVerifyCodeChange = e => {
		this.setState({
			verifyCode: e.target.value.trim()
		})
	}
	handleVerifyCodeKeyUp = e => {
		if(e.keyCode === 13) {
			this.submitRegister()
			return
		}
		if(e.keyCode === 39 || e.keyCode === 37) {
			return
		}
		this.setState({
			verifyCodeError: ''
		})
	}

	handleShowInviteCodeClick = e => {
		this.setState({
			showInviteCode: true
		})
	}

	handleInviteCodeChange = e => {
		this.setState({
			inviteCode: e.target.value.trim()
		})
	}
	handleInviteCodeKeyUp = e => {
		if(e.keyCode === 13) {
			this.submitRegister()
			return
		}
		if(e.keyCode === 39 || e.keyCode === 37) {
			return
		}

		this.setState({
			inviteCodeError: ''
		})
	}

	handleRegisterClick = e => {
		this.submitRegister()
	}

	handleSendVerifyCodeClick = e => {
		const { phone } = this.state
		if(!this.gt) {
			msg.info('请先完成验证')
		} else if(phone.length === 0) {
			this.setState({
				phoneError: '请填写手机号'
			})
		} else {
			this.setState({
				verifyCodeBtnText: '发送中...',
				verifyCodeBtnDisabled: true
			})
			sendTelCode(phone, this.gt.geetest_challenge, this.gt.geetest_validate, this.gt.geetest_seccode)
			.then(this.sendVerifyCodeResult)
		}
	}

	sendVerifyCodeResult = result => {
		if(result.success){
			let countdown = 60
			this.verifyCodeTimer = setInterval(() => {
				countdown--
				if(countdown < 0) {
					clearInterval(this.verifyCodeTimer)
					this.setState({
						verifyCodeBtnText: '发送验证码',
						verifyCodeBtnDisabled: false
					})
					this.getGTVerifyCode()
				} else {
					this.setState({
						verifyCodeBtnText: `重新发送(${countdown}s)`
					})
				}
			}, 1000)
		} else {
			msg.info(result.data)
			this.setState({
				verifyCodeBtnText:'发送验证码',
				verifyCodeBtnDisabled: false,
				phoneError: result.data
			})
			this.getGTVerifyCode()
		}
	}

	// 验证用户名（邮箱）格式
	checkUserName = () => {
		const { username } = this.state
		let isOk = true
		if(!utils.isEmail(username)) {
			this.setState({
				usernameError: '邮箱格式错误'
			})
			this.validUsername = false
			isOk = false
		}

		return isOk
	}
	// 验证密码格式
	checkPassword = () => {
		const { password } = this.state
		let isOk = true
		let passwordError = ''
		if(password.length < 6 || password.length > 16) {
			passwordError = '密码长度为6-16'
			this.validPassword = false
			isOk = false
		} else if(!utils.isPassword(password)) {
			passwordError = '密码为字母和数字组合'
			this.validPassword = false
			isOk = false
		} else {
			passwordError = ''
			this.validPassword = true
			isOk = true
		}
		this.setState({passwordError})
		return isOk
	}

	checkPhone = () => {
		const { phone } = this.state
		let isOk = true
		if(!utils.isMobile(phone)) {
			this.setState({
				phoneError: '手机号格式不正确'
			})
			this.validPhone = false
			isOk = false
		}
		return isOk
	}

	checkVerifyCode = () => {
		const { verifyCode } = this.state
		let isOk = true
		if(!/^\d{6}$/.test(verifyCode)) {
			this.setState({
				verifyCodeError: '验证码错误'
			})
			this.validVerifyCode = false
			isOk = false
		}
		return isOk
	}

	submitRegister = () => {
		const { username, password, inviteCode, phone, verifyCode, isBaiduSem } = this.state
		if(username.length === 0) {
			this.validUsername = false
			this.setState({
				usernameError: '请输入用户名'
			})
		}  else if(this.checkUserName()) {
			// this.validUsername = true
		}
		if(password.length === 0) {
			this.validPassword = false
			this.setState({
				passwordError: '请输入密码'
			})
		} else if(this.checkPassword()) {
			this.validPassword = true
		}

		if(isBaiduSem) {
			if(phone.length === 0) {
				this.validPhone = false
				this.setState({
					phoneError: '请输入手机号'
				})
			} else if(this.checkPhone()) {
				this.validPhone = true
				if(verifyCode.length === 0) {
					this.validVerifyCode = false
					this.setState({
						verifyCodeError: '请输入验证码'
					})
				} else {
					this.validVerifyCode = true
				}
			}

		}

		if(this.authenticate()) {
			let param = {
				email: username,
				password,
				from: this.getSem(),
				recommend_code: inviteCode
			}
			if(isBaiduSem) {
				param.mobilephone = phone
				param.verify_code = verifyCode
			}
			msg.loading()
			register(param).then(result => {
				msg.close()
				this.setState({
					password:'',
					passwordError: ''
				})
				if(result.success) {
					document.title = '注册成功 - M1云端市场部'
					cookie.remove(config.COOKIE_BAIDU_SEM, {path: '/', domain: config.COOKIE_SOUPAI_DOMAIN})
					this.setFirstInfo()

					// 注册成功切换到邮箱激活页面
					if(this.props.onRegisterSubmit) {
						this.props.onRegisterSubmit(username)
					}
				} else {
					this.sem = 'm1'
					if(result.data === '验证码错误') {
						this.setState({
							verifyCodeError: '验证码错误'
						})
					} else if(result.data === '该邮箱已经注册过梅花网') {
						this.setState({
							usernameError: result.data
						})
					} else {
						msg.info(result.data)
						this.setState({
							usernameError: '',
							passwordError: '',
							phoneError:'',
							verifyCodeError: '',
							password: '',
							phone:'',
							verifyCode: '',
							inviteCode: ''
						})
					}
				}
			})
		} 
	}

	checkEmailResult = result => {
		let checkEmailLoading = false
		let usernameError = ''
		if(result.success) {
			// data: false 未注册，data: true 已注册
			if(result.data === false) {
				usernameError = ''
				this.validUsername = true
			} else {
				usernameError = '用户名已被注册'
				this.validUsername = false
			}
		} else {
			msg.info(result.data)
		}

		this.setState({
			usernameError,
			checkEmailLoading
		})
	}

	authenticate() {
		let bool = false
		if(this.state.isBaiduSem) {
			bool = this.validUsername && this.validPassword && this.validPhone && this.validVerifyCode
		} else {
			bool = this.validUsername && this.validPassword
		}
		return bool
	}

	setFirstInfo() {
		const cookieOption = {
			expires : 365,
			domain: config.COOKIE_SOUPAI_DOMAIN,
			path: '/'
		}

		cookie.set(config.COOKIE_SOUPAI_FIRST_LOGIN, 'true', cookieOption)

		let c = utils.getUrlParam('c')
		if(c && c.match('http')) {
			c = decodeURIComponent(c)
			cookie.set(config.COOKIE_SOUPAI_FIRST_LOGIN_URL, encodeURIComponent(c), cookieOption)
		}
	}

	handlerGeetest = result => {
		this.gt = result
	}

	render() {
		const { username, password, phone, verifyCode, inviteCode, passwordShow, 
					usernameError, passwordError, phoneError, verifyCodeError, 
					showVerifyCode, showInviteCode, verifyCodeBtnText, verifyCodeBtnDisabled, loginUrl, checkEmailLoading, isBaiduSem,
					gt, gt_challenge, gt_new_captcha, gt_success, showGt, gtLoading } = this.state

		const { mobileModel } = this.props

		return (	
			<div className="sign-form">
				<div className="sign-form-content">
					<div className="sign-logo">
						<a href={config.DOMAIN}><Icon name="logo-thin" /></a>
					</div>
				{/*用户名*/}
					<div className="m1-form">
						<div className="m1-form-row">
							<div className="m1-form-content">
								<Icon name="user" />
								<input 
									className={'m1-form-input' + (usernameError.length > 0 ? ' error' : '')} 
									placeholder="邮箱" 
									onChange={this.handleUserNameChange} 
									onBlur={this.handleUserNameBlur}
									onKeyUp={this.handleUserNameKeyUp}
									/>
									{checkEmailLoading && <div className="form-icon-right">
																			<i className="m1-loading"><i></i></i>
																		</div>}
							</div>
						  {usernameError && <span className="form-error">
						  						  	{usernameError}
						  						  </span>}
						</div>
					{/*密码*/}
						<div className="m1-form-row">
							<div className="m1-form-content">
								<Icon name="lock-o" />
								<input 
									className={'m1-form-input' + (passwordError.length > 0 ? ' error' : '')} 
									type={passwordShow ? 'text' : 'password'} 
									autoComplete="off"
									placeholder="密码" 
									onChange={this.handlePasswordChange} 
									onBlur={this.handlePasswordBlur}
									onKeyUp={this.handlePasswordKeyUp}
								/>
								<span className="form-icon-right" onClick={this.handleTogglePwdEyeClick}>
									<Icon name={passwordShow ? 'eye' : 'eye-close'} />
								</span>
							</div>
							{passwordError && <span className="form-error">
													  	{passwordError}
													  </span>}
						</div>
					{/*手机号*/}
						{isBaiduSem && false &&  //暂时隐藏此功能
							<div className="m1-form-row">
													<div className="m1-form-content">
														<Icon name="phone" />
														<input 
															className={'m1-form-input' + (phoneError.length > 0 ? ' error' : '')} 
															type="number"
															placeholder="手机" 
															onChange={this.handlePhoneChange} 
															onBlur={this.handlePhoneBlur}
															onKeyUp={this.handlePhoneKeyUp}
														/>
													</div>
													{phoneError && <span className="form-error">
																			  	{phoneError}
																			  </span>}
												</div>}

						{isBaiduSem && showVerifyCode && false && //暂时隐藏此功能
							<div className="m1-form-row">
													<div className="m1-form-content">
													{gtLoading && <div className="gt-loading">
														<i className="m1-loading"><i></i></i> 正在加载验证码
													</div>}

														{showGt && <Geetest
																				  gt={gt}
																				  challenge={gt_challenge}
																				  success={gt_success}
																				  onSuccess={this.handlerGeetest}
																				  // product="popup"
																				  width="100%"
																				/>}
													</div>
												</div>}

						{isBaiduSem && showVerifyCode && false && //暂时隐藏此功能
							<div className="m1-form-row verify-code">
													<div className="m1-form-content">
														<div className="input-content">
															<Icon name="authentication" />
															<input 
																className={'m1-form-input' + (verifyCodeError.length > 0 ? ' error' : '')} 
																type="number"
																placeholder="验证码" 
																onChange={this.handleVerifyCodeChange} 
																onKeyUp={this.handleVerifyCodeKeyUp}
															/>
														</div>
														<Button 
															color={Colors.TAGPRIMARY} 
															onClick={this.handleSendVerifyCodeClick} 
															disabled={verifyCodeBtnDisabled}
															>
															{verifyCodeBtnText}
														</Button>
													</div>
													{verifyCodeError && <span className="form-error">
																			  	{verifyCodeError}
																			  </span>}
												</div>}

						{showInviteCode && false && //暂时隐藏此功能
							// 推荐码
							<div className="m1-form-row">
								<div className="m1-form-content">
									<Icon name="rocket" />
									<input 
										className="m1-form-input" 
										placeholder="推荐码（非必填）" 
										value={inviteCode} 
										onChange={this.handleInviteCodeChange} 
										onKeyUp={this.handleInviteCodeKeyUp}
									/>
								</div>
							</div>}
						{!showInviteCode && false && //暂时隐藏此功能
							<div className="m1-form-row  code-text">
								<p><span onClick={this.handleShowInviteCodeClick}>我有推荐码</span></p>
							</div>}
						<div className="m1-form-row  register-box">
							<div className="m1-form-content">
								<Button color={Colors.PRIMARY} onClick={this.handleRegisterClick}>注册</Button>
							</div>
						</div>
						<div className="m1-form-row  has-account">
							<p>已有账号？<a href={loginUrl}>点此登录</a></p>
						</div>
						<div className="m1-form-row">
							<p>注册即表示您同意<a href="http://www.m1world.com/terms.html" target="_blank">M1服务协议</a></p>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

RegisterForm.propTypes = propTypes

export default RegisterForm