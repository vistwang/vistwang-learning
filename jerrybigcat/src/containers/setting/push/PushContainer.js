import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import { actions } from '../../../reducers/setting/email'

import { Button, Tag, Icon, Colors } from '../../../components/m1ui'
import AddEmails from '../../../components/account/AddEmails'
import PushTypeItem from '../../../components/setting/push/PushTypeItem'


class PushContainer extends Component {
	componentDidMount() {
		if(!this.props.account_id) {
			this.props.reqAccountSet()
		}
	}
	handleEmailsChange = pushEmail => {
		this.props.updatePushEmail(pushEmail)
	}

	handleSeleteType = type => {
		const {pushType, updatePushType} = this.props
		const param = {
			...pushType,
			[type]: !pushType[type]
		}
		updatePushType(param)
	}

	handleSaveEmailSet = (e) => {
		const { pushType, pushEmail, saveAccountSet } = this.props
		let pushTypeArr = []
		for(let t in pushType) {
			if(pushType[t]) {
				pushTypeArr.push(t)
			}
		}
		const param = {
			report_push_type: pushTypeArr.join(','),
			report_push_email: pushEmail.join(',')
		}
		saveAccountSet(param)
	}

	render() {
		const { pushType, pushEmail } = this.props
		return (
			<div className="m1-right">
				<div className="m1-panel">
					<div className="m1-panel-header">
						<h2>报告推送设置</h2>
					</div>
					<div className="m1-panel-content">
						<div className="m1-row">
							<h3>推送报告类型</h3>
							<p>系统将根据您的选择，为您推送每日、每周、每月的统计报告邮件</p>
							<div className="m1-panel-section">
								<ul className="push-type">
									<PushTypeItem
										onClick={e => this.handleSeleteType('day')}
										isChecked={pushType.day}
									>
										<h5>日报</h5>
										<p>每天早上9点推送</p>
									</PushTypeItem>
									<PushTypeItem
										onClick={e => this.handleSeleteType('week')}
										isChecked={pushType.week}
									>
										<h5>周报</h5>
										<p>每周五早上9点推送</p>
									</PushTypeItem>
									<PushTypeItem
										onClick={e => this.handleSeleteType('month')}
										isChecked={pushType.month}
									>
										<h5>月报</h5>
										<p>每月1号早上9点推送</p>
									</PushTypeItem>
								</ul>
							</div>
						</div>
						<div className="m1-row">
							<h3>推送邮件地址</h3>
							<div className="m1-panel-section">
								<AddEmails
									emails={pushEmail}
									onChange={this.handleEmailsChange}
								/>
							</div>
						</div>

						<div className="m1-row">
							<Button color={Colors.PRIMARY} onClick={this.handleSaveEmailSet} >保存修改</Button>
						</div>
					</div>
				</div>
			</div>	
		)
	}
}

const mapStateToProps = (state) => ({
	account_id: state.email.account_id,
	pushType: state.email.pushType,
	pushEmail: state.email.pushEmail
})

const mapDispatchToProps = (dispatch) => ({
	updatePushType: bindActionCreators(actions.updatePushType, dispatch),
	updatePushEmail: bindActionCreators(actions.updatePushEmail, dispatch),
	reqAccountSet: bindActionCreators(actions.reqAccountSet, dispatch),
	saveAccountSet: bindActionCreators(actions.saveAccountSet, dispatch),
})

export default connect(mapStateToProps,mapDispatchToProps)(PushContainer)