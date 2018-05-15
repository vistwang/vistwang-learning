import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Button, Colors } from '../../../components/m1ui'
import Layout from '../../../components/campaign/layout/Layout'
import Process from './Process'

class ProcessContainer extends Component {
	render() {
		const {...props} = this.props
		return (
			<Layout
				history={props.history}
			>
				<div className="container process">
					<Process history={props.history} />
					<div className="container create-campaign-bottom">
						<Button
							color={Colors.PRIMARY}
							onClick={e => console.log(e)}
						>保存</Button>
					</div>
				</div>
			</Layout>
		)
	}
}

export default ProcessContainer