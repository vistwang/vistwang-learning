import React, { Component } from 'react'
import moment from 'moment'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { CampaignTypes, CampaignStatus, CampaignBetchTypes } from '../../../base/enums'
import { Button, Switch, Colors } from '../../../components/m1ui'
import DateRangePicker from '../../../components/common/DateRangePicker'
import SettingContainer from '../setting/SettingContainer'

import { actions } from '../../../reducers/campaign/campaignCreate'
import { actions as listActions } from '../../../reducers/campaign/campaignList'

import imgSuccess from '../../../assets/images/setting_success.svg'
class StartCampaign extends Component {
	handlePickerApply = (e, picker) =>{
		const { campaign_id } = this.props
		// console.log(picker.startDate.format('YYYY-MM-DD hh:mm:ss'))
		// console.log(e.timeStamp)
		// console.log(moment(e.timeStamp).format('YYYY-MM-DD hh:mm:ss'))
		this.props.reqSaveStartTime(campaign_id, e.timeStamp)
	}
	handleImmediatelyStart = () => {
		const { campaign_id } = this.props
		const date = new Date()
		const timeStamp = date.getTime()
		this.props.reqSaveStartTime(campaign_id, timeStamp)
	}
	handleStartAutomatic = () => {
		const { campaignStatus, campaignId } = this.props
		// const betchType = campaignStatus === CampaignStatus.RUNNING ? CampaignBetchTypes.STOP : CampaignBetchTypes.OPEN
		// const ids = String(campaign_id)
		// this.props.reqBetchSetting(ids, betchType)
		const status = campaignStatus === CampaignStatus.RUNNING ? CampaignStatus.STOP : CampaignStatus.RUNNING
		const campaign = {
			id: campaignId,
			status
		}
		this.props.reqSaveCampaign(campaign)
	}
	render() {
		const {start_time, campaignType, campaignStatus } = this.props
		const timeLabel = !start_time ? '' : moment(timeLabel).format('YYYY-MM-DD hh:mm') + ' '
		const isAutomatic = CampaignTypes.AUTOMATIC === campaignType
		const isSingle = CampaignTypes.SINGLE === campaignType
		const isRunning = CampaignStatus.RUNNING === campaignStatus
		return (
			<div className="start-container">
				<div className="container start-view">
					<div className="image">
						<img src={imgSuccess} />
					</div>
					<h2>太棒了，您已经完成本次Campaign的所有设置！</h2>
					<p>开启后，系统将会立即触及一杯筛选的1230位用户，后续系统将自动触发符合本次营销活动的设置条件的用户。</p>
					<div className="create-campaign-bottom">
						{isAutomatic && <div className="automatic-setting">
													<span>启动营销活动</span><Switch checked={isRunning} onChange={this.handleStartAutomatic} />
												</div>}
						{isSingle && <div className="simple-setting">
													<DateRangePicker
														singleDatePicker={true}
														timePicker={true}
							            	onApply={this.handlePickerApply}
													>
														<Button>{timeLabel} 定时发送</Button>
													</DateRangePicker>
													<Button
														color={Colors.PRIMARY}
														onClick={this.handleImmediatelyStart}
													>立即发送</Button>
												</div>}
					</div>
				</div>
				<SettingContainer />
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	campaignId: state.campaignCreate.campaignId,
	campaignType: state.campaignCreate.type,
	campaignStatus: state.campaignCreate.status,
	start_time: state.campaignCreate.start_time,
})

const mapDispatchToProps = (dispatch) => ({
	reqSaveStartTime: bindActionCreators(actions.reqSaveStartTime, dispatch),
	reqSaveCampaign: bindActionCreators(actions.reqSaveCampaign, dispatch),
	reqBetchSetting: bindActionCreators(listActions.reqBetchSetting, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(StartCampaign)