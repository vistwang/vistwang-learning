import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { Input, Button, Icon, Text, Colors, Sizes } from '../../../components/m1ui'
import { msg, utils, config } from '../../../utils'
import { user } from '../../../base/system'
import { 
	getUser, 
	setSettingInfo, 
	sendBindEmail, 
	sendTelCode, 
	verifyTelCode, 
	modifyPassword,
	updateAccountName,
	uploadFile,
	unbindApp
} from '../../../api/account'

import AvatarCrop from '../../../components/account/AvatarCrop'

const threeAppIcon = {
	weixin: 'wechat',
	mingdao: 'mingdao',
	weimo: 'weimo',
	jinshuju: 'goldendata'
}

class Setting extends Component {
	constructor(props){
		super(props)

		this.setting = null

		this.inputFile = null

		this.verifyCodeCountTime = 60

		this.state= {
			account: '',
			realname: '',
			company: '',
			jobTitle: '',
			avatar: '',
			intro: '',
			weiXin: '',
			weiXinCode: '',
			weibo: '',
			email: '',
			mobilePhone: '',
			auths: [],
			newEmail: '',
			newMobilePhone: '',
			telVerifyCode: '',
			oldPassword: '',
			newPassword: '',
			showModifyEmail: false,
			showModifyPhone: false,
			showModifyPassword: false,
			oldPasswordTips: '',
			newPasswordTips: '',

			verifyCodeCounter: -1,
			showVerifyCodeInput: false,
			sendVerifyCodeLoading: false,


			// 显示头像裁剪模态
			showAvatarCrop: false,
			avatarImgUrl: ''
		}
	}

	componentDidMount() {
		this.loadSettingInfo()
		this.initComponentDom()
		this.bindComponentEvent()
	}

	componentWillUnmount() {
		this.unbindComponentEvent()
	}

	initComponentDom() {
		this.inputFile = document.createElement('input')
		this.inputFile.type = 'file'
		this.inputFile.accept = '.jpg,.jpeg,.png,.gif,.bmp'
	}

	bindComponentEvent() {
		this.inputFile.addEventListener('change', this.handleAvatarFileChange, false)
	}

	unbindComponentEvent() {
		this.inputFile.removeEventListener('change', this.handleAvatarFileChange, false)

	}

	loadSettingInfo() {
		msg.loading()
		getUser().then(result => {
			msg.close()
			if(result.success) {
				this.initSettingState(result.data)
			} else {
				msg.info(result.data)
			}
		})
	}

	initSettingState = (data) => {
		const userInfo = data.user
		this.setting = data
		this.setState({
			account: data.account.name || '',
			realname: userInfo.realname || '',
			company: userInfo.company || '',
			jobTitle: userInfo.job || '',
			avatar: userInfo.avatar || '',
			intro: userInfo.intro || '',
			weiXin: userInfo.wx || '',
			weiXinCode: userInfo.wxCode || '',
			weibo: userInfo.wb || '',
			email: userInfo.email || '',
			mobilePhone: userInfo.mobilephone || '',
			auths: data.auths || []
		})
	}


	handleAvatarFileChange = e => {
		user.loadImageBase64(e.target.files[0], data => {
			this.setState({
				avatarImgUrl: data,
				showAvatarCrop: true
			})
		})
	}

	handleChangeAccount = e => {
		const account = e.target.value.trim()
		this.setState({
			account
		})
	}
	handleBlurAccount = e => {
		const { account } = this.state
		if(account !== this.setting.account) {
			updateAccountName(account).then(result => {
				if(result.success) {

				} else {
					msg.info(result.data)
				}
			})
		}
	}

	handleChangeRealName = e => {
		const realname = e.target.value.trim()
		this.setState({
			realname
		})
	}
	handleBlurRealName = e => {
		const { realname } = this.state
		this.setSettingInfo('realName', realname)
	}

	handleChangeCompany = e => {
		const company = e.target.value.trim()
		this.setState({
			company
		})
	}
	handleBlurCompany = e => {
		const { company } = this.state
		this.setSettingInfo('company', company)
	}

	handleChangeJobTitle = e => {
		const jobTitle = e.target.value.trim()
		this.setState({
			jobTitle
		})
	}
	handleBlurJobTitle = e => {
		const { jobTitle } = this.state
		this.setSettingInfo('jobTitle', jobTitle)
	}

	handleChangeIntro = e => {
		const intro = e.target.value.trim()
		this.setState({
			intro
		})
	}
	handleBlurIntro = e => {
		const { intro } = this.state
		this.setSettingInfo('intro', intro)
	}

