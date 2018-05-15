import React, { Component } from 'react'
import NavigatorContainer from '../../containers/navigator/NavigatorContainer'
import Menu from './Menu'

class Main extends Component {
	render() {
		return[
			<NavigatorContainer key="nav" />,
			<div key="body" className="m1-body">
				<Menu />
				{this.props.children}
			</div>
		]
	}
}

export default Main