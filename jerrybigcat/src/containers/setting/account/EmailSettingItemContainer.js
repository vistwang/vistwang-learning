import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { actions } from '../../../reducers/setting/emailAccountSetting'

import EmailSettingItem from '../../../components/setting/account/EmailSettingItem'


class EmailSettingItemContainer extends Component {
	handleToggle = (type) => {
		const { toggleSettingItem, toggleSetting } = this.props
		const item = {
			...toggleSetting,
			[type]: !toggleSetting[type]
		}
		toggleSettingItem(item)
	}

	render() {
		const { type, toggleSetting, ...props } = this.props
		return (
			<EmailSettingItem
				{...props}
				type={type}
				show={toggleSetting[type]}
				onToggle={this.handleToggle}
			/>
		)
	}
} 

const mapStateToProps = (state) => ({
	toggleSetting: state.emailAccount.emailAccountSetting.toggleSetting
})

const mapDispatchToProps = (dispatch) => ({
	toggleSettingItem: bindActionCreators(actions.toggleSettingItem, dispatch)	
})

export default connect(mapStateToProps, mapDispatchToProps)(EmailSettingItemContainer)