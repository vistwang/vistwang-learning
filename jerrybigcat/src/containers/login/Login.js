import React, { Component } from 'react'

import { utils } from '../../utils'
import m1 from '../../base/soup'
import Banner from '../../components/sign/Banner'
import LoginForm from './LoginForm'

class Login extends Component {
	constructor(props) {
		super(props)

		this.isPc = utils.os.isPc

		this.state = {
			list: []
		}
	}

	componentDidMount() {
		this.init()
	}

	init() {
		if(this.isPc) {
			// this.getAdList()
		}
	}

	getAdList() {
		m1.getAdList(list => {
			const adList = list.filter(item => item.pageId === 24)
			this.setState({
				list: adList
			})
		})
	}

	handleAdClick = id => {
		m1.setAdClick(id)
	}

	render() {
		return (
			<div className="sign-container">
				<div className="sign-left">
					<LoginForm mobileModel={!this.isPc} />
				</div>
				{this.isPc && <div className="sign-right">
									<div className="sign-banner">
										<Banner list={this.state.list} onAdClick={this.handleAdClick} />
									</div>
								</div>}
			</div>
		)
	}
}

export default Login