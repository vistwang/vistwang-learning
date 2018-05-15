import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { actions } from '../../../reducers/setting/emailAccountSetting'
import EmailUnsubscribe from '../../../components/setting/account/EmailUnsubscribe'

class EmailUnsubscribeContainer extends Component {
	render() {
		const { updateUnsubscribeType, updateUnsubscribeName, updateUnsubscribeContent, ...props } = this.props
		return (
			<EmailUnsubscribe
				{...props}
				onUnsubscribeType={type => updateUnsubscribeType(type)}
				onUnsubscribeName={e => updateUnsubscribeName(e.target.value)}
				onUnsubscribeContent={e => updateUnsubscribeContent(e.target.value)}
			/>
		)
	}
}

const mapStateToProps = (state) => {
	const {
		unsubscribe_type,
		unsubscribe_name,
		unsubscribe_content,
	} = state.emailAccount.emailAccountSetting

	return {
		unsubscribe_type,
		unsubscribe_name,
		unsubscribe_content,
	}
}

const mapDispatchProps = (dispatch) => ({
	updateUnsubscribeType: bindActionCreators(actions.updateUnsubscribeType, dispatch),
	updateUnsubscribeName: bindActionCreators(actions.updateUnsubscribeName, dispatch),
	updateUnsubscribeContent: bindActionCreators(actions.updateUnsubscribeContent, dispatch),
})

export default connect(mapStateToProps, mapDispatchProps)(EmailUnsubscribeContainer)
