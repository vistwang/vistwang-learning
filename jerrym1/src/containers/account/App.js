import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import BodyRouterView from '../../router/body'
import Nav from './Header'
import Left from './Left'
import Main from './Main'


class AppContainer extends Component {

	render() {
		return (
			<div>
				<Nav />
				<div  className="m1-body">
					<Left />
					<Main />
					<BodyRouterView></BodyRouterView>
				</div>
			</div>
		)
	}
}

export default AppContainer