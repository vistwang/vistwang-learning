import React, { Component } from 'react'
import classNames from 'classnames'
import { Input, Button, Icon, Colors, Sizes } from '../../components/m1-ui'

import { utils, config, msg, cookie } from '../../utils'
import { user } from '../../base/account'
import { improveInfo, getIndustry } from '../../api/account'

import IndustryDropdown from '../../components/account/industryDropdown'
import IndustryKeys from '../../components/account/industryKeys'

class Improve extends Component {
	constructor(props) {
		super(props)

		this.industryKey = ''

		this.state = {
			username: '',
			company: '',
			job: '',
			industryId: 0,
			industryName: '行业',
			industryList: [],
			industryItem: null,

			usernameErr: false,
			companyErr: false,
			jobErr: false
		}
	}

	componentDidMount() {
		this.init()
	}

	init() {
		cookie.remove(config.COOKIE_M1_FIRST_LOGIN,{path: '/', domain: 'm1world.com'})

		this.getIndustryList()

	}

	getIndustryList() {
		getIndustry().then(result => {
			if(result.success) {
				this.setState({
					industryList: result.data
				})
			}
		})
	}

	handleUserNameChange = e => {
		this.setState({
			username: e.target.value
		})
	}

	handleCompanyChange = e => {
		this.setState({
			company: e.target.value
		})
	}

	handleJobChange = e => {
		this.setState({
			job: e.target.value
		})
	}

	handleInputFocus = name => {
		this.setState({
			[`${name}Err`]: false
		})
	}

	handleIndustrySelect = id => {
		const industry = this.state.industryList.find(item => item.id === id)
		this.setState({
			industryId: id,
			industryName: industry.name,
			industryItem: industry
		})
	}

	handleKeysSelect = keys => {
		this.industryKey  = keys
	}

	handleSaveClick = e => {
		const { username, company, job, industryId } = this.state
		if(username.trim().length === 0) {
			this.setState({
				usernameErr: true
			})
			return
		} else if(company.trim().length === 0) {
			this.setState({
				companyErr: true
			})
			return
		} else if(job.trim().length === 0){
			this.setState({
				jobErr: true
			})
			return
		} else {
			let paramOption = {
				realname: username.trim(),
				company: company.trim(),
				jobtitle: job.trim()
			}

			if(industryId) {
				paramOption.industry = industryId
			}

			if(this.industryKey) {
				paramOption.industry_key = this.industryKey
			}

			msg.loading()
			improveInfo(paramOption).then(result => {
				msg.close()
				if(result.success) {
					utils.redirectTo(config.DOMAIN + '/account/')
				} else {
					msg.info(result.data)
				}
			})
		}

	}

	handleSkipClick = e => {
		utils.redirectTo(config.DOMAIN + '/account/')
	}

	render() {
		const { username, company, job, industryId, industryList, industryName, industryItem, usernameErr, companyErr, jobErr } = this.state
		return (
			<div className="m1-panel">
				<div className="m1-panel-header">
					<h2>完善账户信息 <span className="title-describe">完善账户信息并绑定手机后可立即获得100M币的奖励（M币可用于充值余额，购买版本等其他消费行为，详细<a href="http://www.m1world.com/terms.html#m_b" target="_blank">了解M币</a>）</span></h2>
				</div>
				<div className="m1-panel-content">
					<div className="improve-content">
						<div className="m1-form">
							<div className="m1-form-row">
								<div className="m1-form-content">
									<Icon name="user" />
									<Input className={classNames('m1-form-input',{'error': usernameErr})} value={username} placeholder="姓名" onChange={this.handleUserNameChange} onFocus={e => this.handleInputFocus('username')}/>
								</div>
							</div>
							<div className="m1-form-row">
								<div className="m1-form-content">
									<Icon name="company" />
									<Input className={classNames('m1-form-input',{'error': companyErr})} value={company} placeholder="公司" onChange={this.handleCompanyChange} onFocus={e => this.handleInputFocus('company')}/>
								</div>
							</div>
							<div className="m1-form-row">
								<div className="m1-form-content">
									<Icon name="position" />
									<Input className={classNames('m1-form-input',{'error': jobErr})} value={job} placeholder="职位" onChange={this.handleJobChange} onFocus={e => this.handleInputFocus('job')}/>
								</div>
							</div>
						{/*行业信息下啦*/}
							<div className="m1-form-row">
								<div className="m1-form-content">
									<Icon name="industry" />
									<IndustryDropdown 
										className={classNames({'no-select': industryId === 0})}
										list={industryList}
										title={industryName}
										onSelect={this.handleIndustrySelect}
									/>
								</div>
							</div>
							<div className="m1-form-row">
								<div className="m1-form-content">
									{industryItem && <IndustryKeys
																			className="industry-keys"
																			keyword={industryItem.keyword}
																			onSelect={this.handleKeysSelect}
																		/>}
									{industryItem && <p className="industry-intro">选择以上行业特征词将有助于系统智能推荐与您更贴合的模板和素材等</p>}
								</div>
							</div>
							<div className="m1-form-row">
								<div className="m1-form-content">
									<Button color={Colors.PRIMARY} size={Sizes.LARGE} onClick={this.handleSaveClick} >保存账户信息</Button>
								</div>
							</div>
							<div className="m1-form-row">
								<div className="m1-form-content">
									<a onClick={this.handleSkipClick}>跳过</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Improve
