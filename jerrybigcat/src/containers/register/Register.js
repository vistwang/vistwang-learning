import React, { Component } from 'react'

import { utils } from '../../utils'
import m1 from '../../base/soup'
import Banner from '../../components/sign/Banner'
import RegisterForm from './RegisterForm'
import ActiveEmail from './ActiveEmail'

class Register extends Component {
	constructor(props) {
		super(props)

		this.isPc = utils.os.isPc

		this.state = {
			email: '',
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

	getAdList(){
		m1.getAdList(list => {
			this.setState({
				list: list
			})
		},{pageId: 24})
	}

	handleRegisterSubmit = email => {
		this.setState({email})
	}

	handleAdClick = id => {
		m1.setAdClick(id)
	}

	renderRegister() {
		return (
			<div className="sign-container">
				<div className="sign-left">
					<RegisterForm onRegisterSubmit={this.handleRegisterSubmit} mobileModel={!this.isPc} />
				</div>
				{this.isPc && <div className="sign-right">
									<div className="sign-banner">
										<Banner list={this.state.list} onAdClick={this.handleAdClick} />
									</div>
								</div>}
			</div>
		)
	}

	render() {
		const { email } = this.state
		return (
			<div>
				{email ? <ActiveEmail email={email}/> : this.renderRegister()}
			</div>
		)
	}
}

export default Register