import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import RouterView from '../../router'

class Main extends Component {
	render() {
		return (
			<div className="m1-right">
				<RouterView></RouterView>
			</div>
		)
	}
}

export default Main
