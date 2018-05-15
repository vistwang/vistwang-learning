
import { Base64 } from 'js-base64' 
import '../../sass/invite.scss';

import { utils, msg, cookie, config } from '../../utils'
import { getInviteDetail, agreeInvite } from '../../api/sign'
import m1 from '../../base/m1'


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

class Invite {
	constructor() {
		this.isRegister = false
		this.email = ''
		this.invite_id = ''
		this.password = ''
		this.inputPwd = null
		this.inputWrap = null
		this.divError = null
		this.btnAgree = null
		this.btnLogin = null
		this.inviteIntro = null
		this.inviteCheck = null
		this.inviteView = null
		this.inviteInfo = null
		this.inviteActive = null
		this.accountName = null
		this.username = null
		this.spanEmail = null
		this.infoTips = null
		this.errorInfo = null
	}

	init() {
		this.invite_id = utils.getUrlParam('inviteid')
		this.inputPwd = document.getElementById('password')
		this.inputWrap = document.getElementById('input-wrap')
		this.btnAgree = document.getElementById('invite-agree')
		this.btnLogin = document.getElementById('invite-login')
		this.inviteIntro = document.getElementById('invite-intro')
		this.inviteCheck = document.getElementById('invite-check')
		this.inviteView = document.getElementById('invite-view')
		this.inviteInfo = document.getElementById('invite-info')
		this.inviteActive = document.getElementById('invite-active')
		this.accountName = document.getElementById('accountName')
		this.username = document.getElementById('username')
		this.spanEmail = document.getElementById('email')
		this.infoTips = document.getElementById('info-tips')
		this.errorInfo = document.getElementById('error-info')

		this.getInviteDetail()
		this.initEvents()
	}

	initEvents() {
		this.inputPwd.addEventListener('focus', this.handlePasswordFocus, false)
		this.btnAgree.addEventListener('click', this.handleAgreeClick, false)
	}

	getInviteDetail() {
		getInviteDetail(this.invite_id).then(result => {
				this.inviteCheck.classList.add('hidden')
			if(result.success) {
				this.inviteView.classList.remove('hidden')

				const data = result.data
				let infoTips,btnText
				this.email = data.email
				this.isRegister = data.is_register_meihua
				if(this.isRegister) {
					infoTips = '您已经注册梅花网，请输入密码完成邀请。'
					btnText = '验证并加入'
				} else {
					this.inputWrap.classList.add('unregistered')
					infoTips = '您为注册梅花网，请输入密码完成注册。'
					btnText = '注册并加入'
				}
				this.accountName.innerHTML = data.invite_accountname
				this.username.innerHTML = data.invite_username
				this.spanEmail.innerHTML = data.email
				this.infoTips.innerHTML = infoTips
				this.btnAgree.innerHTML = btnText
			} else {
				this.inviteInfo.classList.remove('hidden')
				this.inviteInfo.innerHTML = `<h3>${result.data}</h3>`
			}
		})
	}

	handlePasswordFocus = e => {
		this.inputPwd.classList.remove('error')
		this.errorInfo.innerHTML = ''
	}

	handleAgreeClick = e => {
		this.password = this.inputPwd.value.trim()
		if(this.password.length === 0) {
			this.inputPwd.classList.add('error')
			this.errorInfo.innerHTML = '请输入密码'
		} else {
			this.agreeInvite()
		}
	}

	handleLoginClick = e => {
		let email = this.email.split('@')[1].toLowerCase()
		for(let i in EMAIL_MAP) {
			if(email === i) {
				window.open(EMAIL_MAP[i])
				return
			}
		}
		msg.info('企业邮箱自行登录')
	}

	agreeInvite() {
		msg.loading()
		agreeInvite(this.invite_id, this.password).then(result => {
			msg.close()
			if(result.success) {
				if(this.isRegister) {
					const userinfo = encodeURIComponent(JSON.stringify(m1.arrangeUserInfo(result.data)))
					const un = Base64.encode(result.data.userinfo.userName)
					const cookieOption = {expires: 7, path: '/', domain: 'm1world.com'}
					cookie.set(config.COOKIE_M1_TOKEN, result.data.token, cookieOption)
					cookie.set(config.COOKIE_M1_USER_NAME, un, cookieOption)
					cookie.set(config.COOKIE_M1_USER_INFO, userinfo, cookieOption)
					utils.redirectTo('http://www.m1world.com')
				} else {
					this.inviteView.classList.add('hidden')
					this.inviteActive.classList.remove('hidden')
					this.btnLogin.addEventListener('click', this.handleLoginClick, false)
				}
			} else {
				msg.info(result.data)
			}
		})
	}
}

const invite = new Invite()
invite.init()