import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Button, Text, Alert, Tag, Icon, Input, Colors, Sizes } from '../../../components/m1-ui'
import { getAuthInfo, authBase, authSMS, authBaseAndSMS, uploadFile2 } from '../../../api/account'

import FormField from '../../../components/account/FormField'
import AuthStatus from '../../../components/account/AuthStatus'
import AuthLicence from '../../../components/account/AuthLicence'
import AuthViewBase from '../../../components/account/AuthViewBase'
import AuthViewSMS from '../../../components/account/AuthViewSMS'

import { msg, utils, http } from '../../../utils'
import { user } from '../../../base/account'

const tabs= {
	ENTERPRISE: 1,
	SMS: 2
}

class Auth extends Component {
	constructor(props){
		super(props)

		this.certifyInfo = {}

		this.state= {
			tabSelect: tabs.ENTERPRISE,
			showForm: false,
			showViewBase: false,
			company: '',
			address: '',
			website: '',
			business:'',
			name: 	 '',
			phone:   '',
			email:   '',
			icp:     '',
			baseStatus: -1,
			baseRemark: '',
			baseUpdateTime: 1483200000000,
			companySign: '',
			tem: [],
			zm: '',
			smsStatus: -1,
			smsRemark: '',
			smsUpdateTime: 1483200000000,

			checkCompany: true,
			checkAddress: true,
			checkWebsite: true,
			checkBusiness: true,
			checkName: true,
			checkPhone: true,
			checkEmail: true,
			checkIcp: true,
			checkCompanySign: true,
			checkTem: true,
			checkZm: true
		}
	}

	componentDidMount() {
		this.getAuthInfo()
	}

	getAuthInfo() {
		msg.loading()
		getAuthInfo().then(result => {
			msg.close()
			if(result.success) {
				const data = result.data
				this.certifyInfo = data
				this.setBaseInfo(data)
				this.setSmsInfo(data)
			} else {
				msg.info(result.data)
			}
		})
	}

	setBaseInfo(info) {
		const data = info.base || info.base_format
		if(data) {
			this.setState({
				company: data.company,
				address: data.address,
				website: data.website,
				business: data.business,
				name: data.name,
				phone: data.phone,
				email: data.email,
				icp: data.icp,
				baseStatus: data.status,
				baseRemark: data.remark,
				baseUpdateTime: data.updateTime
			})
		}
	}

	setSmsInfo(info) {
		const data = info.sms || info.sms_format
		if(data) {
			this.setState({
				companySign: data.companySign,
				tem: utils.isJSON(data.tem) ? JSON.parse(data.tem)[0].content : '',
				zm: data.zm,
				smsStatus: data.status,
				smsRemark: data.remark,
				smsUpdateTime: data.updateTime
			})
		}
	}

	handleViewBaseClose = e => {
		this.setState({
			showViewBase: false
		})
	}

	handleViewSMSClose = e => {
		this.setState({
			showViewSMS: false
		})
	}

	handleBaseAuthClick = e => {
		this.setState({
			tabSelect: tabs.ENTERPRISE,
			showForm: true
		})
	}

	handleBaseShowInfoClick = e => {
		this.setState({
			showViewBase: true
		})
	}

	handleSMSAuthClick = e => {
		if(!this.certifyInfo.base_format) {
			msg.info('企业认证通过后方可提交短信服务认证')
			return
		}
		this.setState({
			tabSelect: tabs.SMS,
			showForm: true
		})
	}

	handleSMSShowInfoClick = e => {
		this.setState({
			showViewSMS: true
		})
	}

	handleCancelClick = e => {
		this.setState({
			showForm: false
		})
	}

	handleSubmitClick = e => {
		if(this.state.tabSelect === tabs.ENTERPRISE) {
			if(this.checkSubmitBase()) {
				this.setState({
					tabSelect: tabs.SMS
				})
			}
			
		} else {
			if(this.checkSubmitSMS()) {
				if(!this.checkSubmitBase()) {
					this.setState({
						tabSelect: tabs.ENTERPRISE
					})
				} else {
					this.uploadImage().then(results => {
						this.submitAuth()
					})
				}
			}
		}
	}

