import React, { Component } from 'react'
import { config, cookie, msg } from '../../utils'
import { logout } from '../../api/sign'

import Navigator from '../../components/navigator/Navigator'

class NavigatorContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name: '',
			email: '',
			avatar: '',
		}
	}
	componentDidMount() {
		const userInfo = JSON.parse(decodeURIComponent(cookie.get(config.COOKIE_SOUPAI_USER)))
		if(userInfo) {
			this.setState({
				name: userInfo.user.accounts[0].name,
				email: userInfo.user.email,
				avatar: userInfo.user.avatar,
			})
		}
	}

	handleLogout = () => {
		logout().then(result => {
			if(result.success) {
				msg.info(result.data)
				cookie.remove(config.COOKIE_SOUPAI_TOKEN, {path: '/', domain: config.COOKIE_SOUPAI_DOMAIN})
				window.location.href="/login.html"
			} else {
				msg.info(result.data)
			}
		})
	}
	render() {
		const { name, email, avatar } = this.state
		return (
			<Navigator
				name={name}
				email={email}
				avatar={avatar}
				onLogout={this.handleLogout}
			/>
		)
	}
}

export default NavigatorContainer