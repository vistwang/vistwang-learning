import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'

import { msg } from '../../../utils'
import { user } from '../../../base/account'
import { Modal, Button, ButtonGroup, Checkbox, Radio, Tag, Text, Icon, Colors, Sizes } from '../../../components/m1-ui'
import { AccountTypes, AccountAuths, AppNames } from '../../../base/enums'
import AuthSearch from '../../../components/account/AuthSearch'
import TeamBatchEditAuth from './TeamBatchEditAuth'

import comingSoonImage from '../../../assets/images/coming_soon.svg'
import teamEmptyImage from '../../../assets/images/team_empty.svg'

const apps = [AppNames.CONTACT, AppNames.PAGE, AppNames.EDM, AppNames.SMS]

// 目前还不支持单个应用权限设置的应用
const disableSingleApps = [AppNames.PAGE, AppNames.EDM, AppNames.SMS]

const defaultDetail = {
    "base": {
        "sendInvitation": false
    },
    "app": [
        {
            "code": "CONTACT",
            "authority": {
                "general": {
                    "readable": false,
                    "writable": false,
                    "deletable": false,
                    "exportable": false
                },
                "bases": [
                    {
                        "name": "isCanOpFolder",
                        "have": true
                    },
                    {
                        "name": "isCanOpProperty",
                        "have": true
                    }
                ],
                "scopes": [
                    // {
                    //     "id": 1,
                    //     "type": 2,
                    //     "name": "群组1",
                    //     "status": {
                    //         "readable": true,
                    //         "writable": true,
                    //         "deletable": true,
                    //         "exportable": true,
                    //         "showFolder": true
                    //     }
                    // }
                ]
            }
        },
        {
            "code": "PAGE",
            "authority": {
                "general": {
                    "readable": true,
                    "writable": true,
                    "deletable": true,
                    "exportable": true
                },
                "bases": [],
                "scopes": []
            }
        },
        {
            "code": "EDM",
            "authority": {
                "general": {
                    "readable": true,
                    "writable": true,
                    "deletable": true,
                    "exportable": true
                },
                "bases": [],
                "scopes": []
            }
        },
        {
            "code": "SMS",
            "authority": {
                "general": {
                    "readable": true,
                    "writable": true,
                    "deletable": true,
                    "exportable": true
                },
                "bases": [],
                "scopes": []
            }
        }
    ]
}

const TagCheckedColor = (bool) => {
	return bool ? Colors.PRIMARY : Colors.IGNORE
}

const propTypes = {
	onChange: PropTypes.func,
	auth: PropTypes.object,
	onToggleHigh: PropTypes.func,
	// 联系人群组id
	contactGid: PropTypes.number
}

class TeamAuth extends Component {
	constructor(props) {
		super(props)
		this.account = null
		this.isChange = true

		this.contact_gid = 0

		// 已添加的Scope id
		this.addScopeIds = []

		this.state ={
			// 是否展示高级权限设置
			showHighAuth: false,
			// 账号类型
			accountType: AccountTypes.ADMIN,
			// 是否可邀请其他协作成员
			sendInvitation: false,
			// 全选
			checkedAllScope: false,
			// 高级权限当前编辑应用
			currentApp: AppNames.CONTACT,

			// 公共部分权限
			general: {
				// 只读
				readable: false,
				// 可写
				writable: false,
				// 可删
				deletable: false,
				// 可导出
				exportable: false
			},

			contactAuth: {
				bases: [],
				scopes: []
			},

			pageAuth: {
				bases: [],
				scopes: []
			},

			edmAuth: {
				bases: [],
				scopes: []
			},

			smsAuth: {
				bases: [],
				scopes: []
			},

			authSuggestion: user.authSuggestion
		}
	}

	componentWillMount() {
		this.initAuth()
	}

	componentDidMount() {
		// this.handleSubmitChange()
	}

	componentWillReceiveProps(nextProps) {
		// 传递联系人群组ID，权限设置
		if((this.props.contactGid !== nextProps.contactGid) && nextProps.contactGid > 0) {
			this.contact_gid = nextProps.contactGid
			this.handleRequestSearch(AppNames.CONTACT)
		}
	}

	componentDidUpdate(){
		this.handleSubmitChange()
	}