	handleChangeCompany = e => {
		this.setState({
			company: e.target.value.trim(),
			checkCompany: true
		})
	}

	handleChangeAddress = e => {
		this.setState({
			address: e.target.value.trim(),
			checkAddress: true
		})
	}

	handelChangeWebsite = e => {
		this.setState({
			website: e.target.value.trim(),
			checkWebsite: true
		})
	}

	handleChangeName = e => {
		this.setState({
			name: e.target.value.trim(),
			checkName: true
		})
	}

	handleChangePhone = e => {
		this.setState({
			phone: e.target.value.trim(),
			checkPhone: true
		})
	}

	handleChangeEmail = e => {
		this.setState({
			email: e.target.value.trim(),
			checkEmail: true
		})
	}

	handleChangeCompanySign = e => {
		this.setState({
			companySign: e.target.value,
			checkCompanySign: true
		})
	}

	handleChangeTem = e => {
		this.setState({
			tem: e.target.value,
			checkTem: true
		})
	}

	handleUploadImage = (inputFile, eventKey) => {
		user.loadImageBase64(inputFile.files[0], result => {
			if(eventKey && result) {
				this.setState({
					[eventKey]: result
				})
			}
		})
	}

	checkSubmitBase() {
		const baseArr = ['company', 'address', 'website', 'name', 'phone', 'email']

		if(this.hasEmpty(baseArr)) {
			return false
		}

		let isOK = true
		if(this.state.business.length === 0) {
			msg.info('请上传公司营业执照')
			this.setState({
				checkBusiness: false
			})
			isOK = false
		} else if(this.state.icp.length === 0) {
			msg.info('请上传企业ICP备案证明')
			this.setState({
				checkIcp: false
			})
			isOK = false
		}

		return isOK
	}

	checkSubmitSMS() {
		const smsArr = ['companySign','tem']
		if(this.hasEmpty(smsArr)) {
			return false
		}
		return true
	}

	hasEmpty(arr) {
		return arr.some(v => {
				const isEmpty = this.state[v].length === 0
				if(isEmpty) {
					const upValue = v.substring(0,1).toUpperCase() + v.substring(1)
					this.setState({
						[`check${upValue}`]: false
					})
				}
				return isEmpty
		})
	}

	submitAuth() {
		const { company, address, website, business, name, phone, email, icp, companySign, tem, zm } = this.state
		let temArr = []
		const temObj = {
			name: '营销类短信模板',
			content: tem,
			type: 1
		}
		temArr.push(temObj);
		const baseParam = { company, address, website, business, name, phone, email, icp }
		const smsParam = { companySign, tem: JSON.stringify(temArr), zm  }

		msg.loading()
		authBaseAndSMS(baseParam, smsParam).then(([baseResult, smsResult]) => {
			msg.close()
			if(baseResult.success && smsResult.success) {
				msg.info('认证成功')
				this.getAuthInfo()
				this.setState({
					showForm: false
				})
			} else if(baseResult.success && !smsResult.success) {
				msg.info('短信认证失败')
			} else {
				msg.info('认证失败')
			}
		})
	}

	uploadImage() {
		const {business, icp, zm} = this.state
		let names = []
		let uploadParams = []
		if(business && business.indexOf('base64') >= 0) {
			names.push('business')
			uploadParams.push(uploadFile2({fileStr: business}))
		}
		if(icp && business.indexOf('base64') >= 0) {
			names.push('icp')
			uploadParams.push(uploadFile2({fileStr: icp}))
		}
		if(zm && business.indexOf('base64') >= 0) {
			names.push('zm')
			uploadParams.push(uploadFile2({fileStr: zm}))
		}
		msg.loading()
		return new Promise((resolve, reject) => {
			if(uploadParams.length === 0) {
				resolve([])
			} else {
				http.all(...uploadParams).then(results => {
					msg.close()
					results.forEach((item, i) => {
						if(item.success) {
							const name = names[i]
							this.setState({
								[name]: item.data.fileUrl
							})
						}
					})
					resolve(results)
				})
			}
			
		})
		
	}


