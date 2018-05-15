import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { actions } from '../../../reducers/setting/emailAccountSetting'
import EmailSignature from '../../../components/setting/account/EmailSignature'

class EmailSignatureContainer extends Component {
	render() {
		const { updateCanSignature, updateEmailSignature, ...props } = this.props
		return (
			<EmailSignature
				{...props}
				onCanSignature={e => updateCanSignature(e.target.checked)}
				onEmailSignature={value => updateEmailSignature(value)}
			/>
		)
	}
}

const mapStateToProps = (state) => {
	const {
		can_signature,
		email_signature,
	} = state.emailAccount.emailAccountSetting

	return {
		can_signature,
		email_signature,
	}
}

const mapDispatchProps = (dispatch) => ({
	updateCanSignature: bindActionCreators(actions.updateCanSignature, dispatch),
	updateEmailSignature: bindActionCreators(actions.updateEmailSignature, dispatch),
})

export default connect(mapStateToProps, mapDispatchProps)(EmailSignatureContainer)
