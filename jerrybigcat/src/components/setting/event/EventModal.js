import React, {Component} from 'react'
import PropTypes from 'prop-types'

import { Button, Modal, Colors } from '../../m1ui'
import CreateEvent from './CreateEvent'
import AddEvent from './AddEvent'

const { Header, Title, Body, Footer } = Modal

class EventModal extends Component {
	render() {
		const {show, onClose, onConfirm, step, ...props} = this.props
		return (
			<Modal
				show={show}
				onClose={onClose}
				style={{width: '680px'}}
				backdrop="static"
				className="center"
			>
				<Header>
					<Title>自定义事件</Title>
				</Header>
				<Body>
				<div className="m1-row custom-event">
					<div className="event-intro">
						您可以添加属于您的产品或商业中特定场景或业务中要跟踪的用户行为事件，这将帮助宁更好的贴合您的业务做精准人群的筛选和营销
					</div>
					{step === 1 && <CreateEvent />}
					{step === 2 && <AddEvent {...props} />}
				</div>
				</Body>
				<Footer>
					<Button color={Colors.PRIMARY} onClick={onConfirm} >
						{step === 1 ? '第一步 > 添加事件' : '保存并下一步'}
					</Button>
				</Footer>
			</Modal>
		)
	}
}

export default EventModal