	handleChangeWeixin = e => {
		let weiXin = e.target.value.trim()
		this.setState({
			weiXin
		})
	}

	handleChangeWeibo = e => {
		let weibo = e.target.value.trim()
		this.setState({
			weibo
		})
	}

	handleChangeEmail = e => {
		let email = e.target.value.trim()
		this.setState({
			email
		})
	}

	handleChangeMobilePhone = e => {
		let mobilePhone = e.target.value.trim()
		this.setState({
			mobilePhone
		})
	}

	handleBlurWeixin = e => {
		const value = e.target.value.trim()
		this.setSettingInfo('weiXin', value)
	}

	handleBlurWeibo = e => {
		const value = e.target.value.trim()
		this.setSettingInfo('weibo', value)
	}

	setSettingInfo(key, value) {
		if(value !== this.setting.user[key]) {
			const userObj = {userId: this.setting.user.userId, [key]: value}
			setSettingInfo(userObj).then(result => {
				if(result.success) {
					this.setting.user[key] = value
					user.info[key] = value
				}
			})
		}
	}

	handleClickQrcode = e => {
		const fileInput = document.createElement('input')
		fileInput.type = 'file'
		fileInput.click()
		fileInput.addEventListener('change', this.handleChangeFileQr, false)
	}

	handleChangeFileQr = e => {
		const file = e.target.files[0]
		if(file) {
			msg.loading()
			uploadFile({
				file,
				pictype: 2
			}).then(result => {
				msg.close()
				if(result.success) {
					this.setState({
						weiXinCode: result.data.url
					})
				} else {
					msg.info(result.data)
				}
			})
		}
	}


	handleClickModifyEmail = e => {
		const { showModifyEmail } = this.state
		if(!showModifyEmail) {

			this.setState({
				showModifyEmail: true
			})
		} else {
			const { newEmail } = this.state
			if(!utils.isEmail(newEmail)) {
				msg.info('请填写正确邮箱地址')
			} else {
				sendBindEmail(newEmail).then(result => {
					if(result.success) {
						msg.info('绑定邮箱发送成功，请前往邮箱完成修改')
						this.setState({
							showModifyEmail: false,
							newEmail: ''
						})
					} else {
						msg.info(result.data)
					}
				})
			}
		}
	}

	handleChangeNewEmail = e => {
		const newEmail = e.target.value.trim()
		this.setState({
			newEmail
		})
	}

	handleClickModifyPhone = e => {
		if(!this.state.showModifyPhone) {
			this.setState({
				showModifyPhone: true
			})
		} else {
			const { newMobilePhone, telVerifyCode } = this.state
			this.handleVerifyTelCodeToBind()

		}
	}

	handleChangeNewMobilePhone = e => {
		this.setState({
			newMobilePhone: e.target.value.trim()
		})
	}

	handleBlurNewLMobilePhone = e => {
		const newMobilePhone = e.target.value.trim()
		// this.sendTelVerifyCode(newMobilePhone)
	}

	handleClickSendTelVerifyCode = e => {
		const { newMobilePhone } = this.state
		this.sendTelVerifyCode(newMobilePhone)
	}

	sendTelVerifyCode(tel) {
		if(this.checkMobilePhone()){
			this.setState({
				sendVerifyCodeLoading: true
			})
			sendTelCode(tel).then(result => {
				this.setState({
					sendVerifyCodeLoading: false
				})
				if(result.success) {
					// console.log(result.data)
					this.sendVerifyCodeCountDown()
				} else {
					msg.info(result.data)
				}
			})
		}
	}

	sendVerifyCodeCountDown() {
		let verifyCodeCounter = this.verifyCodeCountTime
		this.setState({
			showVerifyCodeInput: true,
			verifyCodeCounter
		})
		this.verifyCodeTimer = setInterval(() => {
			verifyCodeCounter--
			if(verifyCodeCounter < 0) {
				clearInterval(this.verifyCodeTimer)
			} else {
				this.setState({
					verifyCodeCounter: verifyCodeCounter
				})
			}
		}, 1000)
	}

	checkMobilePhone() {
		const { newMobilePhone } = this.state
		if(!utils.isMobile(newMobilePhone)){
			msg.info('请输入正确的手机号')
			return false
		}
		return true
	} 

	handleChangeVerifyTelCode = e => {
		const telVerifyCode = e.target.value.trim()
		this.setState({
			telVerifyCode
		})
	}

	handleVerifyTelCodeToBind = () => {
		const { newMobilePhone, telVerifyCode } = this.state
		if(!this.checkMobilePhone()) {
			return
		}

		if(!/^[0-9]{6}$/.test(telVerifyCode)) {
			msg.info('请输入正确验证码')
		} else {
			msg.loading()
			verifyTelCode(newMobilePhone, telVerifyCode).then(result => {
				msg.close()
				if(result.success) {
					msg.info('绑定手机成功')
					this.setting.user.mobilePhone = newMobilePhone
					this.setState({
						mobilePhone: newMobilePhone,
						showModifyPhone: false,
						showVerifyCodeInput: false
					})
				} else {
					msg.info(result.data)
				}
			})
		}
	}

	handleClickModifyPassword = e => {
		const { showModifyPassword } = this.state
		if(!showModifyPassword) {
			this.setState({
				showModifyPassword: true
			})
		} else {
			const { oldPassword, newPassword } = this.state
			
			if(this.checkPasswordSave()) {
				modifyPassword(oldPassword, newPassword).then(result => {
					if(result.success) {
						msg.info('密码修改成功，请重新登录')
						this.setState({
							showModifyPassword: false,
							oldPassword: '',
							newPassword: ''
						})
					} else {
						msg.info(result.data)
					}
				})
			}
		}
	}

	checkPasswordSave() {
		let isOk = true
		let oldPasswordTips = ''
		let newPasswordTips = ''
		const { oldPassword, newPassword } = this.state

		if(oldPassword.length === 0) {
			oldPasswordTips = '请输入原密码'
			isOk = false
		} 
		if(newPassword.length === 0) {
			newPasswordTips = '请输入新密码'
			isOk = false
		} else if(this.checkPasswordLength(newPassword)) {
			newPasswordTips = '密码长度为6-16'
			isOk = false
		} else if(!this.checkPasswordFormat(newPassword)) {
			newPasswordTips = '密码为字母和数字组合'
			isOk=false
		} 
		this.setState({
			oldPasswordTips,
			newPasswordTips
		})
		return isOk
	}

	checkPasswordFormat(pwd) {
		const reg = /^(([a-zA-Z]{1,15}[0-9][a-zA-Z0-9]*)|([0-9]{1,15}[a-zA-Z][a-zA-Z0-9]*))$/
		return reg.test(pwd)
	}

	checkPasswordLength(pwd) {
		return pwd.length < 6 || pwd.length > 16
	}



	handleChangeOldPassword = e => {
		const oldPassword = e.target.value.trim()
		this.setState({
			oldPassword
		})
	}

	handleChangeNewPassword = e => {
		const newPassword = e.target.value.trim()
		this.setState({
			newPassword
		})
	}

	handleUnbindClick = type => {
		msg.confirm('是否执行此操作？', () => {
			msg.close()
			msg.loading()
			unbindApp(type).then(result => {
				msg.close()
				if(result.success) {
					msg.info('解绑成功')
					this.loadSettingInfo()
				} else {
					msg.info(result.data)
				}
			})
		})
	}

	handleUploadAvatarClick = e => {
		// this.setState({
		// 	showAvatarCrop: true
		// })
		this.inputFile.click()
	}

	handleAvatarCropClose = e => {
		this.setState({
			showAvatarCrop: false
		})
	}

	handleAvatarCropSubmit = imgUrl => {
		if(imgUrl) {
			msg.loading()
			uploadFile({
				fileBase64: imgUrl,
				pictype: 1
			}).then(result => {
				msg.close()
				if(result.success) {
					this.setting.user.avatar = result.data.url
					this.setState({
						avatar: result.data.url,
						showAvatarCrop: false
					})
				} else {
					msg.info(result.data)
				}
			})
		}
	}


	renderIntro() {
		const { account, realname, company, jobTitle, intro, avatar } = this.state
		return (<div className="m1-row setting-intro">
							<div className="avatar">
								<img src={avatar} />
								<span onClick={this.handleUploadAvatarClick}>
									<i className="iconfont icon-m1-upload"></i>
								</span>
							</div>
							<div className="intro">
								<p><Input value={realname} onChange={this.handleChangeRealName} onBlur={this.handleBlurRealName} placeholder="请输入姓名" /></p>
								<p>
									<span className="intro-field"><label>账户：</label><Input value={account} onChange={this.handleChangeAccount} onBlur={this.handleBlurAccount} placeholder="请输入账户" /></span>
									<span className="intro-field"><label>公司：</label><Input value={company} onChange={this.handleChangeCompany} onBlur={this.handleBlurCompany} placeholder="请输入公司" /></span>
									<span className="intro-field"><label>职位：</label><Input value={jobTitle} onChange={this.handleChangeJobTitle} onBlur={this.handleBlurJobTitle} placeholder="请输入职位" /></span>
								</p>
								<p><label>一句话简介：</label><Input value={intro} onChange={this.handleChangeIntro} onBlur={this.handleBlurIntro} placeholder="请输入一句话简介" /></p>
							</div>
					</div>)
	}

