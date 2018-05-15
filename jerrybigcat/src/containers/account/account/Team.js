import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ReactTooltip from 'react-tooltip'
import { msg, utils } from '../../../utils'
import { Tag, Input, Radio, Checkbox, Button, Icon, Text, Colors, Sizes } from '../../../components/m1ui'
import { user } from '../../../base/system'
import { AccountTypes, AppNames } from '../../../base/enums'
import { 	
	getInviteList,
	sendInvite,
	resendInvite,
	editInvite,
	removeInvite,
	getAuthSuggestion
} from '../../../api/account'

import AddEmails from '../../../components/account/AddEmails'
import AuthSearch from '../../../components/account/AuthSearch'
import TeamAuth from './TeamAuth'
import TeamEditAuth from './TeamEditAuth'

class Team extends Component {
	constructor(props){
		super(props)
		this.state= {
			// 是否展示高级权限设置
			showHighAuth: false,
			// 账号类型
			accountType: AccountTypes.ADMIN,
			// 是否可邀请其他协作成员
			sendInvitation: false,
			// 全选
			checkedAllScope: false,
			// 隐藏显示编辑权限对话框
			showEditAuthModal: false,

			sendAuth: {},

			editAuth: {},

			// 需发送邀请的邮箱组
			emails: [],

			// 邀请列表
			invites: [],
			// 所有账户列表
			accounts: [],

			contact_gid: 0
		}
	}

	componentDidMount() {
		this.init()
	}

	init() {
		if(!this.checkVersionConfirm()){
			this.getInviteList()	
			this.initContactGroupParam()	
		}		
	}

	initContactGroupParam() {
		const qs = utils.getSearchParams(this.props.location.search)
		let contact_gid = qs.get('c_gid')
		if(contact_gid) {
			contact_gid = parseInt(contact_gid)
			this.setState({contact_gid})
		}
	}

	/**
	 * 检测用户版本是否为免费版或标准版并提示
	 * @return {Boolean}
	 */
	checkVersionConfirm() {
		if(user.checkTeamVersion()) {
			msg.confirm('当前版本无权限，请升级版本', () => {
				msg.close()
				this.props.history.push('/price')	
			})
			return true
		}
		return false
	}

	getInviteList() {
		msg.loading()
		getInviteList().then(result => {
			msg.close()
			if(result.success) {
				this.setState({
					invites: result.data.invites,
					accounts: result.data.accounts
				})
			} else {
				msg.info(result.data)
			}
		})
	}

	toggleHighAuth = () => {
		this.setState({
			showHighAuth: !this.state.showHighAuth
		})
	}

	handleEmailsChange = emails => {
		this.setState({emails})
	}

	handleSendInviteClick = e => {
		if(this.checkVersionConfirm()) {
			return
		}

		if(!user.canSendInvitation()) {
			msg.info('当前用户无权限')
			return
		}

		if(!this.checkSendInvite()) {
			return
		}

		const {emails, sendAuth } = this.state
		const emailStr = emails.join(',')

		msg.loading()
		sendInvite(emailStr, sendAuth.type, sendAuth.detail).then(result => {
			msg.close()
			if(result.success) {
				this.getInviteList()
				this.setState({
					emails: []
				})
				msg.info('邀请发送成功')
			} else {
				msg.info(result.data)
			}
		})
	}


	checkSendInvite() {
		const { emails } = this.state
		if(emails.length === 0) {
			msg.info('请添加邀请邮箱')
			return false
		}

		return true
	}

	handleInviteResendClick = (id) => {
		const invite = this.state.invites.find(item => item.code === id)
		msg.loading()
		resendInvite(invite.email, invite.type, invite.authority).then(result => {
			msg.close()
			if(result.success) {
				msg.info('邀请重发成功')
			} else {
				msg.info(result.data)
			}
		})
	}
	handleAccountEditClick = (id, status) => {
		const listKey = status === 1 ? 'accounts' : 'invites'
		const idKey = status === 1 ? 'userId' : 'code'
		const postKey = status === 1 ? 'userId' : 'code'
		const account = this.state[listKey].find(item => item[idKey] === id)
		this.setState({
			showEditAuthModal: true,
			editAuth: account,
			currentEditStatus: status
		})
	}
	handleAccountRemoveClick = (id, status) => {
		msg.confirm('确认删除此账户？', () => {
			msg.close()
			this.accountRemove(id, status)
		})
	}
	accountRemove(id, status) {
		const listKey = status === 1 ? 'accounts' : 'invites'
		const idKey = status === 1 ? 'userId' : 'code'
		const postKey = status === 1 ? 'userId' : 'code'
		const account = this.state[listKey].find(item => item[idKey] === id)
		msg.loading()
		removeInvite({[postKey]: account[idKey]}).then(result => {
			msg.close()
			if(result.success) {
				this.getInviteList()
				msg.info('删除成功')
			} else {
				msg.info(result.data)
			}
		})
	}

