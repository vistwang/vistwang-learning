import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'

import { Button, Dropdown, MenuItem, Colors } from '../../../components/m1ui'

import EmailSafe from '../../../components/setting/email/EmailSafe'
import EmailBlacklist from '../../../components/setting/email/EmailBlacklist'
import EmailTimeZone from '../../../components/setting/email/EmailTimeZone'

import { actions } from '../../../reducers/setting/email'
import { actions as globalActions } from '../../../reducers/setting/'

class EmailContainer extends Component {
	componentDidMount() {
		const { account_id } = this.props
		if(this.props.timeZones.length === 0) {
			this.props.reqTimeZone()
		}
		if(!account_id) {
			this.props.reqAccountSet()
		}
	}

	handleEmailsChange = emails => {
		this.props.updateBacklist(emails)
	}

	handleIntervalChange = (e) => {
		this.props.updateInterval(e.target.value)
	}

	handleMaxChange = (e) => {
		this.props.updateSendMax(e.target.value)
	}

	handleSaveEmailSet = (e) => {
		const {interval, sendMax, blacklist, timeZone} = this.props
		const param = {
			delivery_interval: interval,
			send_max: sendMax,
			blacklist: blacklist.join(','),
			time_zone: timeZone
		}

		this.props.saveAccountSet(param)
	}
	render() {
		const { interval, sendMax, blacklist, timeZone, timeZones, ...props } = this.props
		return (
			<div className="m1-right">
				<div className="m1-panel">
					<div className="m1-panel-header">
						<h2>邮箱相关设置</h2>
					</div>
					<div className="m1-panel-content email-setting">
						<EmailSafe 
							interval={interval}
							max={sendMax}
							onIntervalChange={this.handleIntervalChange}
							onMaxChange={this.handleMaxChange}
						/>
						<EmailBlacklist 
							emails={blacklist}
							onChange={this.handleEmailsChange}
						/>
						<EmailTimeZone 
							timeZoneList={timeZones} 
							timeZone={timeZone} 
							onSelect={v => props.updateTimeZone(v)}
						/>
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
	timeZones: state.globalState.timeZones,
	account_id: state.email.account_id,
	interval: state.email.deliveryInterval,
	sendMax: state.email.sendMax,
	blacklist: state.email.blacklist,
	timeZone: state.email.timeZone,
})

const mapDispatchToProps = (dispatch) => ({
	updateInterval: bindActionCreators(actions.updateDeliveryInterval, dispatch),
	updateSendMax: bindActionCreators(actions.updateSendMax, dispatch),
	updateBacklist: bindActionCreators(actions.updateBacklist, dispatch),
	updateTimeZone: bindActionCreators(actions.updateTimeZone, dispatch),
	reqAccountSet: bindActionCreators(actions.reqAccountSet, dispatch),
	saveAccountSet: bindActionCreators(actions.saveAccountSet, dispatch),
	reqTimeZone: bindActionCreators(globalActions.reqTimeZone, dispatch),
})

export default connect(mapStateToProps,mapDispatchToProps)(EmailContainer)