	initAuth() {
		const { account } = this.props
		if(account) {
			this.account = account
			const detail = account.detail ? JSON.parse(account.detail) : defaultDetail
			let appAuth = {}
			detail.app.forEach(item => {
				const code = item.code.toLowerCase()
				appAuth[`${code}Auth`] = item.authority

				item.authority.scopes.forEach(scope => {
					this.addScopeId(scope.id)
				})

			})

			const showHighAuth = detail.base.sendInvitation || this.hasScope(detail)
			this.submitToggleHighAuth(showHighAuth)
			this.setState({
				showHighAuth,
				currentApp: this.currentApp(detail),
				accountType: account.type,
				sendInvitation: detail.base.sendInvitation,
				general: appAuth.contactAuth.general,
				...appAuth
			})
		}
	}

	hasScope(detail) {
		return detail.app.some(item => {
			return item.authority.scopes.length > 0
		})
	}

	currentApp(detail) {
		const appItem = detail.app.find(item => item.authority.scopes.length > 0)
		return appItem ? appItem.code.toLowerCase() : AppNames.CONTACT
	}

	handleAccountTypeChange = accountType => {
		this.isChange = true
		this.setState({accountType})
		this.submitToggleHighAuth((accountType === AccountTypes.ORDINARY) && this.state.showHighAuth)
	}
	handleToggleHighAuth = () => {
		this.setState({
			showHighAuth: !this.state.showHighAuth
		})

		this.submitToggleHighAuth(!this.state.showHighAuth)
	}	
	
	submitToggleHighAuth = (bool) => {
		if(this.props.onToggleHigh) {
			this.props.onToggleHigh(bool)
		}
	}

	handleSendInvitationChange = e => {
		this.isChange = true
		this.setState({
			sendInvitation: e.target.checked
		})
	}
	handleToggleGeneral = status => {
		const general = this.state.general
		if(status !== AccountAuths.READABLE && !general.readable) {
			msg.info('请先选中可读')
			return
		}
		this.isChange = true
		this.setState({
			general: {
				...general,
				[status]: !general[status]
			}
		})
	}

	// 新增已添加的scope ID
	addScopeId(id) {
		this.addScopeIds.push(id)
	}
	// 移除已添加的scope ID
	deleteScopeId(id) {
		this.addScopeIds = this.addScopeIds.filter(item => item !== id)
	}

	handleSearchAddScopeSubmit = (app, item) => {
		this.isChange = true
		let scope = {}
		const appAuthName = `${app}Auth`
		const appAuthState = this.state[appAuthName]
		const scopes = appAuthState.scopes
		const status = {
			readable: true,
			writable: true,
			deletable: true,
			exportable: true,
			showFolder: true
		}
		switch(app) {
			case 'contact':
				scope ={
					id: item.id,
					type: item.type,
					name: item.name,
					status: status
				}
				break
			case 'page':
				scope ={
					id: item.id,
					type: item.type,
					name: item.name,
					status: status
				}
				break
			case 'edm':
				scope ={
					id: item.id,
					type: item.type,
					name: item.name,
					status: status
				}
				break
			case 'sms':
				scope ={
					id: item.id,
					type: item.type,
					name: item.name,
					status: status
				}
				break
		}

		this.addScopeId(item.id)

		this.setState({
					[appAuthName]: {
						...appAuthState,
						scopes: [...scopes, scope]
					}
				})
	}

	handleDeleteScopeClick = (app, id) => {
		this.isChange = true
		const appAuthName = `${app}Auth`
		const appAuthState = this.state[appAuthName]
		const scopes = appAuthState.scopes
		const newScopes = scopes.filter(item => {
			return item.id !== id
		})

		this.deleteScopeId(id)

		this.setState({
					[appAuthName]: {
						...appAuthState,
						scopes: [...newScopes]
					}
				})
	}

	handleScopeStatusClick = (app, id, status) => {
		const appAuthName = `${app}Auth`
		const appAuthState = this.state[appAuthName]
		const scopes = appAuthState.scopes
		const newScopes = scopes.map(item => {
			if(item.id === id) {
				this.isChange = true
				if(status !== AccountAuths.READABLE && !item.status.readable) {
					// 如果选的不是可读项且目前scope不可读
					msg.info('请先选中可读')
				} else {
					item.status[status] = !item.status[status]
				}
			}
			return item
		})
		this.setState({
			[appAuthName]: {
				...appAuthState,
				scopes: [...newScopes]
			}
		})
	}

	handleCheckedAllScopeChange = e => {
		const checkedAllScope = e.target.checked
		this.setCheckedAllScope(checkedAllScope)
		this.setState({
			checkedAllScope
		})
	}

