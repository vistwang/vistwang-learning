import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {utils} from '../../../utils'

import { actions as globalActions } from '../../../reducers/campaign'
import { actions } from '../../../reducers/campaign/campaignCreate'

import Header from '../../../components/campaign/layout/Header'

class HeaderContainer extends Component {

	getCampaignId = () => {
		let { campaignId } = this.props
		if(!campaignId) {
			const locationSearch = this.props.history.location.search
			campaignId = utils.getSearchParams(locationSearch).get('cid')
		}
		return campaignId
	}

	handleSaveCampaign = (option) => {
		const campaignId = this.getCampaignId()
		if(!campaignId) {
			this.props.history.push('/')
			return 
		}
		const param = {
			id: campaignId,
			...option
		}
		this.props.reqSaveCampaign(param)
	}

	handleCampaignNameBlur = () => {
		const { campaignName } = this.props
		if(campaignName.trim().length === 0) {
			return
		}
		this.handleSaveCampaign({name: campaignName.trim()})
	}

	render() {
		const { campaignName, status, ...props } = this.props
		return (
			<Header
				campaignName={campaignName}
				status={status}
				onCampaignNameChange={e => props.updateCampaignName(e.target.value)}
				onCampaignNameBlur={this.handleCampaignNameBlur}
				onCampaignStatusChange={status => this.handleSaveCampaign({status})}
			/>
		)
	}
}


const mapStateToProps = (state) => ({
	campaignId: state.campaignCreate.campaignId,
	campaignName: state.campaignCreate.name,
	status: state.campaignCreate.status,
})

const mapDispatchToProps = (dispatch) => ({
	updateCampaignName: bindActionCreators(actions.updateCampaignName, dispatch),
	reqSaveCampaign: bindActionCreators(actions.reqSaveCampaign, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)