	renderAuthEnterprise() {
		const { company, address, website, business, name, phone, email, icp, baseStatus, baseRemark,
			checkCompany, checkAddress, checkWebsite, checkBusiness, checkName, checkPhone, checkEmail, checkIcp
		 } = this.state
		return (
			<div className="m1-tab-pane auth-form select">
				<div className="m1-row">
					<div className="m1-col-6">
						<div className="m1-form">
							<FormField title="公司名称" check={checkCompany}  value={company} onChange={this.handleChangeCompany} placeholder="请输入公司名称" />
							<FormField title="公司地址" check={checkAddress}  value={address} onChange={this.handleChangeAddress} placeholder="请输入公司地址" />
							<FormField title="公司网站"  check={checkWebsite} value={website} onChange={this.handelChangeWebsite} placeholder="请输入网址" />
							<FormField title="联系人"   check={checkName}  value={name}    onChange={this.handleChangeName} placeholder="请输入姓名" />
							<FormField title="联系电话" check={checkPhone}  value={phone}   onChange={this.handleChangePhone} placeholder="请输入电话号码" />
							<FormField title="联系邮箱"  check={checkEmail} value={email}   onChange={this.handleChangeEmail} placeholder="请输入邮箱号" />
						</div>
					</div>
					<div className="m1-col-6">
						<div className="auth-enterprise-licence">
								<AuthLicence
									eventKey="business"
									title="公司营业执照（公章电子版）"
									intro="[必要证件]请将贵公司营业执照打印并加盖企业公章后，拍照上传，照片需	清晰识别文案。"
									imgUrl={business}
									showUrl="http://www.m1world.com/docs/m1enterprisecard-eg.jpg"
									onUpload={this.handleUploadImage}
									required
								/>

								<AuthLicence
									eventKey="icp"
									title="企业ICP备案证明（公章电子版）"
									intro="[必要证件]请将贵公司ICP备案证明打印并加盖企业公章后，拍照上传，照片需	清晰识别文案。"
									imgUrl={icp}
									showUrl="http://www.m1world.com/docs/m1icp-eg.jpg"
									operateUrl={'http://www.m1vip.cn/s/tyo9ie'}
									onUpload={this.handleUploadImage}
									required
								/>
								
						</div>
						
					</div>
				</div>
			</div>
		)
	}

	renderAuthSMS() {
		const { companySign, tem, zm, checkCompanySign, checkTem, checkZm } = this.state
		return (
			<div className="m1-tab-pane auth-form select">
				<div className="m1-row">
					<div className="m1-col-6">
						<div className="m1-form">
							<FormField 
								title="短信签名" 
								check={checkCompanySign}
								value={companySign} 
								onChange={this.handleChangeCompanySign} 
								placeholder="请输入公司名称" 
								inputText="请填写公司、品牌、网站简称等具识别力的名称，3-8个字符内，不能纯英文，可中英混合，签名需提交运营商备案，请您务必谨慎填写！"
								/>
							<FormField
								multi
								title="短信模板"
								check={checkTem}
								value={tem}
								onChange={this.handleChangeTem}
								placeholder="请输入短信模板"
								cols="30" rows="8" 
							/>
							
						</div>
					</div>
					<div className="m1-col-6">
						<AuthLicence 
							eventKey="zm"
							className="sms"
							title="签名与营业执照不符证明"
							intro={<span>如您提交的签名与营业执照名称不符，需提供签名与营业执照不符证明（公章电子版）。点击<a href="http://www.m1world.com/docs/signnotmatch.docx" target="_blank">下载模板</a>，打印并加盖公章后拍照上传。查看示例图片</span>}
							imgUrl={zm}
							showUrl="http://www.m1world.com/docs/m1signnotmatch-eg.jpg"
							onUpload={this.handleUploadImage}
						/>
					</div>
				</div>
			</div>
		)
	}

