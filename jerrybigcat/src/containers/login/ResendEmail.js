import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Button, Colors } from '../../components/m1ui'

const propTypes = {
	gold: PropTypes.number,
	show: PropTypes.bool,
	onClose: PropTypes.func,
	// 确认重发
	onConfirm: PropTypes.func
}

class ResendEmail extends Component {

	render() {
		const { show, onClose, onConfirm, ...props } = this.props
		return(
			<Modal 
				{...props}
				className="center"
				show={show}
				onClose={onClose}
				backdrop="static"
				style={{width: '450px'}}
			>
				<Modal.Header>
					<Modal.Title>邮箱未激活，请点击下方按钮重新发送邮件</Modal.Title>
				</Modal.Header>
				<Modal.Footer>
					<Button color={Colors.PRIMARY} onClick={onConfirm}>重新发送邮件</Button>
				</Modal.Footer>
			</Modal>
		)
	}
}

ResendEmail.propTypes = propTypes

export default ResendEmail