	handleEditAuthModalClose = e => {
		this.setState({
			showEditAuthModal: false
		})
	}

	handleAuthChange = sendAuth => {
		this.setState({sendAuth})
	}

	handleEditAuthSubmit = () => {
		this.getInviteList()
		this.setState({
			showEditAuthModal: false
		})
	}

	renderInvitationPanel() {
		const { accountType, general, contact_gid } = this.state
		return (
			<div className="m1-panel">
				<div className="m1-panel-header">
					<h2>邀请协作 <span className="title-describe">向需要协作的人发送协作邀请邮件，对方同意后，即可加入您的团队一起协作，同时拥有您赋予的协作权限。</span></h2>
				</div>
				<div className="m1-panel-content">
					<div className="team-content">
						<div className="m1-row">
							<h3>添加邮箱</h3>
							<AddEmails 
								onChange={this.handleEmailsChange} 
								emails={this.state.emails}
								placeholder="请输入邀请协作者的邮箱"
							/>
						</div>
						<TeamAuth 
							contactGid={contact_gid}
							onChange={this.handleAuthChange}
						/>
						
						<div className="m1-row">
							<Button color={Colors.PRIMARY} onClick={this.handleSendInviteClick} >发送邮件邀请</Button>
						</div>
					</div>
				</div>
			</div>
		)
	}


	renderAccountList(accounts, status) {
		const accountType = user.getAccountType()
		// 普通用户禁止编辑、重发、删除等操作
		const disabledOpera = accountType === AccountTypes.GENERAL
		const statusColor = status === 1 ? Colors.SUCCESS : Colors.DANGER
		const statusName = status === 1 ? '已加入' : '待加入'
		const accountList = accounts.map((item, i) => {
			const id = status === 1 ? item.userId : item.code
			const operation = item.type === 3 ? null : <span>
					<span className={classNames('btn-icon', {'disabled': disabledOpera})}>
						<Icon 
							name={'edit-o'} 
							onClick={e => disabledOpera ? null : this.handleAccountEditClick(id, status)} 
						/>
					</span> 
					{status === 2 && 
					<span className={classNames('btn-icon', {'disabled': disabledOpera})}>
						<Icon 
							name={'retransmission'} 
							onClick={e => disabledOpera ? null : this.handleInviteResendClick(id)} 
						/>
					</span>}
					<span className={classNames('btn-icon', {'disabled': disabledOpera})}>
						<Icon 
							name={'delete-o'} 
							onClick={e => disabledOpera ? null : this.handleAccountRemoveClick(id, status)}
						/>
					</span> 
				</span>
			return (
				<tr key={i}>
					<td><div className="avatar-container"><span className="avatar"><img src={item.avatar}/></span></div></td>
					<td>{item.email}</td><td>{user.filter.accountType[item.type]}</td>
					<td><Tag color={statusColor} size={Sizes.SMALL}>{statusName}</Tag></td>
					<td>{operation}</td>
				</tr>
			)
		})
		return accountList
	}

	renderMemberPanel() {
		const { accounts, invites } = this.state
		const accountLentth = accounts.length + invites.length

		return (<div className="m1-panel">
				<div className="m1-panel-header">
					<h2>协作成员（{accountLentth}）</h2>
				</div>
				<div className="m1-panel-content member-content">
					<div className="m1-row">
						<table className="m1-table">
							<tbody>
							{this.renderAccountList(accounts, 1)}
							{this.renderAccountList(invites, 2)}
							</tbody>
						</table>
					</div>
				</div>
		</div>)
	}

	renderEditAuthModal() {
		const { showEditAuthModal, editAuth } = this.state
		return (
			<TeamEditAuth 
				show={showEditAuthModal}
				onClose={this.handleEditAuthModalClose}
				account={editAuth}
				onSubmit={this.handleEditAuthSubmit}
			/>
		)
	}

	render() {

		return (
			<div>
				{this.renderInvitationPanel()}
				{!user.checkTeamVersion() && this.renderMemberPanel()}
				{this.state.showEditAuthModal && this.renderEditAuthModal()}
			</div>
		)
	}
}

export default Team
