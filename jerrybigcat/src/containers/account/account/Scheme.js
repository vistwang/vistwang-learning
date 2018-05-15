import React, { Component } from 'react'
import QRCode from 'qrcode.react'
import { Input, Button, Tag, Alert, Text, Icon, Modal, Colors, Sizes } from '../../../components/m1ui'
import InfoBox from '../InfoBox'
import { getRecommendList, sendRecommendEmail } from '../../../api/account'
import { msg, utils, config } from '../../../utils'

import { user } from '../../../base/system'

// 推荐注册链接
const link = config.DOMAIN + '/register.html?refCode='
const shareLink = config.DOMAIN + '/share.html?'
let avatar = ''
let name = ''

// 了解M币链接
const MB_Link = config.DOMAIN + '/terms.html#m_b'

class Scheme extends Component {
	constructor(props) {
		super(props)

		this.state = {
			coupon: 0,
			recommendUser: 0,
			recommendCode: '',
			recommendUrl : '',
			users: [],
			currentEmail: '',
			emails: [],
			wechatShareUrl: '',
			wechatQRShow: false
		}

		this.init()
	}

	componentDidMount() {
		// this.getRecommendList()
	}

	init() {
		if(user.cookieInfo) {
			avatar = user.cookieInfo.user.accounts[0].avatar
			name 	 = user.cookieInfo.user.accounts[0].fullName
		}
	}

	getRecommendList() {
		msg.loading()
		getRecommendList('m1').then(result => {
			msg.close()
			if(result.success) {
				const data = result.data
				this.setState({
					coupon: data.coupon,
					recommendUser: data.recommendUser,
					recommendCode: data.recommendcode,
					recommendUrl: link + data.recommendcode,
					users: data.users
				})
			} else {
				msg.info(result.data)
			}
		})
	}

	copyInput(input) {
		if(input && input.select) {
			input.select()
			try{
				document.execCommand('copy')
				input.blur()
				msg.info('复制成功！')
			} catch(err) {
				msg.info('复制失败，请通过Ctrl+C/Command+C来复制')
			}
		}
	}

	handleCopyCodeClick = e => {
		this.copyInput(this.refs.input_code)
	}

	handleCopyUrlClick = e => {
		this.copyInput(this.refs.input_url)
	}

	handleRemoveRecommendEmail = email => {
		this.removeEmail(email)
	}

	handleClickSendEmail = e => {
		const { emails } = this.state
		if(emails.length === 0) {
			msg.info('请先添加推荐邮箱')
		} else {
			msg.loading()
			sendRecommendEmail(emails.join(';')).then(result => {
				msg.close()
				if(result.success) {
					msg.info('发送推荐邮箱成功')
					this.setState({
						emails: []
					})
				} else {
					msg.info(result.data)
				}
			})
		}
	}

	handleChangeCurrentEmail = e => {
		const currentEmail = e.target.value.trim()
		this.setState({
			currentEmail
		})
	}

	handleKeyupEmail = e => {
		if(e.keyCode === 13) {
			this.addEmail()
		}
	}

	handleClickAddEmail = e => {
		this.addEmail()
	}

	addEmail = () => {
		const { currentEmail,emails } = this.state

		if(currentEmail.length === 0) {
			return
		} else if(!utils.isEmail(currentEmail)) {
			msg.info('邮箱格式不正确')
			return
		}

		if(this.hasEmail(currentEmail)){
			msg.info('此邮箱已存在推荐人列表中')
		} else {
			emails.push(currentEmail)
			this.setState({
				currentEmail: '',
				emails
			})
		}
	}

	removeEmail = (removeEmail) => {
		const { emails } = this.state
		const newEmails = []
		emails.forEach(email => {
			if(email !== removeEmail) {
				newEmails.push(email)
			}
		})

		this.setState({
			emails: newEmails
		})
	}

	hasEmail(email) {
		return this.state.emails.indexOf(email) >= 0
	}

