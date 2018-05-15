import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { actions } from '../../../reducers/setting/emailAccountSetting'
import EmailSafe from '../../../components/setting/account/EmailSafe'

class EmailSafeContainer extends Component {
	render() {
		return (
			<EmailSafe
				countDaily={this.props.count_daily}
				onCountDaily={e => this.props.updateCountDaily(e.target.value)}
			/>
		)
	}
}

const mapStateToProps = (state) => {
	const {
		count_daily,
	} = state.emailAccount.emailAccountSetting

	return {
		count_daily,
	}
}

const mapDispatchProps = (dispatch) => ({
	updateCountDaily: bindActionCreators(actions.updateCountDaily, dispatch),
})

export default connect(mapStateToProps, mapDispatchProps)(EmailSafeContainer)
