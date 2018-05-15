import React, { Component } from 'react'

import { Button, Colors } from '../components/m1ui/'

import List from '../containers/List'

class App extends Component {
	render() {
		return[
			<h2 key="h2">Hello</h2>,
			<p key="p">hello world</p>,
			<Button color={Colors.PRIMARY} key="button" onClick={this.getname} >Button</Button>,
			<List key="list" />
		]
	}
}

export default App	