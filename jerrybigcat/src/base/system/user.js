
import { cookie, utils, config, msg } from '../../utils'
import { Colors } from '../../components/m1ui'
import { AccountTypes } from '../enums'
import { 
	getUserInfo, 
	intercomEvent, 
	wxpay, 
	goldPay,
	upgrade,
	wechatAuth,
	getWechatAuth,
	getAuthSuggestion 
} from '../../api/account'

export default {
	info: {},
	cookieInfo: {},
	token: {},
	
	prevPage: null,

	authSuggestion: {},

	// 版本购买／升级价格
	versionPrices: [
			{version: 1, month: {price: 0}, year: {price: 0, originalPrice: 0}},
			{version: 2, month: {price: 299}, year: {price: 2990, originalPrice: 3588}},
			{version: 3, month: {price: 1980}, year: {price: 9800, originalPrice: 23760}},
			{version: 4, month: {price: 4500}, year: {price: 39000, originalPrice: 54000}}
	],

	navMenu: {
		accounts: [
			{key: 'summary', name: '总览'},
			// {key: 'scheme', name: '推荐计划'},
			{key: 'setting', name: '设置'},
			// {key: 'auth', name: '认证服务'},
			// {key: 'api', name: 'API'},
			{key: 'team', name: '邀请协作'},
		],
		finances: [
			{key: 'recharge', name: '充值'},
			{key: 'upgrade', name: '续费'},
			{key: 'bill', name: '账单'},
			{key: 'price', name: '价格'},
			{key: 'invoice', name: '发票'},
		]
	},

	// 特定处理映射
	filter: {
		// 版本名称
		versionNames: {
      1: '免费版',
      2: '中小团队版',
      3: '企业版',
      4: '大客户版'
	  },
    // 版本关键字
    versionKeys: {
    	1: 'free',
    	2: 'base',
    	3: 'gold',
    	4: 'diamond'
    },
    // 版本相应icon图标名称
    versionIconNames: {
    	1: 'free',
    	2: 'badge',
    	3: 'crown',
    	4: 'diamond'
    },
		// 账户类型
		accountType: {
			1: '普通用户',
			2: '管理员',
			3: '观察者',
			4: '创建者'
		},
		// 账户状态
		accountStatus: {
			0: {
				name: '已加入'	,
				color: Colors.SUCCESS
			},
			1: {
				name: '待加入',
				color: Colors.DANGER
			}
		},
		// 交易类型
		tradeTypes: {
			1: '充值',
			2: '消费'
		},

		tradeStatus: {
			0: {name: '未付款', color: Colors.DANGER},
			1: {name: '已付款', color: Colors.SUCCESS}
		},
		// 搜索建议应用
		authSuggestionApp: {
			contact: 1,
			page: 2,
			edm: 3,
			sms: 4
		},

		// 应用名称
		appNames: {
			contact:  'Contact',
			page: 		'Page',
			edm: 			'EDM',
			sms: 			'SMS',
			m1: 			'M1'
		},

		// 具体项目归类
		scopeType: {
			1: '文件夹',
			2: '群组',
			3: '项目',
			4: '项目',
			5: '项目'
		},
    // 获取金币任务
    goldTask: {
        '绑定安全邮箱':'/account/#setting',
        '绑定安全手机': '/account/#setting',
        '完善个人信息': '/account/#improve',
        '激活账号': '/account/',
        'M1第三方应用授权': '/account/#setting',
        '通过网页登录M1云端市场部': '/',
        '邀请好友注册M1云端市场部': '/account/#scheme',
        '企业邮箱激活赠送': null,
        '制作第一个Page并分享到社媒': 'http://page.m1world.com',
        '单个Page的PV达到2K': 'http://page.m1world.com/stat.html',
        '第一次导入联系人列表（1000以上）': 'http://contact.m1world.com'
    },
	},

	// 发票状态
	getInvoiceStatus(status) {
		let obj = {}
		switch(status) {
			case 1:
				obj.color = Colors.IGENOR
				obj.name = '待处理'
				break;
			case 2:
				obj.color = Colors.WRANGE
				obj.name = '已处理'
			case 3:
				obj.color = Colors.SUCCESS
				obj.name = '已配送'
				break
		}
		return obj
	},

	checkTeamVersion() {
		const edition = this.cookieInfo.user.accounts[0].edition
		return edition === 1 || edition === 2
	},

	checkApiVersion() {
		const edition = this.cookieInfo.user.accounts[0].edition
		return edition === 1 || edition === 2
	},

	getUserInfo() {
		return getUserInfo()
	},

	setUserInfo(result) {
		if(result.success) {
			this.info = result.data
		} else {

		}
	},

	/**
	 * 获取账号类型
	 * @return {Number} 
	 */
	getAccountType() {
		return this.cookieInfo.user.accounts[0].type
	},

	/**
	 * 获取账号权限详情JSON
	 * @return {Object} 权限详情json
	 */
	getAccountDetail() {
		return JSON.parse(this.cookieInfo.user.accounts[0].authDetail)
	},

	/**
	 * 是否可发送邀请
	 * @return {Boolean} 
	 */
	canSendInvitation(){
		if(this.getAccountType() === AccountTypes.GENERAL) {
			const detail = this.getAccountDetail()
			if(!detail.base.sendInvitation) {
				return false
			}
		}
		return true
	},

	intercomEvent(name) {
		return intercomEvent(name)
	},

	loadImageBase64(file, cb) {
		if(file) {
			const name = file.name
			const type = name.substring(name.lastIndexOf('.') + 1)
			const reg = /^(jpg)|(jpeg)|(png)|(bmp)/i
			// 判断浏览器是否支持FileReader
			if(typeof FileReader === 'undefined') {
				msg.info('您当前浏览器不支持')
				return void(0)
			}

			else if(!reg.test(type)) {
				msg.info('图片格式不正确')
			} else {
				const reader = new FileReader()
				reader.readAsDataURL(file)
				reader.onload = function() {
					if(cb) {
						cb(this.result)
					}
				}
			}
		} else {
			return false
		}
	},

	upgradeVersion(option, cb) {
		upgrade(option).then(result => {
			if(result.success) {
				this.updateUserInfoCookie()
			}	

			if(cb) {
				cb(result)
			}
		})
	},

	updateUserInfoCookie() {
		this.getUserInfo().then(result => {
			if(result.success) {
				const data = result.data
				const info = JSON.parse(decodeURIComponent(cookie.get(config.COOKIE_SOUPAI_USER)))
				info.user.accounts[0].edition = data.user.accounts[0].edition
				info.user.accounts[0].expireTime = data.user.accounts[0].expireTime
				this.cookieInfo = info
				const infoStr = encodeURIComponent(JSON.stringify(info))
				cookie.set(config.COOKIE_SOUPAI_USER, infoStr, {expires: 7, domain: config.COOKIE_SOUPAI_DOMAIN, path: '/'})
			}
		})
	},

	getAuthSuggestion(app, cb) {
		getAuthSuggestion(this.filter.authSuggestionApp[app]).then(result => {
			if(result.success) {
				this.authSuggestion[app] = result.data
				if(cb) {
					cb(result.data)
				}
			}
		})
	},

	/**
	 * 检测当前路由导航目录所属
	 * @param  {String} classify 所属类型 目前两个(account,finance)
	 */
	checkNavClassify(classify) {
		const isDefault = classify === 'account' && this.isNavDefault()
		const isNav = !!this.navMenu[`${classify}s`] && this.navMenu[`${classify}s`].some(v => location.hash.toLowerCase().indexOf(`/${v.key}`) >= 0)
		return isNav || isDefault
	},

	// 是否是默认路由导航路径
	isNavDefault() {
		return /(^#?\/$)|(^#?\/\?)/.test(location.hash)
	},

	// 检测并处理微信授权
	handleWechatAuth() {
		const authCode = utils.getUrlParam('auth_code')
		if(authCode) {
			msg.loading()
			wechatAuth(authCode).then(result => {
				msg.close()
				if(result.success) {

				} else {
					msg.info(result.data)
				}

				const pageUrl = cookie.get(config.COOKIE_PAGE_AUTH_WECHAT)
				if(pageUrl) {
					cookie.remove(config.COOKIE_PAGE_AUTH_WECHAT, {path: '/', domain: config.COOKIE_SOUPAI_DOMAIN})
					utils.redirectTo(decodeURIComponent(pageUrl))
				} else {
					utils.redirectTo(config.DOMAIN + '/account/#/setting')
				}
			})
		}
	},

	handleRef() {
		const ref = utils.getUrlParam('ref')

		let url
		// 百度推广来源页面
		if(ref === 'sem') {
			cookie.set(config.COOKIE_BAIDU_SEM, ref, {expires: 365, path: '/', domain: config.COOKIE_SOUPAI_DOMAIN})
		}
		// 新用户跳转到完善资料页面
		if(cookie.get(config.COOKIE_SOUPAI_FIRST_LOGIN) !== '') {
			url = config.DOMAIN + '/account/#/improve'
		}
		// 新用户第一次跳转页面
		else if(cookie.get(config.COOKIE_SOUPAI_FIRST_LOGIN) === '' && cookie.get(config.COOKIE_SOUPAI_FIRST_LOGIN_URL) !== '') {
			url = decodeURIComponent(cookie.get(config.COOKIE_SOUPAI_FIRST_LOGIN_URL))
			cookie.remove(config.COOKIE_SOUPAI_FIRST_LOGIN_URL, {path: '/', domain: cookie.COOKIE_SOUPAI_DOMAIN})
		}
		// Page应用微信授权跳转
		else if(ref === 'page_auth_wechat') {
			msg.loading()
			getWechatAuth().then(result => {
				msg.close()
				if(result.success) {
					cookie.set(config.COOKIE_PAGE_AUTH_WECHAT, this.prevPage || config.DOMAIN + '/account/', {expires: 1, domain: config.COOKIE_SOUPAI_DOMAIN, path: '/'})
					utils.redirectTo(result.data.url + config.DOMAIN + '/account/')
				}
			})

			return
		} else {
			return
		}

		utils.redirectTo(url)
	},

	// 检测用户用户登录状态
	checkLogin(){
		const token = cookie.get(config.COOKIE_SOUPAI_TOKEN)
		if(!token) {
			const url = encodeURIComponent(window.location.href)
			utils.redirectTo('/login.html?c=' + url)
		} 
	},

	init() {
		utils.checkBrowserSupport()

		this.handleRef()

		this.checkLogin()
		
		this.cookieInfo = JSON.parse(decodeURIComponent(cookie.get(config.COOKIE_SOUPAI_USER)))
    // console.log(this.cookieInfo)
		this.getUserInfo().then(this.setUserInfo.bind(this))

		this.handleWechatAuth()

	}
}