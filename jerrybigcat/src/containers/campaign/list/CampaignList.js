import React, { Component } from 'react'

import LeftSide from './LeftSide'
import RightSideContainer from './RightSideContainer'

class CampaignList extends Component {
	render() {
		const { history } = this.props
		return [
			<LeftSide key="left" />,
			<RightSideContainer 
				key="right"
				history={history}
			/>
		]
	}
}

export default CampaignList