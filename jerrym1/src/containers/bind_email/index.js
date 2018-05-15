
import '../../sass/active_account.scss';

import { utils } from '../../utils'

import { activeBindEmail } from '../../api/sign'

import img_success from '../../assets/images/active_email_success.svg'
import img_fail from '../../assets/images/active_email_fail.svg'

class ActiveEmail {
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

		this.activeBindEmail()
	}

	showView() {
		this.loading.style.display = 'none'
		this.view.style.display = 'block'
	}

	activeBindEmail() {
		activeBindEmail(this.token).then(result => {
			if(result.success) {
				this.title.innerHTML = '恭喜你，邮件重新绑定成功！'
				this.intro.innerHTML = ''
				this.img.src = img_success
			} else {
				this.title.innerHTML = '不好意思，邮件重新绑定失败！'
				this.intro.innerHTML = ''
				this.img.src = img_fail
			}
				this.showView()
		})
	}

}

const active = new ActiveEmail()
active.init()