	handleWechatClose = e => {
		this.setState({
			wechatQRShow: false
		})
	}

	// 微信推荐
	handleClickWechat = e => {
		const { recommendUrl } = this.state

		const share = shareLink + 'rcmd_link=' + recommendUrl + '&avatar=' + avatar + '&name=' + name
		this.setState({
			wechatQRShow: true,
			wechatShareUrl: share
		})
	}

	// 微博推荐
	handleClickWeibo = e => {
		const { recommendUrl } = this.state
		//intercom 事件
		user.intercomEvent('/M1/RECOMMEND CLICK');

		const share = shareLink + 'rcmd_link=' + recommendUrl + '&avatar=' + avatar + '&name=' + name
		const title = '分享 | M1 | 云端市场部'
		//新浪微博分享代码，与page相同
		;(function (s, d, e, r, l, p, t, z, c) {
		    var f = 'http://v.t.sina.com.cn/share/share.php?appkey=1881139527', u = z || d.location, p = ['&url=', e(u), '&title=', e(t || d.title), '&source=', e(r), '&sourceUrl=', e(l), '&content=', c || 'gb2312', '&pic=', e(p || '')].join('');

		    function a() {
		        if (!window.open([f, p].join(''), 'mb', ['toolbar=0,status=0,resizable=1,width=440,height=430,left=', (s.width - 440) / 2, ',top=', (s.height - 430) / 2].join('')))u.href = [f, p].join('');
		    }

		    if (/Firefox/.test(navigator.userAgent))setTimeout(a, 0); else a();
		})(screen, document, encodeURIComponent, '', '', '', title, share, '页面编码gb2312|utf-8默认gb2312')
	}

	// QQ推荐
	handleClickQQ = e => {
		const { recommendUrl } = this.state
		//intercom 事件
		user.intercomEvent('/M1/RECOMMEND CLICK')

		const share = shareLink + 'rcmd_link=' + recommendUrl + '&avatar=' + avatar + '&name=' + name
		const title = '您的朋友推荐您使用M1云端市场部'

		//QQ空间分享代码，与page相同
		;(function (url, title) {
		    var d = document, e = encodeURIComponent, r = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + e(url) + '&title=' + e(title) + '', x = function () {
		        if (!window.open(r, 'qzone', 'toolbar=0,resizable=1,scrollbars=yes,status=1,width=600,height=600'))location.href = r
		    };
		    if (/Firefox/.test(navigator.userAgent)) {
		        setTimeout(x, 0)
		    } else {
		        x()
		    }
		})(share, title)
	}

	renderSchemeHead() {
		const { coupon, users } = this.state
		return (
			<div className="m1-row">
					<InfoBox className="invite" iconName={'cooperation'} describe={'已成功推荐'} hasMember={true} members={users} />
					<div className="info-box invite">
						<div className="right-border"></div>
					</div>
					<InfoBox className="gold invite" iconName={'currency'} value={coupon} describe={'获得M币'} />
			</div>
		)
	}

	renderEmailRecommend() {
		const { emails, currentEmail } = this.state

		const emailList = emails.map((email,i) => {
			return (
				<Tag key={i} color={Colors.PRIMARY} removeable onClose={e => this.handleRemoveRecommendEmail(email)}>{email}</Tag>
			)
		})

		return (
			<li>
				<h4><Tag className="tag-circle" color={Colors.PRIMARY}>3</Tag> 邮件推荐 <span className="title-describe"> 您可以发送推荐邮件给您的朋友</span></h4>
				<p className="add-email-list">
					{emailList}
					<Input value={currentEmail} onChange={this.handleChangeCurrentEmail} onKeyUp={this.handleKeyupEmail} placeholder="请输入您的好友邮箱" />
					<Button className="btn-add-email" color={Colors.TAGPRIMARY} onClick={this.handleClickAddEmail}><Icon name="add-to" /> 添加</Button>
					<Button color={Colors.PRIMARY} onClick={this.handleClickSendEmail} >发送</Button></p>
			</li>
		)
	}


