import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Bundle from './Bundle'


import loadImprove from 'bundle-loader?lazy!../containers/account/Improve'

const Improve = (props) => (
  <Bundle load={loadImprove}>
    {(Improve) => <Improve {...props}/>}
  </Bundle>
)

class BodyRouter extends Component {

	render() {
		return (
			<div className="body-container">
				<Route path="/improve" component={Improve} />
			</div>
		)
	}
}

export default BodyRouter