	renderModifyEmail() {
		const { newEmail } = this.state
		return (
			<div className="m1-form-row">
					<label className="m1-form-label"></label>
					<div className="m1-form-content">
						<Input className="m1-form-input" value={newEmail} onChange={this.handleChangeNewEmail} placeholder="输入邮箱" />
					</div>
					<span className="intro"></span>
			</div>)
	}

	renderEmail() {
		const { email, showModifyEmail } = this.state

		return(<div className="m1-form-row">
							<div className="field-info-wrap">
								<label className="m1-form-label">邮箱：</label>
								<div className="m1-form-content">
									<label className="m1-form-label-input" onClick={!showModifyEmail ? this.handleClickModifyEmail : null}>{email ? email : <span>输入邮箱</span>}</label>
								</div>
								<span className="intro">
									激活邮箱可用于登录M1账号，重置密码，接受通知邮件及其他需邮箱验证信息 
									{' '}
									{email && <Text color={Colors.SUCCESS} size={Sizes.SMALL}>已激活</Text>}
								</span>
							</div>
								<Button color={Colors.PRIMARY} onClick={this.handleClickModifyEmail}>{showModifyEmail ? '发送' : '修改'}</Button>
							</div>)
	}

	renderModifyPhone() {
		const { newMobilePhone, telVerifyCode, showVerifyCodeInput, verifyCodeCounter, sendVerifyCodeLoading } = this.state
		return(
			<div className="m1-form-row">
					<label className="m1-form-label"></label>
					<div className="m1-form-content">
						<Input ref="telInput" className="m1-form-input" value={newMobilePhone} onChange={this.handleChangeNewMobilePhone} onBlur={this.handleBlurNewLMobilePhone} placeholder="输入手机" />
					</div>
					<div className="setting-code-wrap">
						{showVerifyCodeInput && 
						<input 
													ref="telVerifyCode" 
													className="m1-form-input" 
													value={telVerifyCode} 
													onChange={this.handleChangeVerifyTelCode} 
													placeholder="输入验证码" 
												/>}
						<Button 
							onClick={this.handleClickSendTelVerifyCode}
							disabled={sendVerifyCodeLoading}
						>
							{verifyCodeCounter <= 0 ? '发送验证码' : `(${verifyCodeCounter}s)后重发验证码`}
							{sendVerifyCodeLoading && <i className="m1-loadiong"><i></i></i>}
						</Button>
					</div>
			</div>
		)
	}

	renderPhone() {
		const { mobilePhone, showModifyPhone } = this.state
		return (
			<div className="m1-form-row">
				<div className="field-info-wrap">
					<label className="m1-form-label">手机：</label>
					<div className="m1-form-content">
						<label className="m1-form-label-input" onClick={!showModifyPhone ? this.handleClickModifyPhone : null}>{mobilePhone ? mobilePhone : <span>输入手机</span>}</label>
					</div>
					<span className="intro">安全手机可用于用户发送邮件及短信验证，亦可用于充值密码及其他许手机验证信息</span>
				</div>
					<Button color={Colors.PRIMARY} onClick={this.handleClickModifyPhone}>{showModifyPhone ? '绑定' : '修改'}</Button>
			</div>
		)
	}

	renderModifyPassword() {
		const { oldPassword, newPassword, oldPasswordTips, newPasswordTips } = this.state
		return (<div>
			<div className="m1-form-row">
					<label className="m1-form-label"></label>
					<div className="m1-form-content">
						<Input className="m1-form-input" type="password" value={oldPassword} onChange={this.handleChangeOldPassword} placeholder="输入原有密码" />
						<div className="m1-form-tips">
							{oldPasswordTips}
						</div>
					</div>
					<span className="intro"><a href="http://www.meihua.info/forget" target="_blank">忘记密码？</a></span>
			</div>
			<div className="m1-form-row">
					<label className="m1-form-label"></label>
					<div className="m1-form-content">
						<Input className="m1-form-input" type="password" value={newPassword} onChange={this.handleChangeNewPassword} placeholder="输入新密码" />
						<div className="m1-form-tips">
							{newPasswordTips}
						</div>
					</div>
					<span className="intro">密码为8-20位，必须含字母+数字</span>
			</div>
		</div>)
	}