	render() {
		const { recommendCode, recommendUrl, emails, wechatQRShow, wechatShareUrl } = this.state
		return (
			<div className="m1-panel">
				<div className="m1-panel-header">
					<h2>我的推荐<span className="title-describe"> 每成功推荐一位好友，推荐双方均可获得 <Text className="scheme-reward-num" color={Colors.DANGER}>800</Text> M币，<a href={MB_Link} target="_blank">了解M币</a></span></h2>
				</div>
				<div className="m1-panel-content">
					{this.renderSchemeHead()}

					<div className="m1-row scheme-content">
						<h3>邀请方式 <span className="title-describe"> 您可以通过以下四种方式邀请朋友加入M1云端市场部</span></h3>
						<ul>
							<li>
								<h4><Tag className="tag-circle" color={Colors.PRIMARY}>1</Tag> 我的专属推荐码 <span className="title-describe"> 您可以复制此推荐码给您的朋友，注册时候请输入此推荐码即可</span></h4>
								<p className="scheme-code"><label>推荐码：</label><input ref="input_code" value={recommendCode} /><Button color={Colors.PRIMARY} onClick={this.handleCopyCodeClick} >复制</Button></p>
							</li>
							<li>
								<h4><Tag className="tag-circle" color={Colors.PRIMARY}>2</Tag> 推荐链接 <span className="title-describe"> 您可以复制此链接给您的朋友，通过此链接注册成功即可</span></h4>
								<p className="scheme-link"><input ref="input_url" value={recommendUrl} /><Button color={Colors.PRIMARY} onClick={this.handleCopyUrlClick} >复制</Button></p>
							</li>
							{this.renderEmailRecommend()}
							<li>
								<h4><Tag className="tag-circle" color={Colors.PRIMARY}>4</Tag> 社交方式分享 <span className="title-describe"> 您可以通过以下几种渠道分享给您的朋友</span></h4>
								<p className="scheme-social">
									<a className="sina" onClick={this.handleClickWeibo}> <Icon name="sina" /> </a>
									<a className="wechat" onClick={this.handleClickWechat}> <Icon name="wechat" /> </a>
									<a className="qq" onClick={this.handleClickQQ}> <Icon name="qq" /> </a>
								</p>
								<Modal show={wechatQRShow} onClose={this.handleWechatClose} style={{width: '500px'}} >
									<Modal.Body style={{textAlign: 'center', paddingTop: '20px', paddingBottom: '40px'}}>
										<p style={{fontSize: '22px'}} >扫描下方二维码分享</p>
										<QRCode value={wechatShareUrl} size={270} />
										<br/>
										<br/>
										<p>打开微信，点击底部的“发现”，<br/>使用“扫一扫”可将网页分享至朋友圈。</p>
									</Modal.Body>
								</Modal>
							</li>
						</ul>
					</div>

					<div className="m1-row scheme-notice">
						<Alert color={Colors.PRIMARY}>
							<h4>推荐须知</h4>
							<ol className="m1-ul">
								<li>每位成功推荐一位好友注册并激活成功后，您和被推荐者均可获得800个M币（100M币=1RMB）。</li>
								<li>M币可用于账户余额充值、购买付费套餐等其他消费。</li>
								<li>M币不可提现或转账、不可转给其他账号使用，限有效期内使用。</li>
							</ol>
						</Alert>
					</div>

					<div className="m1-row">
						<Alert color={Colors.DANGER}>
							<span><Text color={Colors.DANGER}>注：</Text>如发现用户有使用非正常手段注册多账号推荐等恶意行为，M1有权删除涉及账号所有M币，同时可视情节严重性对相关账号进行封号处理，敬请谅解！</span>
						</Alert>
					</div>
				</div>
			</div>
		)
	}
}

export default Scheme