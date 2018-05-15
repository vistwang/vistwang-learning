
import '../../sass/active_account.scss';

import { utils } from '../../utils'

import { activeAccount } from '../../api/sign'

import img_success from '../../assets/images/active_email_success.svg'
import img_fail from '../../assets/images/active_email_fail.svg'

class ActiveAccount {
	constructor() {
		this.loading = null
		this.view = null
		this.status = null
		this.title = null
		this.intro = null
		this.img = null

		this.token = ''
	}

	init() {
		this.loading = document.getElementById('active-email-loading')
		this.view = document.getElementById('active-email-view')
		this.status = document.getElementById('active-status-image')
		this.title = document.getElementById('active-title')
		this.intro = document.getElementById('active-intro')

		this.img = document.createElement('img')
		this.status.appendChild(this.img)

		this.view.style.display = 'none'

		this.token = utils.getUrlParam('token')

		this.activeAccount()
	}

	showView() {
		this.loading.style.display = 'none'
		this.view.style.display = 'block'
	}

	activeAccount() {
		activeAccount(this.token).then(result => {
			if(result.success) {
				this.title.innerHTML = '恭喜你，账户激活成功！'
				this.intro.innerHTML = '现在您可以免费使用M1云端市场部啦！<br/>立即登录，并完成个人资料后，我们将增送	您200M币（<a href="http://www.m1world.com/terms.html#m_b" target="_blank">什么是M币？</a>），<br/>还等什么，赶快行动吧！'
				this.img.src = img_success
			} else {
				this.title.innerHTML = '不好意思，您的账户已经激活过了！'
				this.intro.innerHTML = '现在您可以免费试用M1云端市场部啦！<br/>立即登录，并完成个人资料后，我们将增送	您50M币（价值等于200封邮件），还等什么，赶快行动吧！'
				this.img.src = img_fail
			}
				this.showView()
		})
	}

}

const active = new ActiveAccount()
active.init()
