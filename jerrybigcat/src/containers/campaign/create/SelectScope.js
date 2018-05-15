import React, { Component } from 'react'
import PropTypes from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button, Colors } from '../../../components/m1ui'
import { msg } from '../../../utils'

import CustomerPreview from '../../../components/campaign/customer/CustomerPreview'
import ConditionNameModal from '../../../components/campaign/create/ConditionNameModal'
import ScreeningCondition from './ScreeningCondition'

import { actions } from '../../../reducers/campaign/campaignCreate'
import { actions as screeningActions } from '../../../reducers/campaign/screening'

class SelectScope extends Component {
	handleSave = (e) => {
		const {queryConditions, campaignId, conditionName} = this.props

		if(conditionName.trim().length === 0) {
			msg.info('动态细分群组名不能空')
			return
		}

		const conditionStrArr = queryConditions.map((conditionGroup) => {
			return JSON.stringify(conditionGroup)
		})
		const conditionsStr = JSON.stringify(conditionStrArr)
		const campaign = {
			id: campaignId,
			conditionName,
			conditionStr: conditionsStr
		}
		// this.props.reqQueryContacts(conditionsStr)
		this.props.reqSaveCampaign(campaign)
		this.props.setCreateStep(3)
	}

	handleConditionName = () => {
		if(this.props.conditionName.trim().length === 0) {
			this.props.showConditionNameModal(true)
		} else {
			this.handleSave()
		}
	}

	render() {
		const { ...props } = this.props
		return [
			<div key="content" className="container">
				<h2>筛选条件</h2>
				<div className="condition-content">
					<ScreeningCondition autoQueryContact />
				</div>
				<div className="condition-preview">
					<CustomerPreview 
						queryTotalCount={props.queryTotalCount}
						queryContacts={props.queryContacts}
					/>
				<div className="customer-preview-foot">
					<span>等{props.queryTotalCount}位用户</span>
					<a href="">预览详细列表</a>
				</div>
				</div>
				<ConditionNameModal
					show={props.conditionNameModal}
					onClose={e => props.showConditionNameModal(false)}
					conditionName={props.conditionName}
					onChangeName={e => props.updateQueryConditionName(e.target.value)}
					onConfirm={this.handleSave}
				/>
			</div>,
			<div key="bottom" className="container create-campaign-bottom">
				<Button
					onClick={e => this.props.setCreateStep(1)}
				>返回上一步</Button>
				<Button
					color={Colors.PRIMARY}
					onClick={this.handleConditionName}
				>保存并下一步</Button>
			</div>
		]
	}
}

const mapStateToProps = (state) => ({
	campaignId: state.campaignCreate.campaignId,
	campaignList: state.campaignList.campaignList,
	queryTerms: state.screening.queryTerms,
	queryContacts: state.screening.queryContacts,
	queryTotalCount: state.screening.queryTotalCount,
	queryConditions: state.screening.queryConditions,
	conditionName: state.screening.conditionName,
	conditionNameModal: state.screening.conditionNameModal,
})

const mapDispatchToProps = (dispatch) => ({
	setCreateStep: bindActionCreators(actions.setCreateStep, dispatch),
	reqQueryTerms: bindActionCreators(screeningActions.reqQueryTerms, dispatch),
	reqQueryContacts: bindActionCreators(screeningActions.reqQueryContacts, dispatch),
	reqQueryConditions: bindActionCreators(screeningActions.reqQueryConditions, dispatch),
	updateQueryConditionName: bindActionCreators(screeningActions.updateQueryConditionName, dispatch),
	showConditionNameModal: bindActionCreators(screeningActions.showConditionNameModal, dispatch),
	reqSaveCampaign: bindActionCreators(actions.reqSaveCampaign, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectScope)