import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { actions } from '../../../reducers/setting/emailAccountSetting'
import EmailServiceItem from '../../../components/setting/account/EmailServiceItem'

const propTypes = {
	type: PropTypes.number,
	item: PropTypes.object
}

class EmailServiceItemContainer extends Component {
	handleUpdateType = (type) => {
		this.props.updateSendType(type)
	}

	render() {
		const {sendType, type, item} = this.props
		return (<EmailServiceItem
					item={item}
					isSelect={sendType === type}
					onSelect={this.handleUpdateType}
				/>)
	}
}

EmailServiceItemContainer.propTypes = propTypes

const mapStateToProps = (state) => ({
	sendType: state.emailAccount.emailAccountSetting.send_type
})

const mapDispatchProps = (dispatch) => ({
	updateSendType: bindActionCreators(actions.updateSendType, dispatch)
})

export default connect(mapStateToProps, mapDispatchProps)(EmailServiceItemContainer)