	renderAuthForm() {
		const { tabSelect } = this.state
		const entClassName = classNames(
								"m1-col-6",
								'select'
								)
		const smsClassName = classNames(
								"m1-col-6",
								tabSelect === tabs.SMS ? 'select' : null
								)
		return (
			<div className="m1-row">
				<ul className="m1-tab-nav auth-nav">
					<li className={entClassName}><a onClick={e => this.selectTabHandler(tabs.ENTERPRISE)}>企业资质认证</a><span></span></li>
					<li className={smsClassName}><a onClick={e => this.selectTabHandler(tabs.SMS)}>短信服务认证</a><span></span></li>
				</ul>
				<div className="m1-tab-content auth-content">
					{this.state.tabSelect === tabs.ENTERPRISE ?
						this.renderAuthEnterprise() :
						this.renderAuthSMS()
					}
					<div className="m1-row auth-intro">
						<p>企业资质认证及短信服务认证时间约为3-5个工作日，为了不影响您的使用，请提前进行认证。</p>
					</div>
					<div className="m1-row auth-btns">
						<Button onClick={this.handleCancelClick}>取消</Button>
						<Button color={Colors.PRIMARY} onClick={this.handleSubmitClick}>{tabSelect === tabs.ENTERPRISE ? '下一步' : '提交认证'}</Button>
					</div>
				</div>
			</div>
		)
	}

	selectTabHandler = (tab) => {
		this.setState({
			tabSelect: tab || tabs.ENTERPRISE
		})
	}

	renderStatus() {
		const { baseUpdateTime, smsUpdateTime, baseStatus, smsStatus, baseRemark, smsRemark } = this.state
		return (
			<div className="m1-row auth-status-container">
					<AuthStatus 
						title="企业资质认证" 
						time={utils.formatDate(baseUpdateTime)} 
						status={baseStatus} 
						remark={baseRemark} 
						onAuth={this.handleBaseAuthClick} 
						onReauth={this.handleBaseAuthClick}
						onShowInfo={this.handleBaseShowInfoClick}
					/>
					<AuthStatus 
						title="短信服务认证" 
						time={utils.formatDate(smsUpdateTime)} 
						status={smsStatus} 
						remark={smsRemark} 
						onAuth={this.handleSMSAuthClick}
						onReauth={this.handleSMSAuthClick}
						onShowInfo={this.handleSMSShowInfoClick}
					/>
			</div>
		)
	}
	
	render() {
		const baseInfo = this.certifyInfo.base || this.certifyInfo.base_format || {}
		const smsInfo =  this.certifyInfo.sms || this.certifyInfo.sms_format || {}
		return (
			<div className="m1-panel">
				<div className="m1-panel-header">
					<h2>认证服务</h2>
				</div>
				<div className="m1-panel-content">
					{this.state.showForm ? this.renderAuthForm() : this.renderStatus()}				
					<div className="m1-row auth-alert">
						<Alert color={Colors.PRIMARY}>
							<h4>认证须知</h4>
							<ul className="m1-ul">
								<li>M1对注册用户进行企业资质认证主要是为了确保企业信息的真实性、安全性，确保企业为合法可信的组织或机构。</li>
								<li>因为国家法律对短信营销有关制约规定，需要企业提供相关材料证明用于提交备案，特别声明：因国家命令禁止的发送行业有：<Text color={Colors.DANGER}>留学、移民、房地产、私募</Text>该4大类无任何通道资源，无法提供签名申请。</li>
								<li>如您需要使用短信营销服务，请仔细阅读M1云端实处<a href="http://www.m1world.com/terms.html#terms_sms" target="_blank">短信发送服务协议</a></li>
							</ul>
						</Alert>
					</div>
				</div>
				<AuthViewBase show={this.state.showViewBase} onClose={this.handleViewBaseClose} info={baseInfo}/>
				<AuthViewSMS show={this.state.showViewSMS} onClose={this.handleViewSMSClose} info={smsInfo}/>
			</div>
		)
	}
}

export default Auth