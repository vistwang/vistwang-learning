import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Button, Icon, Colors } from '../../../components/m1ui'

import Process from '../process/Process'

import { actions } from '../../../reducers/campaign/campaignCreate'

class CreateContent extends Component {
	handleCheckCampaign = () => {
		const { campaignId } = this.props
		this.props.reqCheckCampaign(campaignId)
	}
	render() {
		const { ...props } = this.props
		return [
			<Process key="process" history={props.history} />,
			<div key="bottom" className="container create-campaign-bottom">
				<Button
					color={Colors.PRIMARY}
					onClick={this.handleCheckCampaign}
				>保存并下一步</Button>
			</div>
		]
	}
}

const mapStateToProps = (state) => ({
	campaignId: state.campaignCreate.campaignId,
})

const mapDispatchToProps = (dispatch) =>({
	setCreateStep: bindActionCreators(actions.setCreateStep, dispatch),
	reqCheckCampaign: bindActionCreators(actions.reqCheckCampaign, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateContent)