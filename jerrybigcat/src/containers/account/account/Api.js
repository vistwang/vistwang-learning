import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Input, Button, Colors, Text, Tag, Alert } from '../../../components/m1ui'

import { msg, utils } from '../../../utils'
import { getAPIDetail, editAPI, resetAPI } from '../../../api/account'
import { user } from '../../../base/system'


class Api extends Component {
	constructor(props) {
		super(props)

		this.appDetail = {}

		this.state = {
			app_name: '',
			app_url: '',
			app_key: '',
			app_secret: '',
			isFirst: false,

			version: 0,
			versionName: '',
			expireTimeStr: ''
		}
	}

	componentDidMount() {
		this.init()
	}

	init() {
		if(!this.checkVersionConfirm()) {
			this.getAPIDetail()
		}
		this.setVersionInfo()
	}

	/**
	 * 检测用户版本是否为免费版或标准版并提示
	 * @return {Boolean}
	 */
	checkVersionConfirm() {
		if(user.checkApiVersion()) {
			msg.confirm('当前版本无权限，请升级版本', () => {
				msg.close()
				this.props.history.push('/price')	
			})
			return true
		}
		return false
	}

	setVersionInfo() {
		const version = user.cookieInfo.user.accounts[0].version
		const versionName = user.filter.versionNames[version]
		const expireTimeStr = utils.formatDate(user.cookieInfo.user.accounts[0].expireTime)
		this.setState({
			version,
			versionName,
			expireTimeStr
		})
	}

	getAPIDetail() {
		msg.loading()
		getAPIDetail().then(result => {
			msg.close()
			if(result.success) {
				const data = result.data
				const isFirst = !data.app_name || !data.app_url
				this.appDetail = data
				if(!isFirst) {
					this.setState({
						app_name: data.app_name,
						app_url:  data.app_url,
						app_key:  data.app_key,
						app_secret: data.app_secret
					})
				}
				this.setState({isFirst})
				
			} else if(result.data === 'No authorization') {
				msg.confirm('当前版本无权限，请升级版本', () => {
					this.props.history.push('/price')
					msg.close()
				})
			} else {
				msg.info(result.data)
			}
		})
	}

	resetAPI() {
		msg.loading()
		resetAPI().then(result => {
			msg.close()
			if(result.success) {
				this.getAPIDetail()
			} else {
				msg.info(result.data)
			}
		})
	}

	handleClickAppName = e => {
		this.setState({
			app_name: e.target.value.trim()
		})
	}

	handleClickAppUrl = e => {
		this.setState({
			app_url: e.target.value.trim()
		})
	}

	handleBlurAppName = e => {
		const { app_name } = this.state
		if(app_name.length === 0) {
			this.setState({
				app_name: this.appDetail.app_name || ''
			})
		} else {
			this.editAPI()
		}		
	}

	handleBlurAppUrl = e => {
		const { app_url } = this.state
		if(app_url.length === 0) {
			this.setState({
				app_url: this.appDetail.app_url || ''
			})
		} else {
			this.editAPI()
		}	
	}

	editAPI() {
		const { app_name, app_url } = this.state
		if(app_name !== '' && app_url !== '' && (app_name !== this.appDetail.app_name || app_url !== this.appDetail.app_url)) {
			editAPI(app_name, app_url).then(result => {
				if(result.success){
					this.appDetail.app_name = app_name
					this.appDetail.app_url = app_url
				} else {
					msg.info(result.data)
				}
			})
		}
	}

	handleClickReset = e => {
		if(this.checkVersionConfirm()) {
			return
		}
		const { isFirst } = this.state
		if(isFirst) {
			this.getAPIDetail()
		} else {
			msg.confirm('是否确认重置API授权令牌，重置后之前生成的<br/>令牌信息将失效，请您谨慎操作', () => {
				this.resetAPI()
				msg.close()
			})
		}
	}

	renderForm() {
		const { app_name, app_url, app_key, app_secret } = this.state
		return (
			<div className="m1-row">
				<div className="app-column">
					<div className="m1-form-row">
						<div className="m1-form-label">应用名称：</div>
						<div className="m1-form-content">
							<Input type={'text'} className="m1-form-input" value={app_name} onChange={this.handleClickAppName} onBlur={this.handleBlurAppName} placeholder="请输入应用名称" />
						</div>
					</div>
					<div className="m1-form-row">
						<div className="m1-form-label">API KEY：</div>
						<div className="m1-form-content">{app_key && <Alert color={Colors.PRIMARY}>{app_key}</Alert>}</div>
					</div>
				</div>
				<div className="app-column">
					<div className="m1-form-row api-cburl">
						<div className="m1-form-label">回调地址：</div>
						<div className="m1-form-content">
							<Input type={'text'} className="m1-form-input" value={app_url} onChange={this.handleClickAppUrl} onBlur={this.handleBlurAppUrl} placeholder="请输入回调地址" />
						</div>
					</div>
					<div className="m1-form-row api-secret">
						<div className="m1-form-label">API SECRET：</div>
						<div className="m1-form-content">{app_secret && <Alert color={Colors.PRIMARY}>{app_secret}</Alert>}</div>
					</div>
				</div>
			</div>
		)
	}

	render() {
		const { isFirst, versionName, expireTimeStr } = this.state
		const noAuth = user.checkApiVersion()

		const noAuthView = <div className="m1-new">
			<p>您当前版本为：{versionName}，为获得API访问权限。请立即升级到<Link to="/price?v=2&u=year">黄金版</Link>或<Link to="/price?v=3&u=year">钻石版</Link>拥有此权限！</p>
		</div>

		return (
			<div className="m1-panel">
				<div className="m1-panel-header">
					<h2>查看API信息 <span className="title-describe">您当前版本为<Text color={Colors.PRIMARY}>{versionName}（至{expireTimeStr}）</Text>，已获得API访问权限。</span></h2>
				</div>
				<div className="m1-panel-content">
					<div className="api-content">
						{noAuth ? noAuthView : this.renderForm() }
						<div className="m1-row">
							<p className="api-auth-btn">
								<Button color={Colors.PRIMARY} onClick={this.handleClickReset} >{isFirst ? '获取API授权令牌' : '重置API授权令牌'}</Button> { isFirst && <Text color={Colors.DANGER}>第一次使用要先获取</Text>}
							</p>
							<p className="api-auth-intro">
								为了使用安全您可以定期更换（重置）API Key，重置后之前生成的API字段将失效。
							</p>
						</div>
						<div className="m1-row api-notify">
							<Alert color={Colors.PRIMARY}>
								<h4>API使用须知</h4>
								<ol className="m1-ul">
									<li>API调用权限黄金版、钻石版套餐用户。有关API调用，可参考API接口文档，请点击<a href="http://www.m1world.com/api-docs.html" target="_blank">了解详情</a>。</li>
								</ol>
							</Alert>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Api