	setCheckedAllScope = (checked) => {
		apps.forEach(app => {
			const appAuthName = `${app}Auth`
			const appAuthState = this.state[appAuthName]
			const scopes = appAuthState.scopes
			const newScopes = scopes.map(scope => {
				scope.checked = checked
				return scope
			})
			this.setState({
				[appAuthName]: {
					...appAuthState,
					scopes: newScopes
				}
			})
		})
	}

	handleCheckedScopeChange = (app, id, e) => {
		const checked = e.target.checked
		const appAuthName = `${app}Auth`
		const appAuthState = this.state[appAuthName]
		const scopes = appAuthState.scopes
		const newScopes = scopes.map(scope => {
			if(scope.id === id) {
				scope.checked = checked
			}
			return scope
		})
		this.setState({
			[appAuthName]: {
				...appAuthState,
				scopes: newScopes
			},
			checkedAllScope: this.isEveryScopeChecked()
		})	
	}

	// 检查是否全部选中	
	isEveryScopeChecked = () => {
		return apps.every(app => {
			return this.state[`${app}Auth`].scopes.every(scope => !!scope.checked)
		})
	}
	// 检查是否有选中项
	isSomeScopeChecked = () => {
		return apps.some(app => {
			return this.state[`${app}Auth`].scopes.some(scope => !!scope.checked)
		})
	}


	handleSubmitChange() {
		if(!this.isChange) {
			return
		}
		this.isChange = false
		const { onChange } = this.props
		if(onChange) {
			let auth = {
				type: this.state.accountType,
				detail: this.inviteDetail()
			}
			if(this.account) {
				auth.email = this.account.email
				if(this.account.userid) {
					auth.userid = this.account.userid
				} else {
					auth.invite_id = this.account.invite_id
				}
			}

			onChange(auth)
		}

	}

	// 组织邀请权限详情信息
	inviteDetail() {
		const { general } = this.state
		const newApp = apps.map(app => {
			let authority = this.state[`${app}Auth`]
			authority.general = general
			return {
				code: app.toUpperCase(),
				authority: authority
			}
		})

		return {
			base: {
				sendInvitation: this.state.sendInvitation
			},
			app: newApp
		}
	}

	handleRequestSearch = app => {
		user.getAuthSuggestion(app, data => {
			this.setState({
				authSuggestion: user.authSuggestion
			})

			// 带参数联系人群组权限设置
			if(this.contact_gid > 0) {
				const items = this.searchItem(user.authSuggestion[app], this.contact_gid)
				this.handleSearchAddScopeSubmit(app, items[0])
				this.setState({
					showHighAuth: true,
					accountType: AccountTypes.ORDINARY
				})
				
				this.isChange = true
			}
		})
	}

	searchItem = (items, id, array) => {
		return items.reduce((arr, item) => {
			if(item.id === id){
				arr.push(item)
			}
			if(!!item.items) {
				return this.searchItem(item.items,id,arr)
			}
			return arr
		}, array || [])
	}

	/**
	 * 批量编辑
	 */
	handleBatchEditClick = e => {
		this.setState({
			showBatchEdit: true
		})
	}
	handleBatchEditUpdate = auth => {
		apps.forEach(app => {
			const appAuthName = `${app}Auth`
			const appAuthState = this.state[appAuthName]
			const scopes = appAuthState.scopes
			const newScopes = scopes.map(scope => {
				if(scope.checked) {
					scope.status = {
						[AccountAuths.READABLE]: auth[AccountAuths.READABLE],
						[AccountAuths.WRITABLE]: auth[AccountAuths.WRITABLE],
						[AccountAuths.DELETABLE]: auth[AccountAuths.DELETABLE],
						[AccountAuths.EXPORTABLE]: auth[AccountAuths.EXPORTABLE],
					}
					if(app === AppNames.CONTACT) {
						scope.status[AccountAuths.SHOWFOLDER] = auth[AccountAuths.SHOWFOLDER]
					}
				}
				return scope
			})
			this.setState({
				[appAuthName]: {
					...appAuthState,
					scopes: newScopes
				}
			})
		})
		this.handleBatchEditClose()
	}
	handleBatchEditClose = e => {
		this.setState({
			showBatchEdit: false
		})
	}
	/**
	 * 批量删除
	 */
	handleBatchDeleteClick = e => {
		apps.forEach(app => {
			const appAuthName = `${app}Auth`
			const appAuthState = this.state[appAuthName]
			const scopes = appAuthState.scopes
			const newScopes = scopes.filter(scope => {
				if(scope.checked){
					this.deleteScopeId(scope.id)
				}
				return !scope.checked 
			})

			this.setState({
				[appAuthName]: {
					...appAuthState,
					scopes: newScopes
				}
			})
		})
	}

