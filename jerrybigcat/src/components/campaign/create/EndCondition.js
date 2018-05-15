import React, { Component } from 'react'
import PropTypes from 'prop-types'

import EndConditionBox from './EndConditionBox'
import ButtonAdd from './ButtonAdd'
import ViewOr from './ViewOr'
import AddEndConditionModal from './AddEndConditionModal'

const propTypes = {

}

class EndCondition extends Component {
	constructor(props) {
		super(props)

		this.state = {
			showModal: false
		}
	}

	handleAdd = e => {
		this.setState({
			showModal: true
		})
	}

	handleClose = e => {
		this.setState({
			showModal: false
		})
	}

	render(props) {
		return (
			<div className="container">
				<h3>活动结束条件设置</h3>
				<EndConditionBox />
				<ViewOr />
				<EndConditionBox />
				<ViewOr />
				<EndConditionBox />
				<ViewOr />
				<ButtonAdd onClick={this.handleAdd} >
					添加其他结束条件
				</ButtonAdd>
				<AddEndConditionModal
					show={this.state.showModal}
					onClose={this.handleClose}
					onApply={type => console.log('add',type)}
				/>
			</div>
		)
	}
}


export default EndCondition