	renderPassword() {
		const { showModifyPassword } = this.state
		return (
			<div className="m1-form-row">
				<div className="field-info-wrap">
					<label className="m1-form-label">密码：</label>
					<div className="m1-form-content">
						<label className="m1-form-label-input"><span>********</span></label>
					</div>
					<span className="intro">用于保护您的账号信息及登录安全</span>
				</div>
					<Button color={Colors.PRIMARY} onClick={this.handleClickModifyPassword}>{showModifyPassword ? '保存' : '修改'}</Button>
			</div>
		)
	}

	renderSettingDetail() {
		const { weiXin, weiXinCode, weibo, email, mobilePhone, showModifyPassword, showModifyEmail, showModifyPhone } = this.state

		return (<div className="m1-row setting-detail">
						<div className="m1-form">
							<div className="m1-form-row">
									<label className="m1-form-label">微信：</label>
									<div className="m1-form-content">
										<Input className="m1-form-input" value={weiXin} onChange={this.handleChangeWeixin} onBlur={this.handleBlurWeixin}  placeholder="输入微信号" />
									</div>
									<span className="intro">微信二维码（用于展示在个人主页）</span>
									<span className="wx-qrcode"><Icon name="qr-code" />
										<div className="qrcode-content">
											<img src={weiXinCode} />
											<Button color={Colors.PRIMARY} onClick={this.handleClickQrcode}>更换二维码</Button>
										</div>
									</span>
							</div>
							<div className="m1-form-row">
									<label className="m1-form-label">微博：</label>
									<div className="m1-form-content">
										<Input className="m1-form-input" value={weibo} onChange={this.handleChangeWeibo} onBlur={this.handleBlurWeibo} placeholder="输入微博号" />
									</div>
									<span className="intro">用于展示在个人主页</span>
							</div>
							{this.renderEmail()}
							{showModifyEmail && this.renderModifyEmail()}
							{this.renderPhone()}
							{showModifyPhone && this.renderModifyPhone()}
							{this.renderPassword()}
							{showModifyPassword && this.renderModifyPassword()}
						</div>
					</div>)
	}
	
	renderSettingPanel() {

		return (
			<div className="m1-panel panel-setting">
				<div className="m1-panel-header">
					<h2>账户设置</h2>
				</div>
				<div className="m1-panel-content">
					{this.renderIntro()}
					{this.renderSettingDetail()}
				</div>
			</div>
		)
	}

	renderSocialPanel() {
		const { auths } = this.state

		const authList = auths.map(item => {
			if(item.name === 'weimo') {
				return null
			}
			let url = item.name !== 'mingdao' ? item.url : item.url + 'http://www.m1world.com/oauth2.html&response_type=code'
			switch(item.name) {
				case 'mingdao':
					url = item.url + config.DOMAIN + '/oauth2.html&response_type=code'
					break
				case 'wexin':
				case 'jinshuju':
				default:
					url = item.url + config.DOMAIN + '/account/#/setting'
					break
			}
			return(<span className={classNames('bind-icon',{'bind': item.isAuth})} key={item.name}>
							<a href={item.isAuth ? null : url}>
							<Icon name={threeAppIcon[item.name]} /></a> 
							{item.isAuth && <i className="m1-tag-close" onClick={e => this.handleUnbindClick(item.type)}></i>}
						</span>)
		})


		return (
			<div className="m1-panel">
				<div className="m1-panel-header">
					<h2>社交账号管理 <span className="title-describe">您可以绑定第三方社交账号，可用于一键登录或获取其他权限及配置信息。</span></h2>
				</div>
				<div className="m1-panel-content">
					<div className="three-bind">
						{authList}
					</div>
				</div>
			</div>
		)
	}

	render() {

		return (
			<div>
				{this.renderSettingPanel()}
				{this.renderSocialPanel()}
				{this.state.showAvatarCrop && <AvatarCrop
									show={this.state.showAvatarCrop}
									onClose={this.handleAvatarCropClose}
									onSubmit={this.handleAvatarCropSubmit}
									imgUrl={this.state.avatarImgUrl}
								/>}
			</div>
		)
	}
}

export default Setting