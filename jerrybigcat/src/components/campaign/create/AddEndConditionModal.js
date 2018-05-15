import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Button, Modal, Colors } from '../../m1ui'

const { Header, Title, Body, Footer } = Modal

const propTypes = {
	show: PropTypes.bool,
	onClose: PropTypes.func.isRequired,
	onApply: PropTypes.func
}

class AddEndConditionModal extends Component {
	constructor(props) {
		super(props)

		this.state = {
			type: 1
		}
	}

	handleType = type => {
		this.setState({type})
	}

	render() {
		const { show, onClose, onApply, ...props } = this.props
		return (
			<Modal
				show={show}
				onClose={onClose}
			>
				<Header>
					<Title>添加活动结束条件</Title>
				</Header>
				<Body>
					<div className="add-end-condition">
						<span 
							className={this.state.type === 1 ? 'select' : ''}
							onClick={e => this.handleType(1)}
						>定时结束</span>
						<span 
							className={this.state.type === 2 ? 'select' : ''}
							onClick={e => this.handleType(2)}
						>达成触达指标后结束</span>
					</div>
				</Body>
				<Footer>
					<Button onClick={onClose} >取消</Button>
					<Button color={Colors.PRIMARY} onClick={e => onApply(this.state.type)} >使用</Button>
				</Footer>
			</Modal>
		)
	}
}

AddEndConditionModal.propTypes = propTypes

export default AddEndConditionModal