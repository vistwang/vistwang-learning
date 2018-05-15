import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { actions } from '../../../reducers/setting/eventInstall'
import InstallCodeModal from '../../../components/setting/event/InstallCodeModal'

class InstallCodeModalContainer extends Component {

	render() {
		const { ...props } = this.props
		return (
			<InstallCodeModal
				{...props}
				onTab={props.setCodeTab}
				onJavascript={e => props.updateCodeJavascript(e.target.value)}
				onIOS={e => props.updateCodeIOS(e.target.value)}
				onAndroid={e => props.updateCodeAndroid(e.target.value)}
			/>
		)
	}
}

const mapStateToProps = (state) => {
	const {codeTab, code_javascript, code_ios, code_android} = state.event.eventInstall
	return {
		codeTab, 
		code_javascript,
		code_ios,
		code_android,
	}
}

const mapDispatchProps = (dispatch) => ({
	setCodeTab: bindActionCreators(actions.setCodeTab, dispatch),
	updateCodeJavascript: bindActionCreators(actions.updateCodeJavascript, dispatch),
	updateCodeIOS: bindActionCreators(actions.updateCodeIOS, dispatch),
	updateCodeAndroid: bindActionCreators(actions.updateCodeAndroid, dispatch),
})

export default connect(mapStateToProps, mapDispatchProps)(InstallCodeModalContainer)