import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { Icon, Button, Colors, Sizes } from '../m1-ui'

const getStatusIcon = (status) => {
	let icon = ''
	switch(parseInt(status)) {
		case 0:
		case 1:
		case 2:
			// icon = <span className="ellipsis">...</span>
			icon = <Icon name={'more'} />
			break;
		case -1:
		case 3:
			icon = <Icon name={'right'} />
			break;
		case 4:
			icon = <Icon name={'close'} />
			break;
	}
	return icon
}

const statusList = [
	{status: -1, name: '无认证信息'	, color: 'proceed'},
	{status: 0, name:  '待审核'	, 	color: 'proceed'},
	{status: 1, name:  '已接收审核'	, color: 'proceed'},
	{status: 2, name:  '处理中'	, 	color: 'proceed'},
	{status: 3, name:  '已通过认证'	, color: 'success'},
	{status: 4, name:  '认证失败'	, 	color: 'fail'},
]

const propTypes = {
	title: PropTypes.string,
	status: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string
	]).isRequired,
	time: PropTypes.string,
	remark: PropTypes.string,
	onShowInfo: PropTypes.func,
	onReauth: PropTypes.func,
	onAuth: PropTypes.func
}

class AuthStatus extends Component {

	handleShowInfoClick = e => {
		const { onShowInfo } = this.props
		if(onShowInfo) {
			onShowInfo()
		}
	}

	handleReauthClick = e => {
		const { onReauth } = this.props 
		if(onReauth) {
			onReauth()
		}
	}

	handleAuthClick = e => {
		const { onAuth } = this.props 
		if(onAuth) {
			onAuth()
		}
	}

	render() {
		const { title, status, time, remark } = this.props

		const statusItem = statusList.find(item => {
			return item.status === parseInt(status)
		})

		const icon = getStatusIcon(status)
		return (
			<div className={classNames('auth-status-content', statusItem.color)}>
				<h4>{title}</h4>
				<div className="auth-status-style">
					<div className="line"></div>
					<div className="icon">{icon}</div>
				</div>
				<div className="auth-status-info">
					{statusItem.name}
				</div>
				{statusItem.status !== -1 && <div className="auth-time">{time}</div>}
				<div className="auth-handle-btns">
					{(statusItem.status === -1) && <p><Button color={Colors.PRIMARY} onClick={this.handleAuthClick}>立即认证</Button></p>}
					{([0,1,2,3,4].indexOf(statusItem.status) >= 0) && <p><Button color={Colors.PRIMARY} onClick={this.handleShowInfoClick}>查看认证信息</Button></p>}
					{([3,4].indexOf(statusItem.status) >= 0) && <p><Button onClick={this.handleReauthClick}>重新认证</Button></p>}
				</div>
				{remark && <div className="auth-remark">
					<p>{remark}</p>
				</div>}
			</div>
		)
	}
}

AuthStatus.propTypes = propTypes

export default AuthStatus
