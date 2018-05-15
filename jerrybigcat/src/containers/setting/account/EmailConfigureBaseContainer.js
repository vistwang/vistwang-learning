import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { actions } from '../../../reducers/setting/emailAccountSetting'
import EmailConfigureBase from '../../../components/setting/account/EmailConfigureBase'



class EmailConfigureBaseContainer extends Component {
	render() {
		const { updateDiffServer,updateDiffEmailUsername,updateServerUsername,updateServerEmail,updateServerSenderName, ...props } = this.props
		return (
			<EmailConfigureBase
				{...props}
				onDiffServer={e => updateDiffServer(e.target.checked)}
				onDiffEmailUsername={e => updateDiffEmailUsername(e.target.checked)}
				onUsername={e => updateServerUsername(e.target.value)}
				onEmail={e => updateServerEmail(e.target.value)}
				onSender={e => updateServerSenderName(e.target.value)}
			/>
		)
	}
}


const mapStateToProps = (state) => {
	const {diff_server, diff_email_username, server_username, server_email,server_sender_name} = state.emailAccount.emailAccountSetting
	return {
		diff_server,
		diff_email_username,
		server_username,
		server_email,
		server_sender_name
	}
}

const mapDispatchProps = (dispatch) => ({
	updateDiffServer: bindActionCreators(actions.updateDiffServer, dispatch),
	updateDiffEmailUsername: bindActionCreators(actions.updateDiffEmailUsername, dispatch),
	updateServerUsername: bindActionCreators(actions.updateServerUsername, dispatch),
	updateServerEmail: bindActionCreators(actions.updateServerEmail, dispatch),
	updateServerSenderName: bindActionCreators(actions.updateServerSenderName, dispatch),
})

export default connect(mapStateToProps, mapDispatchProps)(EmailConfigureBaseContainer)