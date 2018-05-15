import React, { Component } from 'react'
import { HashRouter as Router } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AppRouter from '../../router/CampaignRouter'

import { actions } from '../../reducers/campaign'
import { msg } from '../../utils'
import Main from '../../components/campaign/Main'

class App extends Component {
	handleFetch = () => {
		const { isFetching } = this.props
		if(isFetching) {
			msg.loading()
		} else {
			msg.close()
		}
	}

	handleMessage = () => {
		const { message, clearMessage } = this.props
		if(message.content) {
			msg.info(message.content)
			setTimeout(() => {
				clearMessage()
			}, 50)
		}
	}
	
	render() {
		this.handleFetch()
		this.handleMessage()
		return (
			<Router>
				<Main>
					<AppRouter />
				</Main>
			</Router>
		)
	}
}

const mapStateToProps = (state) => ({
	isFetching: state.globalState.isFetching,
	message: state.globalState.message
})

const mapDispatchToProps = (dispatch) => ({
	clearMessage: bindActionCreators(actions.clearMessage, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(App)