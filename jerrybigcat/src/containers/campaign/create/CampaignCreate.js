import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { actions } from '../../../reducers/campaign/campaignCreate'

import { utils } from '../../../utils'
import { Button, Colors } from '../../../components/m1ui'

import Head from '../../../components/campaign/create/Head'
import StepFlow from '../../../components/campaign/create/StepFlow'

import SelectScope from './SelectScope'
import CreateContent from './CreateContent'
import StartCampaign from './StartCampaign'

class CampaignCreate extends Component {
	componentDidMount() {
		if(!this.props.campaignId) {
			this.props.history.push('/')
		}
		this.refs.campaignName.select()
	}

	getCampaignId = () => {
		let { campaignId } = this.props
		if(!campaignId) {
			const locationSearch = this.props.history.location.search
			campaignId = utils.getSearchParams(locationSearch).get('cid')
		}
		return campaignId
	}

	saveCampaign = () => {
		const campaignId = this.getCampaignId()
		if(!campaignId) {
			this.props.history.push('/')
			return 
		}
		const { name } = this.props
		const campaign = {
			id: campaignId,
			name
		}

		this.props.reqSaveCampaign(campaign)
	}
	handleSaveDraft = () => {
		this.saveCampaign()
	}

	handleSaveAndReturn = () => {
		this.saveCampaign()
		this.props.history.push('/')
	}

	render() {
		const { campaignCreateStep, name, ...props } = this.props
		return (
			<div className="body-container">
				<div className="header">
					<h2 className="title"><input ref="campaignName" className="m1-form-input" placeholder="请输入活动名称" value={name} onChange={e => props.updateCampaignName(e.target.value)}/></h2>
					<Button color={Colors.TAGPRIMARY} onClick={this.handleSaveDraft} >草稿</Button>
					<Button className="btn-save" color={Colors.PRIMARY} onClick={this.handleSaveAndReturn} >保存修改并返回</Button>
				</div>
				<div className="m1-panel">
					<div className="m1-panel-content">
						<StepFlow step={campaignCreateStep} />
						{campaignCreateStep === 1 && <CreateContent />}
						{campaignCreateStep === 2 && <SelectScope />}
						{campaignCreateStep === 3 && <StartCampaign />}
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	campaignCreateStep: state.campaignCreate.campaignCreateStep,
	campaignId: state.campaignCreate.campaignId,
	name: state.campaignCreate.name,
})

const mapDispatchToProps = (dispatch) => ({
	updateCampaignName: bindActionCreators(actions.updateCampaignName, dispatch),
	reqSaveCampaign: bindActionCreators(actions.reqSaveCampaign, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(CampaignCreate)