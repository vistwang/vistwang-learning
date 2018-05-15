import React, { Component } from 'react'

import Layout from '../../../components/campaign/layout/Layout'
import SettingContainer from './SettingContainer'

class CampaignSettingContainer extends Component {
	render() {
		return (
			<Layout
				history={this.props.history}
			>
				<SettingContainer />
			</Layout>
		)
	}
}

export default CampaignSettingContainer