	handleAppButtonGroupClick = app => {
		this.setState({
			currentApp: app
		})
	}

	renderHighAuthContent() {
		const { currentApp } = this.state
		const someScopeCheck = this.isSomeScopeChecked()
		const AppButtons = apps.map((item,i) => {
			return <Button 
								key={i} 
								color={currentApp === item ? Colors.PRIMARY : Colors.NONE} 
								onClick={e => this.handleAppButtonGroupClick(item)} 
							>
								{user.filter.appNames[item]}
							</Button>
		})
		const batchOperation = <div className="team-auth-app-footer">
														<Checkbox text="全选" checked={this.state.checkedAllScope} onChange={this.handleCheckedAllScopeChange} />
														{' '}
														{
															someScopeCheck ? 
															<a><Text color={Colors.PRIMARY} onClick={this.handleBatchEditClick}> 批量编辑权限 </Text></a>
															:
															<Text color={Colors.IGNORE}> 批量编辑权限 </Text>
														}
														{' '}
														{
															someScopeCheck ? 
															<a><Text color={Colors.PRIMARY} onClick={this.handleBatchDeleteClick}>批量删除</Text></a>
															:
															<Text color={Colors.IGNORE}>批量删除</Text>
														}
													</div>
		const emptyContent = <div className="m1-row">
													<h4>
														<span>{`${user.filter.appNames[currentApp]} 应用权限`}</span> 
													</h4>
													<div className="empty-content">
														<img className="coming-soon" src={comingSoonImage} />
														<p>
															程序员拼命开发中...
														</p>
													</div>
												</div>

		return(
			<div className="m1-panel-content team-auth-high">
				<div className="team-auth-base">
					<h3>基本权限</h3>
					<p>
						<Checkbox text="邀请其他协作成员" checked={this.state.sendInvitation} onChange={this.handleSendInvitationChange} />
					</p>
				</div>
				<div className="team-auth-app">
					<div className="team-auth-app-header">
						<h3>应用权限</h3>
						<ButtonGroup>
							{AppButtons}
						</ButtonGroup>
					</div>
					{disableSingleApps.indexOf(currentApp) < 0 ? this.renderSingleAuth(currentApp) : emptyContent}
					{(disableSingleApps.indexOf(currentApp) < 0 && this.state[`${currentApp}Auth`].scopes.length > 0) && batchOperation}
				</div>
			</div>
		)
	}	

	renderSingleAuth(app) {
		const auth = this.state[`${app}Auth`]

		const authList = auth.scopes.map((item, i) => {
			return (
				<tr key={i}>
					<td><Checkbox checked={!!item.checked} onChange={e => this.handleCheckedScopeChange(app, item.id, e)} /></td>
					<td>{user.filter.scopeType[item.type]}</td><td>{item.name}</td>
					<td>
						<Tag 
							color={TagCheckedColor(item.status.readable)} 
							checkable 
							onClick={e => this.handleScopeStatusClick(app, item.id, AccountAuths.READABLE)} 
						>
							可读
						</Tag>
						<Tag 
							color={TagCheckedColor(item.status.readable && item.status.writable)} 
							checkable
							onClick={e => this.handleScopeStatusClick(app, item.id, AccountAuths.WRITABLE)} 
						>
							可写
						</Tag>
						<Tag 
							color={TagCheckedColor(item.status.readable && item.status.deletable)} 
							checkable 
							onClick={e => this.handleScopeStatusClick(app, item.id, AccountAuths.DELETABLE)} 
						>
							可删
						</Tag>
						<Tag 
							color={TagCheckedColor(item.status.readable && item.status.exportable)} 
							checkable
							onClick={e => this.handleScopeStatusClick(app, item.id, AccountAuths.EXPORTABLE)} 
						>
							可导出
						</Tag>
						{app === AppNames.CONTACT &&
							<Tag 
								color={TagCheckedColor(item.status.readable && item.status.showFolder)} 
								checkable 
								onClick={e => this.handleScopeStatusClick(app, item.id, AccountAuths.SHOWFOLDER)} 
							>
							显示文件夹
							</Tag>
						}
					</td>
					<td><span className="btn-icon"><Icon name="delete-o" onClick={e => this.handleDeleteScopeClick(app, item.id)} /></span></td>
				</tr>
			)
		})

		const tableView = <table className="m1-table">
									<thead>
										<tr>
											<th style={{width: '1%'}}></th>
											<th style={{width: '10%'}}>类型</th>
											<th style={{width: '20%'}}>名称</th>
											<th style={{width: '55%'}}>权限</th>
											<th>操作</th>
										</tr>
									</thead>
									<tbody>
										{authList}
									</tbody>
								</table>

		const emptyContent = <div className="empty-content">
													<img className="no-add" src={teamEmptyImage}/>
													<p>您还未添加需要协作的{user.filter.appNames[app]}{app === AppNames.CONTACT ? '群组' : '文件夹'}</p>
													</div>

		return (
			<div className="m1-row">
				<h4>
					<span>{`${user.filter.appNames[app]} 应用权限`}</span> 
					<AuthSearch 
						searchList={this.state.authSuggestion[app]} 
						app={app} 
						addItemIds={this.addScopeIds}
						onSubmit={this.handleSearchAddScopeSubmit} 
						onRequest={this.handleRequestSearch}
						placeholder="请输入需要协作的群组或项目"
					/>
				</h4>
				{authList.length > 0 ? tableView : emptyContent}
			</div>
		)
	}

  render() {
  	const { accountType, general, showBatchEdit } = this.state
    return (
      <div className="m1-row">
          <div className="team-set-auth">
              <h3>权限设置</h3>
              <div className="m1-row team-auth-type">
                  <p>
                  <Radio 
                      checked={accountType === AccountTypes.ADMIN} 
                      onChange={e => this.handleAccountTypeChange(AccountTypes.ADMIN)} 
                      text={'邀请账号可拥有同主账号相同权限（管理员）'} />
                  </p>
              <p>
                  <Radio 
                      checked={accountType === AccountTypes.ORDINARY} 
                      onChange={e => this.handleAccountTypeChange(AccountTypes.ORDINARY)} 
                      text={'邀请账号可拥有部分权限'} />
              </p>
              </div>
              {accountType === AccountTypes.ORDINARY &&
              <div className="m1-row">
                  {!this.state.showHighAuth && <div className="team-general-auth">
                                        <Tag 
                                        	size={Sizes.LARGE} 
                                        	color={TagCheckedColor(general.readable)} 
                                        	onClick={e => this.handleToggleGeneral(AccountAuths.READABLE)} 
                                        	checkable 
                                        	data-tip="拥有查看协作对象（如联系人群组、Page、EDM、SMS的文件夹及单个协作对象）的权限"
                                        	><Icon name="browse"></Icon> 可读</Tag>
                                        <Tag 
                                        	size={Sizes.LARGE} 
                                        	color={TagCheckedColor(general.readable && general.writable)} 
                                        	onClick={e => this.handleToggleGeneral(AccountAuths.WRITABLE)} 
                                        	checkable 
                                        	data-tip="拥有新建或修改协作对象（如新建联系人群组、新建Page、EDM、SMS的文件夹及单个协作对象）的权限"
                                        	><Icon name="edit"></Icon> 可写</Tag>
                                        <Tag 
                                        	size={Sizes.LARGE} 
                                        	color={TagCheckedColor(general.readable && general.deletable)} 
                                        	onClick={e => this.handleToggleGeneral(AccountAuths.DELETABLE)} 
                                        	checkable 
                                        	data-tip="拥有删除协作对象（如删除联系人群组、删除Page、EDM、SMS的文件夹及单个协作对象）的权限"
                                        	><Icon name="delete"></Icon> 可删</Tag>
                                        <Tag 
                                        	size={Sizes.LARGE} 
                                        	color={TagCheckedColor(general.readable && general.exportable)} 
                                        	onClick={e => this.handleToggleGeneral(AccountAuths.EXPORTABLE)} 
                                        	checkable 
                                        	data-tip="拥有导出包括联系人明细数据、EDM、SMS回执报告明细数据"
                                        	><Icon name="upload"></Icon> 可导出</Tag>
                                        <ReactTooltip effect="solid"/>
                                    </div>}
                  <div className="auth-toggle-high">
                    <Text color={Colors.PRIMARY} onClick={this.handleToggleHighAuth}>{this.state.showHighAuth ? '返回快速权限设置' : '高级权限设置'}</Text>
                  </div>
                  {this.state.showHighAuth && this.renderHighAuthContent()}
              </div>}
          </div>
          {showBatchEdit && 
	          <TeamBatchEditAuth 
	          	show={showBatchEdit} 
	          	onClose={this.handleBatchEditClose} 
	          	onUpdate={this.handleBatchEditUpdate} />
          }
      </div>
    )
  }
}

TeamAuth.propTypes = propTypes

export default TeamAuth
